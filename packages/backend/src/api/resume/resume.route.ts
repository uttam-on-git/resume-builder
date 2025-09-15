import express from 'express';
import { auth } from '../../middleware/auth';
import { getMyResumeHandler } from './resume.controller';

const router = express.Router();

//protect the route
router.use(auth);

router.get('/my-resume', getMyResumeHandler);

export default router;