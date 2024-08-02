import { GeolocationGetawayRegistry } from '../registries/geolocation-gataway-registry';

export class Supermarket {
    private cnpj: string;
    private name: string;
    private address: string;
    private latitude: number;
    private longitude: number;

    public getCnpj(): string {
        return this.cnpj;
    }

    public getName(): string {
        return this.name;
    }

    public getAddress(): string {
        return this.address;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public getLongitude(): number {
        return this.longitude;
    }

    private constructor(cnpj: string, name: string, address: string, latitude: number, longitude: number) {
        this.cnpj = cnpj;
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public static async create(cnpj: string, name: string, address: string) {
        const { latitude, longitude } = await GeolocationGetawayRegistry.getInstance()
            .getGeolocationGetaway()
            .getGeoLocationFromAddress(address);

        return new Supermarket(cnpj, name, address, latitude, longitude);
    }
}
