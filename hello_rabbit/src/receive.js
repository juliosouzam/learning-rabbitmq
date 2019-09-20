var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) throw err;
  let count = 0;

  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    let queue = 'hello';

    channel.assertQueue(queue, {
      durable: false
    });

    console.log("[*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, (message) => {
      count++;
      console.log(`[x] Received %s - x ${count}`, message.content.toString());
    }, {
      noAck: true
    });
  });
});