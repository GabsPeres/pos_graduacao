import type { ProductRepository } from '../bondaries/product-repository';
import { Product } from '../entities/product';

type Input = {
    code: string;
    name: string;
};

export class CreateProductUseCase {
    public constructor(readonly productRepository: ProductRepository) {}

    public async execute({ code, name }: Input): Promise<void> {
        const productExists = await this.productRepository.existsByCode(code);
        if (productExists) {
            return;
        }
        const product = Product.create(code, name);
        await this.productRepository.save(product);
        return;
    }
}
