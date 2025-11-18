import { Router } from 'express';
import { getHealthTip } from '../controllers/publicController';

const router = Router();

/**
 * @route   GET /api/public/tips
 * @desc    Get a random health tip
 * @access  Public
 */
router.get('/tips', getHealthTip);


export default router;