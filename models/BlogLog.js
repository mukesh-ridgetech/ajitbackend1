// models/BlogLog.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogLogSchema = new Schema({
  blogId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
  modifiedBy: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  version: { type: Number, required: true },
  changes: { type: Object }, // Object containing the changes
  action: { type: String, enum: ["create", "update"], required: true }, // Create or update
  timestamp: { type: Date, default: Date.now },
});

const BlogLog = model("BlogLog", blogLogSchema);

export default BlogLog;
