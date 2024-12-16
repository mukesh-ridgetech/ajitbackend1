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
