let amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) throw err;

  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    let queue = 'task_queue';

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.consume(queue, (message) => {
      let secs = message.content.toString().split('.').length - 1;
      console.log('[x] Receive %s', message.content.toString());

      setTimeout(() => {
        console.log('[x] Done!');
      }, secs * 1000);
    }, {
      noAck: false // default if true, delete message after send to a worker, false, if worker dies, rabbitmq re-send to other worker
    });
  });
});