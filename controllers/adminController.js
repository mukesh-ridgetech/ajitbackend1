import bcrypt from "bcryptjs";
import Admin from "../models/adminModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Register new admin
// @route POST /api/admin/register
// @access Public
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if admin exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const newAdmin = new Admin({ name, email, password: hashedPassword });

    await newAdmin.save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      newAdmin,
      token: generateToken(newAdmin._id),
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

// @desc Login admin
// @route POST /api/admin/login
// @access Public
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    // Check if admin exists and password matches
    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.status(201).send({
        success: true,
        message: "User Login Successfully",
        admin,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Errro in Login",
      error,
    });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params; // Get the admin ID from URL parameters
    const admin = await Admin.findById(id); // Find the admin by ID

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin); // Return the admin data
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin data", error });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await Admin.find({}).select("-password");

    if (users) {
      res.status(201).send({
        success: true,
        message: "User Fetch successfully",
        users,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Errro in fetching users",
      error,
    });
  }
};

// update users

export const updateUser = async (req, res) => {
  // const { name, email, password } = req.body;
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Find the admin by ID
    let admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update fields
    admin.name = name || admin.name;
    admin.email = email || admin.email;
    // admin.Status = status || admin.Status;

    // If password is provided, encrypt it before updating
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    // Save the updated admin data
    const updatedAdmin = await admin.save();

    if (updatedAdmin) {
      res.status(201).send({
        success: true,
        message: "User Login Successfully",
        updatedAdmin,
        token: generateToken(admin._id),
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Errro in updating users",
      error,
    });
  }
};

export const toggeled = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the admin by ID
    let admin = await Admin.findById(id);
    if (admin.Status === "Active") {
      admin.Status = "Inactive";
    } else {
      admin.Status = "Active";
    }

    const updatedAdmin = await admin.save();

    if (updatedAdmin) {
      res.status(201).send({
        success: true,
        message: "User Status updated",
        updatedAdmin,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Errro in updating users status",
      error,
    });
  }
};

// @desc Onboard new admin by existing admin
// @route POST /api/admin/onboard
// @access Private
export const onboardAdmin = async (req, res) => {
  const { name, email, password, createdBy } = req.body;
  console.log(req.body);

  try {
    // Check if admin exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin by another admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      createdBy,
    });

    console.log(newAdmin);

    await newAdmin.save();
    res.status(201).send({
      success: true,
      message: "Admin unboarded Successfully",
      newAdmin,
      token: generateToken(newAdmin._id),
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Errro in users unboarding",
      error,
    });
  }
};
