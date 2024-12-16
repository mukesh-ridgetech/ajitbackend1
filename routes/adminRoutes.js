import express from "express";
import {
  registerAdmin,
  loginAdmin,
  onboardAdmin,
  getAllUser,
  updateUser,
  toggeled,
  getAdminById,
} from "../controllers/adminController.js";
import { protect, authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register new admin
router.post("/register", registerAdmin);

// Login admin
router.post("/login", loginAdmin);

router.put("/update/:id", updateUser);
router.get("/getUserbyId/:id", getAdminById);
router.patch("/toggled/:id", toggeled);

router.get("/getUsers", getAllUser);

// Onboard new admin (protected route)
router.post("/onboard", onboardAdmin);

export default router;
