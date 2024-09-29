import mongoose from "mongoose";
//import dotenv from 'dotenv';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connection successful!");
  } catch (error) {
    console.log("DB connection failed!", error);
    process.exit(1);
  }
};

export {connectDB};