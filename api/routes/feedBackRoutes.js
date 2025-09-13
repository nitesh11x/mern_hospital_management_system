import express from "express";
import { isAdminAuth, isPatientAuth } from "../middlewares/Auth.js";
import {
  sendFeedBack,
  getAllFeedBack,
  deleteFeedBackById,
} from "../controllers/feedBackController.js";

const router = express.Router();
router.post("/send", isPatientAuth, sendFeedBack);
router.get("/all",  getAllFeedBack);
router.delete("/delete/:id", isAdminAuth, deleteFeedBackById);
export default router;
