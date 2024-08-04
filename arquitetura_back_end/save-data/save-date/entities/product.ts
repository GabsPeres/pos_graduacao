export class Product {
    private code: string;
    private name: string;

    public getCode(): string {
        return this.code;
    }

    public getName(): string {
        return this.name;
    }

    private constructor(code: string, name: string) {
        this.code = code;
        this.name = name;
    }

    public static create(code: string, name: string) {
        return new Product(code, name);
    }
}
