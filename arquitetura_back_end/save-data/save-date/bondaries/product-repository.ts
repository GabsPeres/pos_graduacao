import type { Product } from '../entities/product';

export interface ProductRepository {
    existsByCode(code: string): Promise<boolean>;
    save(product: Product): Promise<void>;
}
