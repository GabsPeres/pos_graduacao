import type { SupermarketRepository } from '../bondaries/supermarket-repository';
import { Supermarket } from '../entities/supermarket';

type Input = {
    cnpj: string;
    name: string;
    address: string;
};

export class CreateSupermarketUseCase {
    public constructor(readonly supermarketRepository: SupermarketRepository) {}

    public async execute({ cnpj, name, address }: Input): Promise<void> {
        const supermarketExists = await this.supermarketRepository.existsByCnpj(cnpj);
        if (supermarketExists) {
            return;
        }
        const supermarket = await Supermarket.create(cnpj, name, address);
        await this.supermarketRepository.save(supermarket);
        return;
    }
}
