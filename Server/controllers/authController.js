import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All details required" });
  }
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "password must be greater then 6 character",
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ success: false, message: "Invalid email formate" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "user already registered" });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hasedPassword,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "develpment" ? false : true,
      sameSite: process.env.NODE_ENV === "production" ? "non" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // SENDING WELCOME EMAIL
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Authentication System",
      text: `Welcome to Authentication System your account has been created on your email id: ${email}`,
    };
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .send({ success: true, message: "User login successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .send({ success: true, message: "User login successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error " });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: "true",
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.status(200).send({ success: true, message: "User logout" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error " });
  }
};
