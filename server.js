import express, { response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import TagRoute from "./routes/TagRoute.js";
import BlogRoute from "./routes/BlogRoute.js";
import testinomialRoutes from "./routes/testinomialRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cors from "cors";
// Initialize App and Configurations
dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Middleware
app.use(express.json()); // For parsing JSON requests

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/tag", TagRoute);
app.use("/api/blog", BlogRoute);
app.use("/api/testinomial", testinomialRoutes);
app.use("/api/uploadImage", uploadRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Deewan Realty</h1>");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
