import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";
import adminRoute from "./routes/adminRoute/index.js";


const app = express();
const PORT = process.env.PORT || 8100;

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
