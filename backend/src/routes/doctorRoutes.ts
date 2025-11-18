import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { rbacMiddleware } from "../middlewares/rbacMiddleware";
import {
  getDoctorDashboard,
  getPatientDetails,
  createPatientGoal,
  createPreventiveReminder,
} from "../controllers/doctorController";

const router = Router();

router.use(rbacMiddleware(["provider"]));

router.use(authMiddleware);

router.get("/dashboard", getDoctorDashboard);


router.get("/patients/:patientId", getPatientDetails);


router.post("/goals", createPatientGoal);


router.post("/reminders", createPreventiveReminder);

export default router;