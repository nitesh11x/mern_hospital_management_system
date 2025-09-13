import { Router } from "express";
import {
  isAdminAuth,
  isDoctorAuth,
  isPatientAuth,
} from "../middlewares/Auth.js";
import {
  adminLogin,
  adminRegister,
  deleteAdminById,
  deleteDoctorById,
  doctorLogin,
  doctorRegister,
  editAdminById,
  editDoctorById,
  getAdmin,
  getAdminById,
  getDoctor,
  getDoctorById,
  logoutAdmin,
  logoutDoctor,
} from "../controllers/userController.js";

const router = Router();
router.post("/admin/register",  adminRegister);
router.post("/admin/login", adminLogin);
router.put("/admin/edit/:id", isAdminAuth, editAdminById);
router.delete("/admin/delete/:id", isAdminAuth, deleteAdminById);
router.get("/admin/logout", isAdminAuth, logoutAdmin);
router.get("/admin/all", isAdminAuth, getAdmin);
router.get("/admin/:id", isAdminAuth, getAdminById);

router.post("/doctor/register", isAdminAuth, doctorRegister);
router.post("/doctor/login", doctorLogin);
router.put("/doctor/edit/:id", isAdminAuth, editDoctorById);
router.delete("/doctor/delete/:id", isAdminAuth, deleteDoctorById);
router.get("/doctor/logout", isDoctorAuth, logoutDoctor);
router.get("/doctor/all",  getDoctor);
router.get("/doctor/:id",  getDoctorById);

export default router;
