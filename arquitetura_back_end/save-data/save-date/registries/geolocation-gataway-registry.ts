import type { GeoLocationGateway } from '../bondaries/geolocation-gateway';

export class GeolocationGetawayRegistry {
    private static insnatce?: GeolocationGetawayRegistry;
    private geolocationGateway?: GeoLocationGateway;

    private constructor() {}

    public setGeolocationGateway(geolocationGateway: GeoLocationGateway) {
        this.geolocationGateway = geolocationGateway;
    }

    public getGeolocationGetaway(): GeoLocationGateway {
        if (!this.geolocationGateway) {
            throw new Error('GeolocationGateway not registered yet');
        }
        return this.geolocationGateway;
    }

    public static getInstance() {
        if (!this.insnatce) {
            this.insnatce = new GeolocationGetawayRegistry();
        }
        return this.insnatce;
    }
}
