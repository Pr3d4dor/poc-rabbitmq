const amqp = require('amqplib/callback_api');
const CONN_URL = 'amqps://kaeovqaw:Ma_dE9_6gNd65bUboI6bsivTfVLDxvQ8@jackal.rmq.cloudamqp.com/kaeovqaw';

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
    });
});

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});

export const publishToQueue = async (queueName, data) => {
    console.log({ data });

    console.log(JSON.stringify(data));

    ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true });
}
