import express from 'express';
import { auth } from '../../middleware/auth';
import { getMyResumeHandler, updateMyResumeHandler, downloadMyResumeHandler } from './resume.controller';

const router = express.Router();

//protect the route
router.use(auth);

router.get('/my-resume', getMyResumeHandler)
router.put('/my-resume', updateMyResumeHandler)
router.get('/my-resume/download', downloadMyResumeHandler)

export default router;