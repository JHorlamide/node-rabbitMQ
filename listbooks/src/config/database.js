import mongoose from "mongoose";

let count = 0;
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://root:1234@mongodb:27017/");
    console.log("Database connected successfully...");
  } catch (error) {
    console.log(
      `MongoDB connection unsuccessful, retry after 5 seconds. ${++count}`
    );

    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
