import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: [3, "First name must contain at least 3 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minLength: [3, "Last name must contain at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: {
      values: ["male", "female", "other"],
      message: "Gender must be male, female, or other",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [4, "Password must be at least 8 characters"],
    maxLength: [20, "Password must not exceed 20 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["Admin", "Doctor"],
    default: "Doctor",
  },
  docAvtar: {
    public_id: String,
    url: String,
  },
  adminAvtar: {
    public_id: String,
    url: String,
  },
  doctorDepartment: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Blocked", "Accepted", "Restricted"],
    default: "Pending",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const User = mongoose.model("User", userSchema);
