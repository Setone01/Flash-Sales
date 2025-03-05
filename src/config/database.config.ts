import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_CONNECTION) {
      throw new Error(
        "DATABASE_CONNECTION is not defined in environment variables."
      );
    }

    const connector = await mongoose.connect(process.env.DATABASE_CONNECTION, {
      maxPoolSize: 100,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected: ${connector.connection.host}`);
  } catch (error) {
    console.error(
      `MongoDB connection error: ${
        error instanceof Error ? error.message : error
      }`
    );
    process.exit(1);
  }
};

export default connectDB;
