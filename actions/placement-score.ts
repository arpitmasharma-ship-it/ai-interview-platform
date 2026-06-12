"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getPlacementScore() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      resumes: true,
      CodingSubmission: true,
      MockInterviewResult: true,
    },
  });

  if (!user) {
    return null;
  }

  // Resume Score

  const resumeScore =
    user.resumes.length > 0
      ? user.resumes.reduce(
          (sum, resume) =>
            sum + (resume.atsScore || 0),
          0
        ) / user.resumes.length
      : 0;

  // Coding Score

  const codingScore =
    user.CodingSubmission.length > 0
      ? user.CodingSubmission.reduce(
          (sum, sub) =>
            sum + sub.score,
          0
        ) /
        user.CodingSubmission.length
      : 0;

  // Interview Score

  const interviewScore =
    user.MockInterviewResult.length > 0
      ? user.MockInterviewResult.reduce(
          (sum, result) =>
            sum + result.score,
          0
        ) /
        user.MockInterviewResult.length
      : 0;

  // Final Score

  const placementScore = Math.round(
    resumeScore * 0.30 +
      codingScore * 0.40 +
      interviewScore * 0.30
  );

  return {
    placementScore,

    resumeScore:
      Math.round(resumeScore),

    codingScore:
      Math.round(codingScore),

    interviewScore:
      Math.round(interviewScore),
  };
}