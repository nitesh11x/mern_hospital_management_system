import express from "express";
import {
  isAdminAuth,
  isDoctorAuth,
  isPatientAuth,
} from "../middlewares/Auth.js";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/post", isPatientAuth, postAppointment);
router.get(
  "/all-appointments",
  isAdminAuth || isDoctorAuth,
  getAllAppointments
);
router.put("/edit/:id", isAdminAuth, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuth, deleteAppointment);

export default router;
