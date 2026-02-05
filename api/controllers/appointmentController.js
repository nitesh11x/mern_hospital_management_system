import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/ErrorMiddleware.js";
import { Appointment } from "../models/AppointmentSchema.js";
import { User } from "../models/UserSchema.js";

export const postAppointment = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
    paymentMode,
  } = req.body;
  if (
    (!firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dob ||
      !gender ||
      !appointment_date ||
      !department ||
      !doctor_firstName ||
      !doctor_lastName ||
      !paymentMode ||
      !hasVisited ||
      !address
    )
  )
    return next(new ErrorHandler("Please Fill Complete Details"), 400);
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (isConflict.length === 0)
    return next(new ErrorHandler("Doctor not Found"));
  if (isConflict.length > 1)
    return next(
      new ErrorHandler("Doctors Conflict Please through Email of phone")
    );
  const doctorId = isConflict[0]._id;
  const patientId = req.patient._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
    paymentMode,
  });
  res
    .status(200)
    .json({ success: true, message: "AppointMent Send", appointment });
});
export const getAllAppointments = catchAsyncError(async (req, res, next) => {
  const appointments = await Appointment.find();
  res
    .status(200)
    .json({ message: "Appointments", success: true, appointments });
});
export const updateAppointmentStatus = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment)
      return next(new ErrorHandler("appointment not found"), 404);
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res
      .status(200)
      .json({ success: true, message: "Updated Successfully", appointment });
  }
);
export const deleteAppointment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) return next(new ErrorHandler("appointment not found"), 404);
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Deleted SuccessFully",
  });
});
