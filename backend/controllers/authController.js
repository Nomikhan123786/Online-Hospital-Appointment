import User from "../models/User.js";
import bcrypt from "bcryptjs";
//import generateToken from "../utils/generateToken.js";
import generateOTP from "../utils/generateOTP.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = generateOTP();

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    emailOTP: otp,
    emailOTPExpire: Date.now() + 10 * 60 * 1000,
  });

  await sendEmail(
    email,
    "Email Verification Code",
    `Your verification code is: ${otp}`
  );

  res.json({ message: "OTP sent to email" });
};


// VERIFY EMAIL
export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.emailOTP !== otp || user.emailOTPExpire < Date.now())
    return res.status(400).json({ message: "Invalid or expired OTP" });

  user.isVerified = true;
  user.emailOTP = null;
  await user.save();

  res.json({ message: "Email verified successfully" });
  
};


// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
    
      return res.status(400).json({ message: "Invalid credentials" });
      
    }
  

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,  
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,   
      token,
    });

  } catch (error) {
    
    console.error(error);

    res.status(500).json({ message: "Server error" });
  }
};


// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
   
   if (!email) {
      return res.status(400).json({ message: "Email required" });
    }
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const otp = generateOTP();
  user.resetOTP = otp;
  user.resetOTPExpire = Date.now() + 10 * 60 * 1000;

  await user.save();

  await sendEmail(
    email,
    "Password Reset Code",
    `Your password reset code is: ${otp}`
  );

  res.json({ message: "Reset OTP sent to email" });
};


// RESET PASSWORD
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.resetOTP !== otp || user.resetOTPExpire < Date.now())
    return res.status(400).json({ message: "Invalid or expired OTP" });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetOTP = null;

  await user.save();

  res.json({ message: "Password updated successfully" });
};