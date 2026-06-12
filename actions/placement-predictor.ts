"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getPlacementPrediction() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
     resumes: {
  include: {
    resumeAnalysis: true,
  },
},
      interviews: true,
      CodingSubmission: true,
      MockInterviewResult: true,
      achievements: true,
    },
  });

  if (!user) return null;

  const resumeScore =
user.resumes[0]?.resumeAnalysis?.score || 0     

  const interviewScore =
    user.interviews.length > 0
      ? Math.round(
          user.interviews.reduce(
            (sum, item) =>
              sum + (item.score || 0),
            0
          ) / user.interviews.length
        )
      : 0;

  const codingScore = Math.min(
    user.CodingSubmission.length * 10,
    100
  );

  const mockScore =
    user.MockInterviewResult.length > 0
      ? Math.round(
          user.MockInterviewResult.reduce(
            (sum, item) =>
              sum + item.score,
            0
          ) /
            user.MockInterviewResult.length
        )
      : 0;

  const achievementScore =
    user.achievements.filter(
      (a) => a.earned
    ).length * 10;

  const placementProbability =
    Math.round(
      (
        resumeScore +
        interviewScore +
        codingScore +
        mockScore +
        achievementScore
      ) / 5
    );

  return {
    placementProbability,

    dreamCompanies:
      placementProbability >= 85,

    productCompanies:
      placementProbability >= 70,

    serviceCompanies:
      placementProbability >= 50,

    resumeScore,
    interviewScore,
    codingScore,
    mockScore,
    achievementScore,
  };
}