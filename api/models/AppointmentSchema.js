import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const appointmentSchema = new mongoose.Schema({
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
    lowercase: true, // normalize
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    minLength: [3, "Phone number must contain at least 3 digits"],
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
  appointment_date: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Solved"],
    default: "Pending",
  },
  paymentMode: {
    type: String,
    enum: ["Online", "Offline"],
    default: "Offline",
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
});
export const Appointment = mongoose.model("Appointment", appointmentSchema);
