import { z } from 'zod';

export const experienceSchema = z.object({
  id: z.string().optional(),
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().optional(),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export const educationSchema = z.object({
  id: z.string().optional(),
  school: z.string().min(1, 'School is required'),
  degree: z.string().min(1, 'Degree is required'),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().optional(),
});

export const skillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Skill cannot be empty'),
});

export const resumeSchema = z.object({
  title: z.string().min(1, 'Resume title is required'),
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  linkedIn: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  summary: z.string().optional(),
  experiences: z.array(experienceSchema),
  educations: z.array(educationSchema),
  skills: z.array(skillSchema),
});

export type ResumeFormValues = z.infer<typeof resumeSchema>;