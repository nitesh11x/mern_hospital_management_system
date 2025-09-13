import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/ErrorMiddleware.js";
import { Patient } from "../models/PatientSchema.js";
import { generateTokenPatient } from "../utils/generateToken.js";

export const registerPatient = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  )
    return next(new ErrorHandler("Please Fill Complete Details"), 400);
  let patient = await Patient.findOne({ email });
  if (patient) return next(new ErrorHandler("Email is Already Registerd"), 400);
  patient = await Patient.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Patient",
  });
  generateTokenPatient(patient, "Patient Registerd", 200, res);
});
export const loginPatient = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role)
    return next(new ErrorHandler("Fill Complete Details"), 400);

  let patient = await Patient.findOne({ email }).select("+password");
  if (!patient)
    return next(new ErrorHandler("This Email is not registerd", 400));
  const isPasswordMatched = await patient.comparePassword(password);
  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid Email Or Password"));
  generateTokenPatient(patient, "Patient Login Success", 200, res);
});
export const deletePaitent = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const patient = await Patient.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "Patient Deleted",
    patient,
  });
});
export const editPatient = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const patient = await Patient.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!patient) {
    return next(new ErrorHandler("Patient not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Patient updated successfully",
    patient,
  });
});
export const logoutPatient = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({ success: true, message: "Patient logged out successfully" });
});
export const getPatient = catchAsyncError(async (req, res, next) => {
  const patient = await Patient.find();
  if (!patient) return next(new ErrorHandler("Patient Not Found"), 400);
  res.status(200).json({ message: "Patient", success: true, patient });
});
export const getPatientById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);
  if (!patient) return next(new ErrorHandler("Patient Not Found"), 400);
  res.status(200).json({ message: "Patient", success: true, patient });
});
