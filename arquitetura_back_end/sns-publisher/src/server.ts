const express = require('express');
const { SNS } = require('aws-sdk');
const { z, ZodError } = require('zod');

const app = express();
app.use(express.json());

app.post('/nfe', async (request, response) => {
  const requestBodySchema = z.object({
    url: z.string().url(),
  });

  try {
    const { url } = requestBodySchema.parse(request.body);
    const sns = new SNS({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET,
      region: 'us-east-1',
    });

    const { MessageId } = await sns.publish({
      Message: JSON.stringify({ url }),
      TopicArn: process.env.AWS_TOPIC_ARN,
      MessageGroupId: '01',
    }).promise();

    if (!MessageId) {
      throw new Error('Fail to publish SNS message');
    }

    return response.status(201).json({ success: true });
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      return response.status(400).json({
        message: error.format(),
      });
    }
    return response.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(Number(process.env.PORT), () => {
  console.log(`HTTP Server is running on port ${process.env.PORT}`);
});
