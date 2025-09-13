import mongoose from "mongoose";
import { config } from "dotenv";
config();
const uri = process.env.MONGODB;
export const connectDB = async () => {
  mongoose
    .connect(uri, { dbName: "NewCare_Hospital_Management_System" })
    .then(() => console.log(`DataBase Connnected SuccessFully`))
    .catch((err) => console.log("Error", err));
};
