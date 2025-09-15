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