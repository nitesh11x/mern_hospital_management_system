import express from "express";
const app = express();
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import { connectDB } from "./utils/db.js";
import { errorMiddleware } from "./middlewares/ErrorMiddleware.js";
config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

import patientRouter from "./routes/patientRoutes.js";
app.use("/api/patient", patientRouter);
import adminDoctorRouter from "./routes/userRoutes.js";
app.use("/api/user", adminDoctorRouter);
import appointmentRouter from "./routes/appointmentRoutes.js";
app.use("/api/appointment", appointmentRouter);
import messageRouter from "./routes/messageRoutes.js";
app.use("/api/message", messageRouter);
import feedBackRouter from "./routes/feedBackRoutes.js";
app.use("/api/feedBack", feedBackRouter);

app.get("/", (req, res) =>
  res.json("Welcome To newCare Hospital Management Backend System")
);

connectDB();

app.use(errorMiddleware);

const port = process.env.PORT;
app.listen(port, () => console.log(`server is live on Port ${port}`));
