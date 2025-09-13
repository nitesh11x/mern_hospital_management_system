import mongoose from "mongoose";
import validator from "validator";

const feedBackSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minLength: [20, "Message must contain at least 20 characters"],
    },
  },
  { timestamps: true }
);

export const FeedBack = mongoose.model("FeedBack", feedBackSchema);
