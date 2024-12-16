import express from "express";
import {
  createTag,
  getAllTags,
  updateTag,
  deleteTag,
} from "../controllers/TagController.js";

const router = express.Router();

// Create a new tag
router.post("/createTag", createTag);

// Get all tags
router.get("/getAllTag", getAllTags);

// Update a tag by ID
router.put("/:id", updateTag);

// Delete a tag by ID
router.delete("/:id", deleteTag);

export default router;
