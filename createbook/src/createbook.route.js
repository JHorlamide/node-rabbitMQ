import express from "express";
import amqp from "amqplib";
import dotenv from "dotenv";
import Books from "./book.model.js";

dotenv.config();

const router = express.Router();
let channel;

export async function rabbitMQConnect() {
  const amqpServer = process.env.RABBITMQ_URL;
  try {
    const connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("CREATE_BOOK");
  } catch (error) {
    console.error("RabbitMQ Error: ", error);
  }
}

router.post("/api/books", async (req, res) => {
  channel.sendToQueue(
    "LIST_BOOK",
    Buffer.from(JSON.stringify({ book: req.body }))
  );

  const book = new Books({ ...req.body });
  await book.save();

  res.status(201).json({ status: true, data: book });
});

export default router;
