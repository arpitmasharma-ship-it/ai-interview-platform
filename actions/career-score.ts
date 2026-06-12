"use server";

import { prisma } from "@/lib/prisma";

export async function calculateCareerScore(
  userId: string
) {
  const resumes =
    await prisma.resume.findMany({
      where: {
        userId,
      },
    });

  const interviews =
    await prisma.interview.findMany({
      where: {
        userId,
      },
    });

  let score = 0;

  // Resume Score (40%)

  if (resumes.length > 0) {
    const avgResumeScore =
      resumes.reduce(
        (acc, item) =>
          acc + (item.atsScore ?? 0),
        0
      ) / resumes.length;

    score += avgResumeScore * 0.4;
  }

  // Interview Score (40%)

  if (interviews.length > 0) {
    const avgInterviewScore =
      interviews.reduce(
        (acc, item) =>
          acc + (item.score ?? 0),
        0
      ) / interviews.length;

    score += avgInterviewScore * 0.4;
  }

  // Activity Bonus

  score += Math.min(
    interviews.length * 2,
    10
  );

  score += Math.min(
    resumes.length * 5,
    10
  );

  return Math.round(score);
}