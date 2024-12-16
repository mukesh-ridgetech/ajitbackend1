import Testinomial from "../models/testinomialModel.js";

// Create a new Testimonial
export const createTestinomial = async (req, res) => {
  try {
    const newTestinomial = new Testinomial(req.body);
    const savedTestinomial = await newTestinomial.save();
    res.status(201).json(savedTestinomial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Testimonials
export const getAllTestinomials = async (req, res) => {
  try {
    const testinomials = await Testinomial.find();
    res.status(200).json(testinomials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Testimonial by ID
export const getTestinomialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testinomial = await Testinomial.findById(id);

    if (!testinomial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json(testinomial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Testimonial by ID
export const updateTestinomial = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTestinomial = await Testinomial.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedTestinomial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json(updatedTestinomial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Testimonial by ID
export const deleteTestinomial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestinomial = await Testinomial.findByIdAndDelete(id);

    if (!deletedTestinomial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggeled = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the admin by ID
    let Testinomials = await Testinomial.findById(id);
    if (Testinomials.status === "Active") {
      Testinomials.status = "Inactive";
    } else {
      Testinomials.status = "Active";
    }

    const newTestinomials = await Testinomials.save();

    if (newTestinomials) {
      res.status(201).send({
        success: true,
        message: "User Status updated",
        newTestinomials,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Errro in updating Furnished status",
      error,
    });
  }
};

export const uploadImage = async (req, res) => {
  // If no file is uploaded, return an error
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Create the image URL based on the server's static folder path
  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    res.status(201).json({
      message: "Image uploaded successfully",
      imageUrl: imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
