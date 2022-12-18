import express from "express";
import Book from "./listbook.model.js";

const router = express.Router();

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
