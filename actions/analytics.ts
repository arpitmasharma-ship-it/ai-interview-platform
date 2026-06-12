"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getAnalytics() {
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

  const interviews = await prisma.interview.findMany({
    where: {
      userId: user.id,
    },
  });

  const totalInterviews = interviews.length;

  const scoredInterviews = interviews.filter(
    (interview) => interview.score !== null
  );

  const averageScore =
    scoredInterviews.length > 0
      ? Number(
          (
            scoredInterviews.reduce(
              (sum, interview) =>
                sum + (interview.score ?? 0),
              0
            ) / scoredInterviews.length
          ).toFixed(2)
        )
      : 0;

  const bestScore =
    scoredInterviews.length > 0
      ? Math.max(
          ...scoredInterviews.map(
            (interview) =>
              interview.score ?? 0
          )
        )
      : 0;

  return {
    totalInterviews,
    averageScore,
    bestScore,
  };
}