import type { Geolocation, GeoLocationGateway } from '../bondaries/geolocation-gateway';
import axios from 'axios';

export class GoogleGeolocationGateway implements GeoLocationGateway {
    public async getGeoLocationFromAddress(address: string): Promise<Geolocation> {
        const response = await axios.get<{
            results: {
                geometry: {
                    location: {
                        lat: number;
                        lng: number;
                    };
                };
            }[];
        }>(
            `https://maps.googleapis.com/maps/api/geocode/json?key=${
                process.env.GOOGLE_API_KEY as string
            }&address=${address.split(' ').join('%20')}`,
        );

        if (response.status !== 200) {
            return {
                latitude: 0,
                longitude: 0,
            };
        }
        return {
            latitude: response.data.results[0].geometry.location.lat,
            longitude: response.data.results[0].geometry.location.lng,
        };
    }
}
