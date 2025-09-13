import express from "express";
import { isAdminAuth } from "../middlewares/Auth.js";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();
router.post("/send", sendMessage);
router.get("/getall", isAdminAuth, getAllMessages);

export default router;
