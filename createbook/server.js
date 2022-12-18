import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { onError } from "./src/utils.js";
import createBookRoute from "./src/createbook.route.js";
import rabbitMQConnect from "./src/producer.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,,PATCH",
    credentials: true,
  })
);
app.use(express.json({ extended: false }));
app.use(createBookRoute);

const main = async () => {
  try {
    await rabbitMQConnect();
  } catch (error) {
    onError(error);
  }
};

main();

app.listen(PORT, () => {
  console.log(`Createbook service running on port ${PORT}...`);
});
