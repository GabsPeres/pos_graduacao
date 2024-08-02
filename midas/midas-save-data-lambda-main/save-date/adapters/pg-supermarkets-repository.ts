import type { SupermarketRepository } from '../bondaries/supermarket-repository';
import type { Supermarket } from '../entities/supermarket';
import type { DbConnection } from './pg-connection';

export class PgSupermarketRepository implements SupermarketRepository {
    public constructor(readonly dbConnection: DbConnection) {}

    public async existsByCnpj(cnpj: string): Promise<boolean> {
        const results = await this.dbConnection.query('SELECT cnpj FROM supermarkets WHERE cnpj = $1', [cnpj]);
        if (results.length === 0) {
            return false;
        }
        return true;
    }

    public async save(supermarket: Supermarket): Promise<void> {
        await this.dbConnection.query(
            'INSERT INTO supermarkets(cnpj, name, address, latitude, longitude) VALUES($1, $2, $3, $4, $5)',
            [
                supermarket.getCnpj(),
                supermarket.getName(),
                supermarket.getAddress(),
                supermarket.getLatitude(),
                supermarket.getLongitude(),
            ],
        );
        return;
    }
}
