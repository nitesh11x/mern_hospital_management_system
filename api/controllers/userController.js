import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/ErrorMiddleware.js";
import { User } from "../models/UserSchema.js";
import { generateToken } from "../utils/generateToken.js";
import cloudinary from "cloudinary";

export const adminRegister = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please fill in all required details", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("This email is already registered", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Admin",
    status: "Accepted",
  });

  generateToken(user, "Admin registered successfully", 200, res);
});
export const adminLogin = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please fill in all required details", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("User is not registered", 400));

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Email and password do not match", 400));
  }
  generateToken(user, "Admin login successful", 200, res);
});
export const doctorRegister = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor avatar is required", 400));
  }
  const { docAvtar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (!allowedFormats.includes(docAvtar.mimetype)) {
    return next(
      new ErrorHandler("Only JPEG, PNG, JPG, and WEBP formats are allowed", 400)
    );
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered)
    return next(new ErrorHandler("This email already exists", 400));

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvtar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown error"
    );
    return next(new ErrorHandler("Failed to upload image to Cloudinary", 500));
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    status: "Accepted",
    docAvtar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  generateToken(user, "Doctor registered successfully", 200, res);
});
export const doctorLogin = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role)
    return next(new ErrorHandler("Fill Complete Details"), 400);

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Doctor Not Exist "));
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched)
    return next(new ErrorHandler("invalid Email or password"), 400);
  generateToken(user, "Doctor login successful", 200, res);
});
export const editDoctorById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const doctor = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!doctor) {
    return next(new ErrorHandler("Doctor not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Doctor Details updated successfully",
    doctor,
  });
});
export const editAdminById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const admin = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!admin) {
    return next(new ErrorHandler("Admin not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Admin Details updated successfully",
    admin,
  });
});
export const deleteDoctorById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const doctor = await User.findByIdAndDelete(id);
  if (!doctor) {
    return next(new ErrorHandler("Doctor not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Doctor Details deleted successfully",
  });
});
export const deleteAdminById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const admin = await User.findByIdAndDelete(id);
  if (!admin) {
    return next(new ErrorHandler("admin not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "admin Details deleted successfully",
  });
});
export const logoutAdmin = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({ success: true, message: "Admin logged out successfully" });
});
export const logoutDoctor = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("doctorToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({ success: true, message: "Doctor logged out successfully" });
});
export const getAdmin = catchAsyncError(async (req, res, next) => {
  const admin = await User.find({ role: "Admin" });
  if (!admin) return next(new ErrorHandler("Admin Not Found"), 400);
  res.status(200).json({ message: "admins", success: true, admin });
});
export const getAdminById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const admin = await User.findById(id);
  if (!admin) return next(new ErrorHandler("Admin Not Found"), 400);
  res.status(200).json({ message: "doctors", success: true, admin });
});
export const getDoctor = catchAsyncError(async (req, res, next) => {
  const doctor = await User.find({ role: "Doctor" });
  if (!doctor) return next(new ErrorHandler("Doctor Not Found"), 400);
  res.status(200).json({ message: "doctors", success: true, doctor });
});
export const getDoctorById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const doctor = await User.findById(id);
  if (!doctor) return next(new ErrorHandler("Doctor Not Found"), 400);
  res.status(200).json({ message: "doctor", success: true, doctor });
});
