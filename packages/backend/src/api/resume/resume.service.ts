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

export const updateResume = async (userId: string, resumeData: any) => {
  const { title, fullName, email, phoneNumber, address, linkedIn, website, summary, experiences, educations, skills } = resumeData;

  // convert date strings to Date objects, handling empty strings
  const toDateOrNull = (dateStr: string | undefined) => dateStr ? new Date(dateStr) : null;

  const updatedResume = await db.resume.update({
    where: { userId },
    data: {
      title, fullName, email, phoneNumber, address, linkedIn, website, summary,
      experiences: {
        deleteMany: {}, // Clear existing entries
        create: experiences?.map((exp: any) => ({ // Re-create with full data
          jobTitle: exp.jobTitle,
          company: exp.company,
          location: exp.location,
          startDate: toDateOrNull(exp.startDate),
          endDate: toDateOrNull(exp.endDate),
          description: exp.description,
        })) || [],
      },
      educations: {
        deleteMany: {},
        create: educations?.map((edu: any) => ({
          school: edu.school,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          startDate: toDateOrNull(edu.startDate),
          endDate: toDateOrNull(edu.endDate),
        })) || [],
      },
      skills: {
        deleteMany: {},
        create: skills?.map((skill: any) => ({
          name: skill.name,
        })) || [],
      },
    },
    include: { experiences: true, educations: true, skills: true },
  });

  return updatedResume;
};