"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { reviewCode } from "@/lib/ai/code-review";
import { executeCode }
from "@/lib/local-executor";

export async function getProblems() {
  return prisma.codingProblem.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProblem(
  id: string
) {
  return prisma.codingProblem.findUnique({
    where: {
      id,
    },
  });
}

export async function submitSolution(
  problemId: string,
  code: string
) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  if (!user) {
    throw new Error("User not found");
  }

  const problem =
    await prisma.codingProblem.findUnique({
      where: {
        id: problemId,
      },
    });

  if (!problem) {
    throw new Error(
      "Problem not found"
    );
  }

  // Execute code using Judge0
  const executionResult =
    await executeCode(code);

  console.log(
    "======================="
  );

  console.log(
    "JUDGE0 RESULT:"
  );

  console.log(
    JSON.stringify(
      executionResult,
      null,
      2
    )
  );

  console.log(
    "======================="
  );


  const output =
  executionResult?.output ||
  "No Output";

  // AI / Self Review
  const review =
    await reviewCode(
      problem.description,
      code
    );

  const submission =
    await prisma.codingSubmission.create({
      data: {
        code,

        score:
          review.score,

        feedback:
          review.feedback,

        userId:
          user.id,

        problemId,
      },
    });

  return {
    success: true,

    score:
      review.score,

    complexity:
      review.complexity,

    feedback:
      review.feedback,

    strengths:
      review.strengths,

    weaknesses:
      review.weaknesses,

    output,

    submissionId:
      submission.id,
  };
}

export async function getSubmissions(
  problemId: string
) {
  const session = await auth();

  if (!session?.user?.email) {
    return [];
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email:
          session.user.email,
      },
    });

  if (!user) {
    return [];
  }

  return prisma.codingSubmission.findMany({
    where: {
      problemId,
      userId:
        user.id,
    },

    orderBy: {
      createdAt:
        "desc",
    },
  });
}