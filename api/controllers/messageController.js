import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/ErrorMiddleware.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return next(new ErrorHandler("please fill Complete Form", 400));
    }

    await Message.create({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error in sendMessage:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
export const getAllMessages = catchAsyncError(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({ messages: "All messages", success: true, messages });
});
