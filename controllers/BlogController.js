// controllers/blogController.js
import Blog from "../models/Blogs.js";
import Admin from "../models/adminModel.js";
import BlogLog from "../models/BlogLog.js";
import mongoose from "mongoose";

const blogController = {
  // Create Blog (with logging)
  createBlog: async (req, res) => {
    try {
      const { title, slug, content, image, authorId, tags, metaTags } =
        req.body;

      //   console.log(authorId);
      const author = await Admin.findById(authorId);
      if (!author) return res.status(404).json({ message: "Author not found" });

      const slugExist = await Blog.find({ slug });
      if (slugExist.length > 0) {
        return res.status(400).json({ message: "Please enter another slug" });
      }

      const tagIds =
        tags && tags.length > 0
          ? tags.map((tag) => new mongoose.Types.ObjectId(tag)) // Convert tag IDs to ObjectId format
          : [];

      const blog = new Blog({
        title,
        content,
        slug,
        image,
        author: author._id,
        modifiedBy: author._id,
        tags: tagIds,
        metaTags,
      });

      await blog.save();

      // Create log entry for blog creation
      const logEntry = new BlogLog({
        blogId: blog._id,
        modifiedBy: author._id,
        version: blog.version,
        changes: { title, content, image },
        action: "create",
      });
      await logEntry.save();

      res.status(201).json({ message: "Blog created successfully", blog });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  // Update Blog (with logging and versioning)
  updateBlog: async (req, res) => {
    try {
      const {
        title,
        content,
        slug,
        image,
        status,
        tags,
        modifiedBy,
        metaTags,
        author,
      } = req.body;
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });

      // Update the blog fields
      const updatedFields = {};
      if (title) updatedFields.title = title;
      if (content) updatedFields.content = content;
      if (image) updatedFields.image = image;
      if (status) updatedFields.status = status;
      if (slug) updatedFields.slug = slug;
      if (author) updatedFields.author = author;
      if (tags && tags.length > 0) {
        updatedFields.tags = tags.map(
          (tag) => new mongoose.Types.ObjectId(tag)
        );
      } else {
        updatedFields.tags = [];
      }
      if (metaTags) {
        updatedFields.metaTags = metaTags;
      }
      updatedFields.modifiedBy = modifiedBy;
      updatedFields.version = blog.version + 1;

      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true }
      );

      // Log the changes
      const logEntry = new BlogLog({
        blogId: updatedBlog._id,
        modifiedBy,
        version: updatedBlog.version,
        changes: updatedFields,
        action: "update",
      });
      await logEntry.save();

      res
        .status(200)
        .json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
      res.status(500).json({ message: error.message, error });
    }
  },

  getBlogLogs: async (req, res) => {
    try {
      const logs = await BlogLog.find({ blogId: req.params.id })
        .populate("modifiedBy", "name")
        .populate("tags")
        .sort({ timestamp: -1 });
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find().populate("author").populate("tags");
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  getBlogById: async (req, res) => {
    try {
      console.log(req.params.id);
      const blog = await Blog.findById(req.params.id).populate("author");
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  getBlogBySlug: async (req, res) => {
    try {
      const blog = await Blog.findOne({ slug: req.params.slug })
        .populate("author")
        .populate("tags");
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });

      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  activateBlog: async (req, res) => {
    try {
      const blog = await Blog.findByIdAndUpdate(
        req.params.id,
        { status: "active" },
        { new: true }
      );
      if (!blog) return res.status(404).json({ message: "Blog not found" });

      res.status(200).json({ message: "Blog activated successfully", blog });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  deactivateBlog: async (req, res) => {
    try {
      const blog = await Blog.findByIdAndUpdate(
        req.params.id,
        { status: "inactive" },
        { new: true }
      );
      if (!blog) return res.status(404).json({ message: "Blog not found" });

      res.status(200).json({ message: "Blog deactivated successfully", blog });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  searchBlog: async (req, res) => {
    try {
      const { query } = req.body;

      if (!query || query.trim() === "") {
        return res.status(400).json({ message: "Search query is required" });
      }

      const blogs = await Blog.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
          { "metaTags.title": { $regex: query, $options: "i" } },
          { "metaTags.content": { $regex: query, $options: "i" } },
        ],
      })
        .populate("author", "name")
        .populate("tags", "name");

      if (blogs.length === 0) {
        return res.status(404).json({ message: "No blogs found" });
      }

      res.status(200).json({ message: "Blogs found", blogs });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
};

export default blogController;
