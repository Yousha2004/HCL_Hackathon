import { Router } from 'express';
import doctorRoute from "./doctorRoutes";
import patientRoute from "./patientRoutes";

const router = Router();

router.use('/doctor',doctorRoute);

router.use('/patient',patientRoute);

export default router