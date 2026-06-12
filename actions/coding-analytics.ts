"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getCodingAnalytics() {
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

  const submissions =
    await prisma.codingSubmission.findMany({
      where: {
        userId: user.id,
      },
    });

  const totalSubmissions =
    submissions.length;

  const averageScore =
    totalSubmissions > 0
      ? Math.round(
          submissions.reduce(
            (sum, item) =>
              sum + item.score,
            0
          ) / totalSubmissions
        )
      : 0;

  const bestScore =
    totalSubmissions > 0
      ? Math.max(
          ...submissions.map(
            (item) => item.score
          )
        )
      : 0;

  const solvedProblems =
    new Set(
      submissions.map(
        (item) => item.problemId
      )
    ).size;

  return {
    solvedProblems,
    totalSubmissions,
    averageScore,
    bestScore,
  };
}