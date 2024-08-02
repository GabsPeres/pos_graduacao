import type { ProductPriceRepository } from '../bondaries/product-price-repository';
import { ProductPrice } from '../entities/product-price';

type Input = {
    nfeId: string;
    price: number;
    date: Date;
    supermarketId: string;
    productId: string;
};

export class CreateProductPriceUseCase {
    public constructor(readonly productPriceRepository: ProductPriceRepository) {}

    public async execute({ nfeId, price, date, supermarketId, productId }: Input): Promise<void> {
        const productPriceExists = await this.productPriceRepository.existsByNfeIdAndProductId(nfeId, productId);
        if (productPriceExists) {
            return;
        }
        const productPrice = ProductPrice.create(nfeId, price, date, supermarketId, productId);
        await this.productPriceRepository.save(productPrice);
        return;
    }
}
