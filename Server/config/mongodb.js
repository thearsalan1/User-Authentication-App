import mongoose from "mongoose";

const connectdb = async () => {
  try {
    console.log("Connecting to:", process.env.MONGODB_URI);
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
    console.log("Database Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectdb;
