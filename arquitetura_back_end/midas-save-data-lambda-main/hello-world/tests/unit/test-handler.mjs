'use strict';

import { lambdaHandler } from '../../app.mjs';
import { expect } from 'chai';

const event = {
  "Records": [
      {
          "messageId": "1",
          "receiptHandle": "AQEBwJnKyrHigUMZj6rYigCgxlaS3SLy0a...",
          "body": "{\"Message\": \"{\\\"companyName\\\":\\\"DMA DISTRIBUIDORA S/A\\\",\\\"cnpj\\\":\\\"01.928.075/0078-89\\\",\\\"stateRegistration\\\":\\\"062678368.60-18\\\",\\\"address\\\":{\\\"street\\\":\\\"AV. MIGUEL PERRELA\\\",\\\"number\\\":\\\"000987\\\",\\\"neighborhood\\\":\\\"CASTELO\\\",\\\"zipCode\\\":\\\"31330-290\\\",\\\"city\\\":\\\"BELO HORIZONTE\\\",\\\"state\\\":\\\"MG\\\",\\\"lat\\\":\\\"-19.87811\\\",\\\"lng\\\":\\\"-43.99649\\\"},\\\"products\\\":[{\\\"product\\\":\\\"ARROZ BRANCO kg\\\",\\\"code\\\":\\\"11111\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"kg\\\",\\\"price\\\":4.50},{\\\"product\\\":\\\"FEIJAO PRETO kg\\\",\\\"code\\\":\\\"22222\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"kg\\\",\\\"price\\\":7.20},{\\\"product\\\":\\\"OLEO DE SOJA L\\\",\\\"code\\\":\\\"33333\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"L\\\",\\\"price\\\":6.30},{\\\"product\\\":\\\"ACUCAR REFINADO kg\\\",\\\"code\\\":\\\"44444\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"kg\\\",\\\"price\\\":3.40},{\\\"product\\\":\\\"MACARRAO PARAFUSO 500g\\\",\\\"code\\\":\\\"55555\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"UN\\\",\\\"price\\\":5.00},{\\\"product\\\":\\\"SAL REFINADO kg\\\",\\\"code\\\":\\\"66666\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"kg\\\",\\\"price\\\":2.20},{\\\"product\\\":\\\"CAFÉ TORRADO MOÍDO 500g\\\",\\\"code\\\":\\\"77777\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"UN\\\",\\\"price\\\":10.50},{\\\"product\\\":\\\"FARINHA DE TRIGO kg\\\",\\\"code\\\":\\\"88888\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"kg\\\",\\\"price\\\":4.00},{\\\"product\\\":\\\"LEITE INTEGRAL L\\\",\\\"code\\\":\\\"99999\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"L\\\",\\\"price\\\":3.50},{\\\"product\\\":\\\"MARGARINA 500g\\\",\\\"code\\\":\\\"101010\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"UN\\\",\\\"price\\\":4.80},{\\\"product\\\":\\\"QUEIJO MUSSARELA kg\\\",\\\"code\\\":\\\"111111\\\",\\\"quantity\\\":0.5,\\\"unit\\\":\\\"kg\\\",\\\"price\\\":18.00},{\\\"product\\\":\\\"PRESUNTO kg\\\",\\\"code\\\":\\\"121212\\\",\\\"quantity\\\":0.5,\\\"unit\\\":\\\"kg\\\",\\\"price\\\":15.00},{\\\"product\\\":\\\"CREME DE LEITE 200g\\\",\\\"code\\\":\\\"131313\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"UN\\\",\\\"price\\\":3.20},{\\\"product\\\":\\\"REFRIGERANTE 2L\\\",\\\"code\\\":\\\"141414\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"UN\\\",\\\"price\\\":7.00},{\\\"product\\\":\\\"DETERGENTE L\\\",\\\"code\\\":\\\"151515\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"L\\\",\\\"price\\\":2.80},{\\\"product\\\":\\\"SABAO EM PO 1kg\\\",\\\"code\\\":\\\"161616\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"kg\\\",\\\"price\\\":8.50},{\\\"product\\\":\\\"PAPEL HIGIENICO 4un\\\",\\\"code\\\":\\\"171717\\\",\\\"quantity\\\":1,\\\"unit\\\":\\\"PT\\\",\\\"price\\\":10.00}],\\\"additionalInformation\\\":{\\\"totalItems\\\":17,\\\"totalValue\\\":115.00,\\\"valuePaid\\\":115.00,\\\"paymentMethod\\\":\\\"04 - Cartão de Débito\\\",\\\"accessKey\\\":\\\"31-24/05-01.928.075/0078-89-65-009-000.228.934-151.210.8756\\\",\\\"otherInformation\\\":\\\"20240502007800900592670\\\",\\\"date\\\":\\\"2024-07-08T01:12:00.898Z\\\"}}\"}",
          "attributes": {
              "ApproximateReceiveCount": "1",
              "SentTimestamp": "1594840000000",
              "SenderId": "AIDAIENQZJOLO23YVJ4VO",
              "ApproximateFirstReceiveTimestamp": "1594840000001"
          },
          "messageAttributes": {
              "AttributeOne": {
                  "stringValue": "Attribute Value",
                  "stringListValues": [],
                  "binaryListValues": [],
                  "dataType": "String"
              }
          },
          "md5OfBody": "7b270e59b47ff90a553787216d55d91d",
          "eventSource": "aws:sqs",
          "eventSourceARN": "arn:aws:sqs:us-east-1:982286361702:MidasSaveDataSQS.fifo",
          "awsRegion": "us-east-1"
      }
  ]
};

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const result = await lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.message).to.be.equal("hello world");
    });
});
