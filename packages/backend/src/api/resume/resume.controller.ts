import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { getOrCreateResume } from './resume.service';

export const getMyResumeHandler = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(403).json({ message: 'User not authenticated' });
  }

  try {
    const resume = await getOrCreateResume(userId);
    return res.status(200).json(resume);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};