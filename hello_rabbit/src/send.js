var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) throw err;


  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    let queue = 'hello';
    let message = 'Hello RabbitMQ';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(message));

    console.log(" [x] Sent %s", message);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0)
  }, 500);
});



