"use server";

import { prisma } from "@/lib/prisma";

export async function evaluateAnswer(
  questionId: string
) {
  const question =
    await prisma.interviewQuestion.findUnique({
      where: {
        id: questionId,
      },
    });

  if (!question) {
    throw new Error("Question not found");
  }

  const answer =
    question.answer || "";

  let score = 0;

  if (answer.length > 50) score += 40;
  if (answer.length > 100) score += 30;
  if (answer.length > 200) score += 30;

  score = Math.min(score, 100);

  let feedback = "";

  if (score >= 80) {
    feedback =
      "Excellent answer with good detail.";
  } else if (score >= 50) {
    feedback =
      "Good answer. Add more examples.";
  } else {
    feedback =
      "Answer is too short.";
  }

  await prisma.interviewQuestion.update({
    where: {
      id: questionId,
    },
    data: {
      score,
      feedback,
    },
  });

  return {
    score,
    feedback,
  };
}