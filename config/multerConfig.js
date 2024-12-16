import multer from "multer";
import path from "path";

// const maxSize = 10 * 1024 * 1024; // 10 MB
// Set storage engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 /* bytes */ }, // Limit to 10SMB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images only!");
    }
  },
});

// Allow multiple files for logo field
const uploadMultiple = upload.fields([{ name: "logo", maxCount: 5 }]); // Adjust maxCount as needed

export { uploadMultiple };
