import type { Supermarket } from '../entities/supermarket';

export interface SupermarketRepository {
    existsByCnpj(cnpj: string): Promise<boolean>;
    save(supermarket: Supermarket): Promise<void>;
}
