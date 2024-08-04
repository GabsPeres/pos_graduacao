import 'dotenv/config';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { z, ZodError } from 'zod';
import { DbConnection, PgConnection } from './database/connection';

export async function lambdaHandler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const bodySchema = z.object({
        productName: z.string(),
        userLatitude: z.coerce.number(),
        userLongitude: z.coerce.number(),
        maxDistance: z.coerce.number(),
    });

    try {
        const body = bodySchema.parse(JSON.parse(event.body as string));

        const dbConnection: DbConnection = new PgConnection(process.env.DATABASE_URL as string);

        const data = await dbConnection.query(`
    SELECT 
    p.name AS product_name, 
    s.name AS supermarket_name, 
    s.address, 
    ph.price, 
    ph.date,
    (6371 * acos( 
        cos(radians($1)) * cos(radians(s.latitude)) * 
        cos(radians(s.longitude) - radians($2)) + 
        sin(radians($1)) * sin(radians(s.latitude))
    )) AS distance
FROM 
    supermarkets AS s
INNER JOIN 
    price_history AS ph ON s.cnpj = ph.supermarket_id
INNER JOIN 
    products AS p ON ph.product_id = p.code
WHERE 
    p.name ILIKE '%' || $3 || '%'
  AND
    (6371 * acos( 
        cos(radians($1)) * cos(radians(s.latitude)) * 
        cos(radians(s.longitude) - radians($2)) + 
        sin(radians($1)) * sin(radians(s.latitude))
    )) < $4;`, [body.userLatitude, body.userLongitude, body.maxDistance]);

    const formatedData = {
        results: data.map((row) => ({
            product: row['product_name'],
            supermarket: row['supermarket_name'],
            address: row['address'],
            distance: row['distance'],
            price: row['price'],
            date: row['date'],
        })),
    }
        return {
            statusCode: 200,
            body: JSON.stringify(formatedData),
        };

    } catch (error: unknown) {
        if (error instanceof ZodError){
            return {
                statusCode: 400,
                body: JSON.stringify({ message: error.format() }),
            };
        }
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
};
