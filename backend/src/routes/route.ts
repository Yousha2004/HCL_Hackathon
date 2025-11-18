import { Router } from 'express';
import { fn } from '../controllers/controller';

const router = Router();

router.get('/', fn);


// Export the router to be used in the main application file
export default router;