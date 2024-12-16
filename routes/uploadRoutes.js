import express from "express";
import { uploadImage } from "../controllers/uploadImages.js";

import upload from "../config/Single.js";
const router = express.Router();

// Create a new tag
router.post("/", upload.single("image"), uploadImage);

export default router;
