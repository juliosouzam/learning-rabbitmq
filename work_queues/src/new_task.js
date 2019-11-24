let amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, connection) => {
  if (err) throw connection;

  connection.createChannel((err1, channel) => {
    if (err1) throw err1;

    let queue = "task_queue";
    let count = 0;

    setInterval(() => {
      count++;
      let message = process.argv.slice(2).join(" ") || "Hello Task!";

      channel.assertQueue(queue, {
        durable: true
      });

      channel.sendToQueue(queue, Buffer.from(message), {
        persistent: true
      });

      console.log(`${count} - [x] Send ${message}`);
    }, Math.round(Math.random()) * 1000);
  });
});
