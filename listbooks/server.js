import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import listBookRoute from "./src/listbook.route.js";
import rabbitMQConnect from "./src/consumer.js";

dotenv.config();

const PORT = process.env.PORT || 2000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,,PATCH",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(listBookRoute);

function onError(error) {
  console.error(`Failed to start server:\n${error.stack}`);
  process.exit(1);
}

async function main() {
  try {
    await connectDB();
    await rabbitMQConnect();
  } catch (error) {
    onError(error);
  }
}

main();

app.listen(PORT, () => {
  console.log(`Listbook service running on port ${PORT}...`);
});
