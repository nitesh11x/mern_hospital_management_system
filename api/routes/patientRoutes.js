import { Router } from "express";
import {
  deletePaitent,
  editPatient,
  getPatient,
  getPatientById,
  loginPatient,
  logoutPatient,
  registerPatient,
} from "../controllers/patientController.js";
import { isAdminAuth, isPatientAuth } from "../middlewares/Auth.js";
const router = Router();

router.post("/register", registerPatient);
router.post("/login", loginPatient);
router.delete("/delete/:id", isPatientAuth, deletePaitent);
router.put("/edit/:id", isPatientAuth, editPatient);
router.get("/logout", isPatientAuth, logoutPatient);
router.get("/all", isAdminAuth, getPatient);
router.get("/:id", getPatientById);

export default router;
