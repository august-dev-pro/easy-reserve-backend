// src/connectedDb.ts

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectedDb = async () => {
  const dbURL = process.env.DBURL;
  if (!dbURL) {
    console.error("DBURL environment variable is not set");
    process.exit(1);
  }

  try {
    await mongoose.connect(dbURL, {
      serverSelectionTimeoutMS: 30000, // Temps de connexion à MongoDB en millisecondes
    });
    console.log("MongoDb connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectedDb;
