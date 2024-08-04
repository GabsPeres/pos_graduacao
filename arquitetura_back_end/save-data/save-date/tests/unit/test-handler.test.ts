import { SQSEvent } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import { expect, describe, it } from '@jest/globals';
import { GoogleGeolocationGateway } from '../../adapters/google-geolocation-gateway';

describe('Unit test for app handler', function () {
    it('verifies successful response', async () => {
        const event: SQSEvent = {
            "Records": [
              {
                "messageId": "059f36b4-87a3-44ab-83d2-661975830a7d",
                "receiptHandle": "AQEBwJnKyrHigUMZj6rYigCgxlaS3SLy0a...",
                "body": "{\"nfeId\": \"31-24/08-18.957.746/0001-53-65-102-000.235.772-910.204.1953\",\"supermarketName\": \"VAREJAO PARANAIBA LTDA\",\"cnpj\": \"18.957.746/0001-53\",\"address\": \"RUA AGENOR PAULA ESTRELA, 672, JAQUELINE, 31748190 - Belo Horizonte, MG\",\"date\": \"2024-08-01T19:52:00.000Z\",\"items\": [{\"name\": \"NECTAR TIAL TP 1L UVA\",\"code\": \"22029900\",\"price\": 4.99},{\"name\": \"FARINHA DE MILHO FLOCAO ANCHIETA 500G\",\"code\": \"11041900\",\"price\": 2.49},{\"name\": \"PATE WHISKAS 290G PEIXE\",\"code\": \"23099010\",\"price\": 13.99},{\"name\": \"PADARIA PAO FRANCES KG\",\"code\": \"19012010\",\"price\": 2.40}]}",
                "attributes": {
                  "ApproximateReceiveCount": "1",
                  "SentTimestamp": "1545082649183",
                  "SenderId": "AIDAIENQZJOLO23YVJ4VO",
                  "ApproximateFirstReceiveTimestamp": "1545082649185"
                },
                "messageAttributes": {},
                "md5OfBody": "e4e68fb7bd0e697a0ae8f1bb342846b3",
                "eventSource": "aws:sqs",
                "eventSourceARN": "arn:aws:sqs:us-east-2:123456789012:my-queue",
                "awsRegion": "us-east-2"
              }
            ]
          };
        await expect(lambdaHandler(event)).resolves.toBeUndefined();
    });

    it.skip('GoogleGeolocationGateway', async () => {
      const sut = new GoogleGeolocationGateway();
      const response = await sut.getGeoLocationFromAddress(
          'Rua Agenor de Paula Estrela, 672, Carmo, 	31748190 - Belo Horizonte, MG',
      );
      expect(response.latitude).toBe(-19.8094012);
      expect(response.longitude).toBe(-43.93990549999999);
  });
});