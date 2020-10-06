import express from 'express';
import bodyParser from 'body-parser';
import { publishToQueue } from './services/MQService';

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/msg', async (req, res, next) => {
    let { queueName, payload } = req.body;
    await publishToQueue(queueName, payload);

    return res.json({ message: 'OK!' });
})

app.listen(30006,()=>{
    console.log(' ********** : running on 30006');
})

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    process.exit();
});

module.exports = app;
