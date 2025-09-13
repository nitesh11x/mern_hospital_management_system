import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { catchAsyncError } from "./CatchAsyncError.js";
import { Patient } from "../models/PatientSchema.js";
import { User } from "../models/UserSchema.js";
import ErrorHandler from "./ErrorMiddleware.js";

config();

export const isPatientAuth = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.patientToken;
  if (!token) {
    return next(
      new ErrorHandler("Not authenticated. Please login as Patient", 400)
    );
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.patient = await Patient.findById(decode.id);
  const patient = req.patient;
  // if (patient.role !== "Patient") {
  //   return next(new ErrorHandler("Patient not found", 404));
  // }
  next();
});

export const isAdminAuth = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(
      new ErrorHandler("Not authenticated. Please login as Admin", 400)
    );
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.admin = await User.findById(decode.id);
  let admin = req.admin;

  if (admin.role !== "Admin") {
    return next(
      new ErrorHandler("Only Admins are authorized to access this route", 403)
    );
  }

  next();
});

export const isDoctorAuth = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.doctorToken;
  if (!token) {
    return next(
      new ErrorHandler("Not authenticated. Please login as Doctor", 400)
    );
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.doctor = await User.findById(decode.id);
  const doctor = req.doctor;

  if (doctor.role !== "Doctor") {
    return next(
      new ErrorHandler("Only Doctors are authorized to access this route", 403)
    );
  }
  next();
});
