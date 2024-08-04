export type Geolocation = {
    latitude: number;
    longitude: number;
};

export interface GeoLocationGateway {
    getGeoLocationFromAddress(address: string): Promise<Geolocation>;
}
