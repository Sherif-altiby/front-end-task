import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// REGISTER
export const registerService = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword
  });

  const token = signToken(user);

  return {
    user,
    token
  };
};

// LOGIN
export const loginService = async (data) => {
  const user = await User.findOne({ email: data.email }).select("+password");

  if (!user) {
    throw new ApiError(400, "You should register");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new ApiError(400, "Invalid Email or Password");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
};