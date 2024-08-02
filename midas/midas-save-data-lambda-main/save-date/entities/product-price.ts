import { randomUUID } from 'node:crypto';

export class ProductPrice {
    private id: string;
    private nfeId: string;
    private price: number;
    private date: Date;
    private supermarketId: string;
    private productId: string;

    public getId(): string {
        return this.id;
    }
    public getNfeId(): string {
        return this.nfeId;
    }
    public getPrice(): number {
        return this.price;
    }
    public getDate(): Date {
        return this.date;
    }
    public getSupermarketId(): string {
        return this.supermarketId;
    }
    public getProductId(): string {
        return this.productId;
    }

    private constructor(
        id: string,
        nfeId: string,
        price: number,
        date: Date,
        supermarketId: string,
        productId: string,
    ) {
        this.id = id;
        this.nfeId = nfeId;
        this.price = price;
        this.date = date;
        this.supermarketId = supermarketId;
        this.productId = productId;
    }

    public static create(nfeId: string, price: number, date: Date, supermarketId: string, productId: string) {
        const id = randomUUID();
        return new ProductPrice(id, nfeId, price, date, supermarketId, productId);
    }
}
