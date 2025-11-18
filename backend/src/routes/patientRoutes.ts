import { Router } from "express";
import {
  getPatientDashboard,
  getPatientProfile,
  updatePatientProfile,
  logDailyEntry,
  completeReminder,
} from "../controllers/patientController.js";

import { rbacMiddleware } from "../middlewares/rbacMiddleware.js";

const router = Router();

router.use(rbacMiddleware(["patient"]));

router.get("/dashboard", getPatientDashboard);

router.get("/profile", getPatientProfile);

router.put("/profile", updatePatientProfile);

router.post("/log", logDailyEntry);

router.put("/reminders/:id/complete", completeReminder);

export default router;