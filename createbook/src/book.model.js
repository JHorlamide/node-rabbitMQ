import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    authorName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Books = mongoose.model("Books", bookSchema);

export default Books;
