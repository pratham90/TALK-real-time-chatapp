import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import { generateToken } from "../lib/util.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  try {
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "password must have more that 8 characters" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "email already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPass,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.log("error in signup", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "invalid email or password" });
    }
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      res.status(401).json({ message: "invalid credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in login", error.meassage);
  }
};
export const logout = (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("error in logout", error.message);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      res.status(401).json({ message: "profile picture is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.url },
      { new: true }
    );
    
    res.status(200).json(updatedUser);
  }
   catch (error) {
    console.log("error in update profile", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const checkAuth = (req,res)=>{
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log("error in check auth",error.message)
    res.status(500).json({message:"internal server error"})
  }
}