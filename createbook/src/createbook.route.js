import express from "express";
import Books from "./book.model.js";
import { publisher } from "./producer.js";
import { transactionalPublisher } from "./transactionalProducer.js";

const router = express.Router();

// router.post("/api/books", async (req, res) => {
//   try {
//     publisher("", "books", Buffer.from(JSON.stringify({ book: req.body })));
//     const book = await Books.create({ ...req.body });
//     res.status(201).json({ status: true, data: book });
//   } catch (error) {
//     console.error("Error: ", error.message);
//     res.status(400).json({
//       status: false,
//       message: "Could not create book",
//     });
//   }
// });

router.post("/api/books", async (req, res) => {
  Books.create({ ...req.body })
    .then((book) => {
      transactionalPublisher(
        "",
        "books",
        Buffer.from(JSON.stringify({ book: req.body }))
      );
      res.status(201).json({ status: true, data: book });
    })
    .catch((error) => {
      console.error("Error: ", error.message);
      res.status(400).json({
        status: false,
        message: "Could not create book",
      });
    });
});

export default router;
