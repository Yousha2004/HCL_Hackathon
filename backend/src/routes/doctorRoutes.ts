import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { rbacMiddleware } from "../middlewares/rbacMiddleware.js";
import {
  getDoctorDashboard,
  getPatientDetails,
  createPatientGoal,
  createPreventiveReminder,
} from "../controllers/doctorController.js";

const router = Router();

router.use(authMiddleware);

router.use(rbacMiddleware(["provider"]));



router.get("/dashboard", getDoctorDashboard);


router.get("/patients/:patientId", getPatientDetails);


router.post("/goals", createPatientGoal);


router.post("/reminders", createPreventiveReminder);

export default router;