import User from "../models/userModal.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Get current user error ${error}` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { description, name } = req.body;
    let photoUrl;
    if (req.file) {
      photoUrl = await uploadOnCloudinary(req.file.path);
    }

    const user = await User.findByIdAndUpdate(userId, {
      description,
      name,
      photoUrl,
    });

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Profile update error ${error}` });
  }
};
