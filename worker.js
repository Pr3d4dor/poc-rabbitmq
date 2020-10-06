const amqp = require('amqplib/callback_api');
const CONN_URL = 'amqps://kaeovqaw:Ma_dE9_6gNd65bUboI6bsivTfVLDxvQ8@jackal.rmq.cloudamqp.com/kaeovqaw';

amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, ch) {
        ch.consume('test', function (msg) {
            console.log('.....');
            setTimeout(function(){
                console.log("Message:", msg.content.toString());
                ch.ack(msg);
            }, 8000);
        },
        { noAck: false }
        );
        ch.consume('test', function (msg) {
            console.log('.....');
            setTimeout(function () {
                console.log("Message:", msg.content.toString());
                ch.ack(msg);
            }, 8000);
        },
        { noAck: false }
        );
    });
});
