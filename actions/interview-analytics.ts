"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getInterviewAnalytics() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  if (!user) {
    return null;
  }

  const interviews =
    await prisma.mockInterviewResult.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

  const totalInterviews =
    interviews.length;

  if (totalInterviews === 0) {
    return {
      totalInterviews: 0,
      averageScore: 0,
      bestScore: 0,
      latestScore: 0,
      improvement: 0,
      technicalAverage: 0,
      communicationAverage: 0,
      confidenceAverage: 0,
      readinessScore: 0,
      interviews: [],
    };
  }

  const averageScore =
    Math.round(
      interviews.reduce(
        (sum, item) =>
          sum + item.score,
        0
      ) / totalInterviews
    );

  const bestScore =
    Math.max(
      ...interviews.map(
        (item) => item.score
      )
    );

  const latestScore =
    interviews[
      interviews.length - 1
    ].score;

  const firstScore =
    interviews[0].score;

  const improvement =
    latestScore - firstScore;

  const technicalAverage =
    Math.round(
      interviews.reduce(
        (sum, item) =>
          sum +
          item.technical,
        0
      ) / totalInterviews
    );

  const communicationAverage =
    Math.round(
      interviews.reduce(
        (sum, item) =>
          sum +
          item.communication,
        0
      ) / totalInterviews
    );

  const confidenceAverage =
    Math.round(
      interviews.reduce(
        (sum, item) =>
          sum +
          item.confidence,
        0
      ) / totalInterviews
    );

  const readinessScore =
    Math.round(
      (
        averageScore +
        technicalAverage +
        communicationAverage +
        confidenceAverage
      ) / 4
    );

  return {
    totalInterviews,
    averageScore,
    bestScore,
    latestScore,
    improvement,
    technicalAverage,
    communicationAverage,
    confidenceAverage,
    readinessScore,
    interviews,
  };
}