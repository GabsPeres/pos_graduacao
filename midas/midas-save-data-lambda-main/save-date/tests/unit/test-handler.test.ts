import { type SQSEvent } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import { describe, expect, it } from '@jest/globals';

import { GoogleGeolocationGateway } from '../../adapters/google-geolocation-gateway';

describe('Unit test for app handler', function () {
    it('verifies successful response for Supermercado ABC', async () => {
        const event: SQSEvent = {
            Records: [
                {
                    messageId: '3c4d5e6f-7890-1121-3141-516171819202',
                    receiptHandle: 'AQEBwJnKyrHigUMZj6rYigCgxlaS3SLy0a...',
                    body: '{"nfeId": "34-27/07-19.377.564/0010-11-98-089-003.345.678-400.121.0987","supermarketName": "Supermercado ABC","cnpj": "19.377.564/0010-11","address": "Av. Independência, 456, Centro, 9876543 - Porto Alegre, RS","date": "2024-07-15T16:15:45.000Z","items": [{"name": "Macarrão Espaguete 500g","code": "7894561230987","price": 4.79},{"name": "Molho de Tomate 340g","code": "7893216540987","price": 3.29}]}',
                    attributes: {
                        ApproximateReceiveCount: '1',
                        SentTimestamp: '1545082649183',
                        SenderId: 'AIDAIENQZJOLO23YVJ4VO',
                        ApproximateFirstReceiveTimestamp: '1545082649185',
                    },
                    messageAttributes: {},
                    md5OfBody: 'efgh5678efgh5678efgh5678efgh5678',
                    eventSource: 'aws:sqs',
                    eventSourceARN: 'arn:aws:sqs:us-east-2:123456789012:my-queue',
                    awsRegion: 'us-east-2',
                },
            ],
        };
        await expect(lambdaHandler(event)).resolves.toBeUndefined();
    });

    it('verifies successful response for Mercado Central', async () => {
        const event: SQSEvent = {
            Records: [
                {
                    messageId: '4d5e6f7g-8901-2131-4151-617182030405',
                    receiptHandle: 'AQEBwJnKyrHigUMZj6rYigCgxlaS3SLy0a...',
                    body: '{"nfeId": "35-28/07-20.488.675/0011-12-09-090-004.456.789-500.132.1098","supermarketName": "Mercado Central","cnpj": "20.488.675/0011-12","address": "Rua das Flores, 789, Jardim, 7654321 - Salvador, BA","date": "2024-07-16T11:00:00.000Z","items": [{"name": "Café Torrado 500g","code": "7891236549870","price": 9.50},{"name": "Açúcar Cristal 1kg","code": "7896543210123","price": 2.99}]}',
                    attributes: {
                        ApproximateReceiveCount: '1',
                        SentTimestamp: '1545082649183',
                        SenderId: 'AIDAIENQZJOLO23YVJ4VO',
                        ApproximateFirstReceiveTimestamp: '1545082649185',
                    },
                    messageAttributes: {},
                    md5OfBody: 'ijkl9012ijkl9012ijkl9012ijkl9012',
                    eventSource: 'aws:sqs',
                    eventSourceARN: 'arn:aws:sqs:us-east-2:123456789012:my-queue',
                    awsRegion: 'us-east-2',
                },
            ],
        };
        await expect(lambdaHandler(event)).resolves.toBeUndefined();
    });

    it.skip('GoogleGeolocationGateway', async () => {
        const sut = new GoogleGeolocationGateway();
        const response = await sut.getGeoLocationFromAddress(
            'Rua das Flores, 789, Jardim, 7654321 - Salvador, BA',
        );
        expect(response.latitude).toBe(-12.9714);
        expect(response.longitude).toBe(-38.5014);
    });
});