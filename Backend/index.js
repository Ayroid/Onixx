import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Database } from "./config/database.js";

// CONFIG
dotenv.config();

// CONSTANTS
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// APP
const app = express();

// DATABASE
const database = new Database(MONGODB_URI);
database.connect();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// TEST ROUTE
app.use("/api/test", (req, res) => {
  res.send("Server ✅");
});

// DATABASE DISCONNECTION

process.on("SIGINT", async () => {
  try {
    await database.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

// LISTEN
app.listen(PORT, () => {
  console.log(`Server ${PORT} ✅`);
});
