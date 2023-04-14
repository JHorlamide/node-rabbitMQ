import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();

let amqpConnection;
let isConnected = false;
let retryCount = 0;

const rabbitMQConnect = async () => {
  if (isConnected) return;
  isConnected = true;

  const amqpServer = process.env.RABBITMQ_URL + "?heartbeat=60";

  try {
    const connection = await amqp.connect(amqpServer);

    connection.on("error", function (error) {
      if (error.message !== "Connection closing") {
        console.log("[AMQP] connection error: ", error.message);
      }
    });

    connection.on("close", function () {
      console.log("[AMQP] reconnecting");
      return setTimeout(rabbitMQConnect, 1000);
    });

    console.log("[AMQP Producer]: RabbitMQ connected...");
    amqpConnection = connection;
    await whenConnected();
    isConnected = false;
  } catch (error) {
    const retrySeconds = 5;
    console.log(
      `Connection RabbitMQ failed, (will retry in #${++retryCount} after ${retrySeconds} seconds: `,
      error
    );

    setTimeout(rabbitMQConnect, retrySeconds * 1000);
  }
};

async function whenConnected() {
  await startPublisher();
}

// Publisher
let publisherChannel;
let offlinePublisherQueue = [];

async function startPublisher() {
  try {
    const pubChannel = await amqpConnection.createChannel();

    pubChannel.on("error", function (error) {
      console.log("[AMQP] pubChannel error: ", error.message);
    });

    pubChannel.on("close", function () {
      console.log("['AMQP'] pubChannel closed");
    });

    publisherChannel = pubChannel;

    while (true) {
      const message = offlinePublisherQueue.shift();
      if (!message) break;

      publisher(message[0], message[1], message[2]);
    }
  } catch (error) {
    closeOnError(error);
    console.log("[AMQP pubChannel]: create pubChannel error: ", error.message);
  }
}

// method to publish a message,
// will queue messages internally
// if the connection is down and resend later
export async function transactionalPublisher(exchange, routingKey, content) {
  try {
    // Begin a transaction
    await publisherChannel.transaction(async function (tx) {
      // Publish message within the transaction
      publisherChannel.publish(
        exchange,
        routingKey,
        content,
        { persistent: true },
        function (error, success) {
          if (error) {
            console.log("[AMQP producer]: publish error: ", error);
            offlinePublisherQueue.push([exchange, routingKey, content]);
            publisherChannel.connect.close();
          }
        }
      );

      // Commit the transaction;
      await tx.commit();
      console.log("Transaction committed");
    });
  } catch (error) {
    console.log("[AMQP producer]: publisher error: ", error.message);
    offlinePublisherQueue.push([exchange, routingKey, content]);
  }
}

function closeOnError(error) {
  if (!error) return false;

  console.log("[AMQP] error: ", error);
  amqpConnection.close();
  return true;
}

export default rabbitMQConnect;
