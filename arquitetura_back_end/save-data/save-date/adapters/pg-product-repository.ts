import type { ProductRepository } from '../bondaries/product-repository';
import type { Product } from '../entities/product';
import type { DbConnection } from './pg-connection';

export class PgProductRepository implements ProductRepository {
    public constructor(readonly dbConnection: DbConnection) {}

    async existsByCode(code: string): Promise<boolean> {
        const result = await this.dbConnection.query('SELECT code FROM products WHERE code = $1', [code]);
        if (result.length === 0) {
            return false;
        }
        return true;
    }

    async save(product: Product): Promise<void> {
        await this.dbConnection.query('INSERT INTO products(code, name) VALUES($1, $2)', [
            product.getCode(),
            product.getName(),
        ]);
        return;
    }
}
