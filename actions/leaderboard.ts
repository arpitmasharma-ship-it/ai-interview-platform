"use server";

import { prisma } from "@/lib/prisma";

export async function getLeaderboard() {
  const users =
    await prisma.user.findMany({
      include: {
        CodingSubmission: true,
      },
    });

  const leaderboard =
    users.map((user) => {
      const submissions =
        user.CodingSubmission;

      const solved =
        new Set(
          submissions.map(
            (s) => s.problemId
          )
        ).size;

      const avgScore =
        submissions.length > 0
          ? Math.round(
              submissions.reduce(
                (sum, s) =>
                  sum + s.score,
                0
              ) / submissions.length
            )
          : 0;

      return {
        name:
          user.name ??
          "Anonymous",

        solved,

        avgScore,
      };
    });

  return leaderboard.sort(
    (a, b) =>
      b.solved - a.solved
  );
}