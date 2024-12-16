import Tag from "../models/Tag.js";

export const createTag = async (req, res) => {
  try {
    const { name, addedBy } = req.body;
    const tag = new Tag({ name, addedBy });
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ message: "Error creating tag", error });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find().populate("addedBy", "name");
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tags", error });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const tag = await Tag.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: "Error updating tag", error });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    await Tag.findByIdAndDelete(id);
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tag", error });
  }
};
