import { toNodeHandler } from 'better-auth/node';
import { Router } from 'express';
import { auth } from '../lib/auth';
import publicRoutes from "./publicRoutes";
import doctorRoute from "./doctorRoutes";
import patientRoute from "./patientRoutes";

const router = Router();

// Better Auth Handler
router.all('/api/auth/*', toNodeHandler(auth));

// router.use('/api/v1', publicRoutes);

router.use('/api/public', publicRoutes);

router.use('/api/doctor',doctorRoute);

router.use('/api/patient',patientRoute);

export default router