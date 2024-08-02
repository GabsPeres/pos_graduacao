import upsertProduct from './src/upsert-product.mjs';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
    connectionString: 'postgresql://root:9gnvu5tvk4gkzUJBk5k3cj89d2dm9tJb@dpg-cq5dqqlds78s73d0fn6g-a.oregon-postgres.render.com/midaspostgresql',
    ssl: {
        rejectUnauthorized: false
    }
});

export const lambdaHandler = async (event) => {
    let client;
    try {
        let messageBody;
        const record = event.Records[0];
        if (record) {
            messageBody = JSON.parse(record.body).Message;
        }
        client = await pool.connect();
        await upsertProduct(client, JSON.parse(messageBody));

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Dados processados com sucesso!'
            }),
        };
    } catch (err) {
        console.error('Erro ao processar dados:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Erro ao processar dados',
                error: err.message
            }),
        };
    } finally {
        if (client) {
            client.release();
        }
    }
};