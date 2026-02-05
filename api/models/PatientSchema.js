import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const patientSchema = new mongoose.Schema({
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
    minLength: [10, "Phone number must contain exactly 10 digits"],
    maxLength: [10, "Phone number must not exceed 10 digits"],
    match: [/^\d+$/, "Phone number must contain only digits"],
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
      message: "Gender must be either male, female or other",
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
    enum: ["Admin", "Patient", "Doctor"],
    default: "Patient",
  },
  status: {
    type: String,
    enum: ["Pending", "Blocked", "Accepted", "Restricted"],
    default: "Pending",
  },
});

patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

patientSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

patientSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "4d",
  });
};

export const Patient = mongoose.model("Patient", patientSchema);
