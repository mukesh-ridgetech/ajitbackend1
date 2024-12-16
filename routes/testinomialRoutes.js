import express from "express";
import {
  createTestinomial,
  getAllTestinomials,
  getTestinomialById,
  updateTestinomial,
  deleteTestinomial,
  toggeled,
  uploadImage,
} from "../controllers/testinomailController.js";
import upload from "../config/Single.js";
const router = express.Router();

// CRUD Routes
router.post("/createTestinomial", createTestinomial); // Create
router.get("/getTestinomial", getAllTestinomials); // Read All
router.get("/getByIdtestinomial/:id", getTestinomialById); // Read One
router.put("/updateTestinomial/:id", updateTestinomial); // Update
router.delete("/deleteTestinomial/:id", deleteTestinomial); // Delete
router.patch("/toggled/:id", toggeled);

router.post("/uploadImage", upload.single("image"), uploadImage);
export default router;
