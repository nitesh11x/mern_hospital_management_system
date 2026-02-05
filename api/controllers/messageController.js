import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/ErrorMiddleware.js";
import { Message } from "../models/messageSchema.js";

import nodemailer from "nodemailer";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return next(new ErrorHandler("Please fill the complete form!", 400));
    }

    await Message.create({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: process.env.SMTP_MAIL, // Sending to admin/yourself
      subject: `New Message from ${firstName} ${lastName}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error in sendMessage:", error.message);
    // Don't fail the request if email fails, but maybe log it
    return res.status(200).json({
      success: true,
      message: "Message saved (Email notification failed - check server logs)",
    });
  }
});
export const getAllMessages = catchAsyncError(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({ messages: "All messages", success: true, messages });
});
