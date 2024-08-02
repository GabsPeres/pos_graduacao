import { SQSEvent } from 'aws-lambda';
import { z, ZodError } from 'zod';
import { CreateSupermarketUseCase } from './use-cases/create-supermarket-use-case';
import type { SupermarketRepository } from './bondaries/supermarket-repository';
import { PgSupermarketRepository } from './adapters/pg-supermarkets-repository';
import { PgConnection, type DbConnection } from './adapters/pg-connection';
import { CreateProductUseCase } from './use-cases/create-product-use-case';
import type { ProductRepository } from './bondaries/product-repository';
import { PgProductRepository } from './adapters/pg-product-repository';
import { CreateProductPriceUseCase } from './use-cases/create-product-price-use-case';
import type { ProductPriceRepository } from './bondaries/product-price-repository';
import { PgProductPriceRepository } from './adapters/pg-product-price-repository';
import { GeolocationGetawayRegistry } from './registries/geolocation-gataway-registry';
import type { GeoLocationGateway } from './bondaries/geolocation-gateway';
import { GoogleGeolocationGateway } from './adapters/google-geolocation-gateway';

export async function lambdaHandler(event: SQSEvent): Promise<void> {
    const recordsSchema = z.array(
        z.object({
            nfeId: z.string(),
            supermarketName: z.string(),
            cnpj: z.string(),
            address: z.string(),
            date: z.coerce.date(),
            items: z.array(
                z.object({
                    name: z.string(),
                    code: z.string(),
                    price: z.coerce.number(),
                }),
            ),
        }),
    );

    try {
        const records = recordsSchema.parse(
            event.Records.map((record) => {
                const body = JSON.parse(record.body);
                return {
                    nfeId: body.nfeId,
                    supermarketName: body.supermarketName,
                    cnpj: body.cnpj,
                    address: body.address,
                    date: body.date,
                    items: body.items.map((item: any) => ({
                        name: item.name,
                        code: item.code,
                        price: item.price,
                    })),
                };
            }),
        );

        const geolocationGateway: GeoLocationGateway = new GoogleGeolocationGateway();
        GeolocationGetawayRegistry.getInstance().setGeolocationGateway(geolocationGateway);
        const dbConnection: DbConnection = new PgConnection(process.env.URL_POSTGRES as string);
        const supermarketRepository: SupermarketRepository = new PgSupermarketRepository(dbConnection);
        const productRepository: ProductRepository = new PgProductRepository(dbConnection);
        const productPriceRepository: ProductPriceRepository = new PgProductPriceRepository(dbConnection);

        const createSupermarketUseCase = new CreateSupermarketUseCase(supermarketRepository);
        const createProductUseCase = new CreateProductUseCase(productRepository);
        const createProductPriceUseCase = new CreateProductPriceUseCase(productPriceRepository);

        for (let record of records) {
            await createSupermarketUseCase.execute({
                cnpj: record.cnpj,
                name: record.supermarketName,
                address: record.address,
            });
            for (let item of record.items) {
                await createProductUseCase.execute({ code: item.code, name: item.name });
                await createProductPriceUseCase.execute({
                    nfeId: record.nfeId,
                    date: record.date,
                    price: item.price,
                    productId: item.code,
                    supermarketId: record.cnpj,
                });
            }
        }
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            console.log(error.format());
            return;
        }
        if (error instanceof Error) {
            console.log(error.message);
            return;
        }
        console.log(error);
        return;
    }
}
