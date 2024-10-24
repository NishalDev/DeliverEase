import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import goodsRoutes from "./routes/goodsRoutes.js";
import transporterRoutes from "./routes/transporterRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js"
dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/goods", goodsRoutes);
app.use("/api/transporters", transporterRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
