let amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, connection) => {
  if (err) throw err;

  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    let queue = "task_queue";

    channel.assertQueue(queue, {
      durable: true
    });

    let count = 0;

    channel.consume(
      queue,
      message => {
        count++;
        let secs = message.content.toString().split(".").length - 1;
        console.log(`${count} - [x] Receive ${message.content.toString()}`);

        setTimeout(() => {
          console.log(`${count} - [x] Done!`);
        }, secs * 1000);
      },
      {
        noAck: false // default if true, delete message after send to a worker, false, if worker dies, rabbitmq re-send to other worker
      }
    );
  });
});
