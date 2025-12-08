import genToken from "../config/token.js";
import User from "../models/userModal.js";
import bcrypt from "bcrypt";
import validator from "validator";
import sendMail from '../config/sendMail.js'

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //! Validate
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be 8+ characters." });
    }

    //! Check user exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // !Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    //! Create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    //! Generate token
    const token = await genToken(user._id);

    //! Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.password = undefined;
    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
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
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
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

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found." });
    }

    const otp = Math.floor(1000 + Math.random() * 9999).toString();

    user.setOtp = otp;

    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false

    await user.save()

    await sendMail(email, otp)

    return res.status(200).json({message: "OTP Send successfully"})

  } catch (error) {
    return res.status(500).json({ message: `OTP error ${error.message}` });
  }
};
