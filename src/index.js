import express from "express";
import "dotenv/config"; 
import cors from "cors"; 
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from "./lib/db.js";
import job from "./lib/cron.js";
const app = express();
const PORT = process.env.PORT || 3000;

job.start(); // Start the cron job
app.use(express.json());
app.use(cors());

app.use("/api/auth" ,authRoutes);
app.use("/api/books" ,bookRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
  connectDB();
});
