"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getMockInterviewAnalytics() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
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

  const averageScore =
    totalInterviews > 0
      ? Math.round(
          interviews.reduce(
            (sum, item) =>
              sum + item.score,
            0
          ) / totalInterviews
        )
      : 0;

  const averageTechnical =
    totalInterviews > 0
      ? Math.round(
          interviews.reduce(
            (sum, item) =>
              sum + item.technical,
            0
          ) / totalInterviews
        )
      : 0;

  const averageCommunication =
    totalInterviews > 0
      ? Math.round(
          interviews.reduce(
            (sum, item) =>
              sum + item.communication,
            0
          ) / totalInterviews
        )
      : 0;

  const averageConfidence =
    totalInterviews > 0
      ? Math.round(
          interviews.reduce(
            (sum, item) =>
              sum + item.confidence,
            0
          ) / totalInterviews
        )
      : 0;

  return {
    totalInterviews,
    averageScore,
    averageTechnical,
    averageCommunication,
    averageConfidence,
    interviews,
  };
}