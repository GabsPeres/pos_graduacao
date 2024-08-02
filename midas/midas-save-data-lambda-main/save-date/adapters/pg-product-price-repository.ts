import type { ProductPriceRepository } from '../bondaries/product-price-repository';
import type { ProductPrice } from '../entities/product-price';
import type { DbConnection } from './pg-connection';

export class PgProductPriceRepository implements ProductPriceRepository {
    public constructor(readonly dbConnection: DbConnection) {}

    public async existsByNfeIdAndProductId(nfeId: string, productId: string): Promise<boolean> {
        const result = await this.dbConnection.query(
            'SELECT id FROM price_history WHERE nfe_id = $1 AND product_id = $2',
            [nfeId, productId],
        );
        if (result.length === 0) {
            return false;
        }
        return true;
    }

    public async save(productPrice: ProductPrice): Promise<void> {
        await this.dbConnection.query(
            'INSERT INTO price_history(id, nfe_id, price, date, supermarket_id, product_id) VALUES($1, $2, $3, $4, $5, $6)',
            [
                productPrice.getId(),
                productPrice.getNfeId(),
                productPrice.getPrice(),
                productPrice.getDate(),
                productPrice.getSupermarketId(),
                productPrice.getProductId(),
            ],
        );
        return;
    }
}
