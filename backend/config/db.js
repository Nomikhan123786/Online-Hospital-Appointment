// db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // stop trying after 5s
    });

    console.log(` MongoDB Connected Successfully`);
    console.log(` Host: ${conn.connection.host}`);
    console.log(` Database: ${conn.connection.name}`);

  } catch (error) {
    console.error(" MongoDB Connection Failed");
    console.error(`Error: ${error.message}`);
    process.exit(1); // stop server if DB fails
  }
};

// Connection Events
mongoose.connection.on("disconnected", () => {
  console.log(" MongoDB Disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB Reconnected");
});

export default connectDB;