import express from "express";
import blogController from "../controllers/BlogController.js"; // Adjust path if needed
const router = express.Router();

// Create a new blog
router.post("/createBlog", blogController.createBlog);

// Get all blogs
router.get("/getAllBlog", blogController.getAllBlogs);

// Get a blog by slug
router.get("/:slug", blogController.getBlogBySlug);

// Get a single blog by ID
router.get("/getbyId/:id", blogController.getBlogById);

// Update blog by ID
router.put("/:id", blogController.updateBlog);

// Delete blog by ID
router.delete("/:id", blogController.deleteBlog);

// Activate a blog
router.patch("/:id/activate", blogController.activateBlog);

// Deactivate a blog
router.patch("/:id/deactivate", blogController.deactivateBlog);

// Get blog logs
router.get("/:id/logs", blogController.getBlogLogs);

// Search for blogs
router.post("/search-blog", blogController.searchBlog);

export default router;
