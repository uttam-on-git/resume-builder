import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { getOrCreateResume } from './resume.service';
import { updateResume } from './resume.service';
import { generatePdfFromData } from './pdf.service';

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

export const updateMyResumeHandler = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(403).json({ message: 'Unauthorized' });

  try {
    const updatedResume = await updateResume(userId, req.body);
    return res.status(200).json(updatedResume);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating resume' });
  }
};

export const downloadMyResumeHandler = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(403).json({ message: 'Unauthorized' });

  try {
    const resumeData = await getOrCreateResume(userId);

    const pdfBuffer = await generatePdfFromData(resumeData);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');

    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return res.status(500).json({ message: 'Error generating PDF' });
  }
};