import { Resume } from "@prisma/client";
import db from "../../lib/db";

export const getOrCreateResume = async (userId: string) => {
  let resume = await db.resume.findUnique({
    where: { userId },
    include: {
      experiences: true,
      educations: true,
      skills: true,
    },
  });

  if (!resume) {
    resume = await db.resume.create({
      data: { userId },
      include: {
        experiences: true,
        educations: true,
        skills: true,
      },
    });
  }

  return resume;
};

export const updateResume = async (userId: string, resumeData: Partial<Resume>) => {
  const { title, experiences, educations, skills } = resumeData as any;

  const updatedResume = await db.resume.update({
    where: { userId },
    data: {
      title,
      experiences: {
        deleteMany: {},
        create: experiences?.map((exp: any) => ({
          company: exp.company,
  
        })),
      },
    },
    include: {
      experiences: true,
      educations: true,
      skills: true,
    },
  });

  return updatedResume;
};