import genToken from "../config/token.js";
import User from "../models/userModal.js";
import bcrypt from "bcrypt";
import validator from "validator";

// export const signUp = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     //! Validate
//     if (!name || !email || !password || !role) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ message: "Email is not valid." });
//     }

//     if (password.length < 8) {
//       return res.status(400).json({ message: "Password must be 8+ characters." });
//     }

//     //! Check user exists
//     const existUser = await User.findOne({ email });
//     if (existUser) {
//       return res.status(400).json({ message: "User already exists." });
//     }

//     // !Hash password
//     const hashPassword = await bcrypt.hash(password, 10);

//     //! Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashPassword,
//       role,
//     });

//     //! Generate token
//     const token = await genToken(user._id);

//     //! Set cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure:  process.env.NODE_ENV === "production",
//       sameSite: "Strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     user.password =undefined
//     return res.status(201).json({user});

//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({ message: `SignUp error ${error.message}` });
//   }
// };

export const signUp = async (req, res) => {
  try {
    // 🔹 MongoDB connection debug
    console.log("Attempting to connect to MongoDB...");
    try {
      const db = await connectDb();
      console.log("✅ MongoDB connected:", db.connection.host);
    } catch (err) {
      console.error("❌ MongoDB connection failed:", err);
      return res.status(500).json({ message: "Database connection failed" });
    }

    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      console.warn("⚠️ Validation failed: Missing fields");
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!validator.isEmail(email)) {
      console.warn("⚠️ Validation failed: Invalid email");
      return res.status(400).json({ message: "Email is not valid." });
    }

    if (password.length < 8) {
      console.warn("⚠️ Validation failed: Password too short");
      return res.status(400).json({ message: "Password must be 8+ characters." });
    }

    // Check if user exists
    let existUser;
    try {
      existUser = await User.findOne({ email });
      console.log("Checked existing user:", existUser ? existUser.email : "No user found");
    } catch (err) {
      console.error("❌ Error checking existing user:", err);
      return res.status(500).json({ message: "Error checking existing user" });
    }

    if (existUser) {
      console.warn("⚠️ User already exists:", email);
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    let user;
    try {
      user = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });
      console.log("✅ User created:", user.email);
    } catch (err) {
      console.error("❌ Error creating user:", err);
      return res.status(500).json({ message: "Error creating user" });
    }

    // Generate token
    const token = await genToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.password = undefined;
    return res.status(201).json({ user });

  } catch (error) {
    console.error("❌ Signup error:", error);
    return res.status(500).json({ message: `SignUp error ${error.message}` });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.password = undefined;
    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ message: `Login error ${error.message}` });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout error ${error.message}` });
  }
};
