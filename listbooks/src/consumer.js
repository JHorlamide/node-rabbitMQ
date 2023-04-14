import amqp from "amqplib";
import Book from "./listbook.model.js";
import dotenv from "dotenv";
dotenv.config();

let amqpConnection = null;
let retryCount = 0;

const createBook = async (book) => {
  const newBook = new Book({ ...book });
  await newBook.save();
};

async function rabbitMQConnect() {
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

    console.log("[AMQP Consumer]: RabbitMQ connected...");
    amqpConnection = connection;
    await whenConnected();
  } catch (error) {
    const retrySeconds = 5;
    console.log(
      `Connection RabbitMQ failed, (will retry in #${++retryCount} after ${retrySeconds} seconds: `,
      error
    );

    setTimeout(rabbitMQConnect, retrySeconds * 1000);
  }
}

async function whenConnected() {
  await startWorker();
}

// A worker that acknowledges messages only if processed successfully
async function startWorker() {
  try {
    const workerChannel = await amqpConnection.createChannel();

    workerChannel.on("error", function (error) {
      console.log("[AMQP] workerChannel error: ", error.message);
    });

    workerChannel.on("close", function () {
      console.log("[AMQP] workerChannel closed");
    });

    workerChannel.prefetch(10);

    await workerChannel.assertQueue("books", { durable: true });

    workerChannel.consume("books", processMsg, { noAck: false });

    async function processMsg(message) {
      const incomingDate = new Date().toISOString();
      const { book } = JSON.parse(message.content);

      if (book) {
        console.log(
          `Message [deliveryTag=${message.fields.deliveryTag}] arrived at ${incomingDate}`
        );

        work(message, function (ok) {
          console.log("Sending Ack for msg at time " + incomingDate);

          try {
            if (ok) {
              createBook(book);
              workerChannel.ack(message);
            } else {
              workerChannel.reject(message, true);
            }
          } catch (error) {
            closeOnErr(error);
          }
        });
      }
    }
  } catch (error) {
    closeOnErr(error);
  }
}

function work(message, callBack) {
  console.log("Got message", message.content.toString());
  setTimeout(() => callBack(true), 1000);
}

function closeOnErr(error) {
  if (!error) return false;
  console.log("[AMQP] error: ", error);
  amqpConnection.close();
  return true;
}

export default rabbitMQConnect;
