import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/ErrorMiddleware.js";
import { FeedBack } from "../models/FeedbackSchema.js";

export const sendFeedBack = catchAsyncError(async (req, res, next) => {
  const id = req.patient._id;
  const firstName = req.patient.firstName;
  const lastName = req.patient.lastName;
  const email = req.patient.email;
  const { message } = req.body;

  if (!message || message.length < 20) {
    return next(
      new ErrorHandler("Message must contain at least 20 characters", 400)
    );
  }
  const feedBack = await FeedBack.create({
    patientId: id,
    firstName,
    lastName,
    email,
    message,
  });

  res.status(200).json({
    success: true,
    message: "Review Sent",
    feedBack,
  });
});
export const getAllFeedBack = catchAsyncError(async (req, res, next) => {
  const feedbacks = await FeedBack.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, feedbacks });
});
export const deleteFeedBackById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const feedback = await FeedBack.findById(id);
  if (!feedback) {
    return next(new ErrorHandler("Feedback not found", 404));
  }
  await feedback.deleteOne();
  res.status(200).json({
    success: true,
    message: "Feedback deleted successfully",
  });
});
