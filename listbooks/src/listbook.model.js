import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    authorName: {
      type: String,
    },

    description: {
      type: String,
    },

    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const Books = mongoose.model("Books", bookSchema);

export default Books;
