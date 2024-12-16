// models/Blog.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const MetaTagSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const BlogSchema = new Schema(
  {
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag", // Referencing the Tag model
      },
    ],
    metaTags: [MetaTagSchema], // New field for meta tags
    date: {
      type: Date,
      default: Date.now,
    },
    version: {
      type: Number,
      default: 1,
    }, // Track version of blog
    modifiedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    }, // Track who last modified the blog
  },
  { timestamps: true }
);

const Blog = model("Blog", BlogSchema);

export default Blog;
