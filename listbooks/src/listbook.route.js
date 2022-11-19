import express from "express";
import amqp from "amqplib";

import Book from "./listbook.model.js";

const router = express.Router();

let channel;

const createBook = async (book) => {
  const newBook = new Book({ ...book });
  await newBook.save();
};

export async function rabbitMQConnect() {
  const amqpServer = process.env.RABBITMQ_URL;

  try {
    const connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("LIST_BOOK");
  } catch (error) {
    console.error("RabbitMQ Error: ", error);
  }
}

rabbitMQConnect().then(() => {
  channel.consume("LIST_BOOK", async (data) => {
    console.log("Consuming LIST_BOOK");

    const { book } = JSON.parse(data.content);
    console.log(book);

    await createBook(book);
  });
});

router.get("/api/books", async (req, res) => {
  const { page_number } = req.query;
  const books_per_page = 20;
  const skip = Number(books_per_page * page_number);

  const books = await Book.find({})
    .sort({ name: 1 })
    .skip(skip)
    .limit(books_per_page)
    .exec();
  res.status(200).json({ status: true, data: books });
});

export default router;
