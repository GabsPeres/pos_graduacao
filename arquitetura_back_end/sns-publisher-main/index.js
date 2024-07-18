import express from 'express';
import { snsClient, PublishCommand } from './aws-client-sdk.js';
import { TOPIC_ARN, MESSAGE_GROUP_ID } from './const.js';

const app = express()
app.use(express.json());
const port = 3000

app.post('/', async (req, res) => {
    const { url } = req.body;
    const input = {
        Message: url,
        TopicArn: TOPIC_ARN,
        MessageGroupId: MESSAGE_GROUP_ID,
    }

    const command = new PublishCommand(input);
    const response = await snsClient.send(command);
    res.send(response);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})