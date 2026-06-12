"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { InterviewType } from "@prisma/client";
import { interviewQuestions } from "@/lib/interview-questions";

export async function createInterview(
  title: string,
  role: string,
  type: InterviewType
) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

 const user = await prisma.user.findUnique({
  where: {
    email: session?.user?.email || "",
  },
});

if (!user) {
  return {
    success: false,
    error: "Please login again",
  };
}

  let selectedQuestions = interviewQuestions.hr;

  if (role.toLowerCase().includes("frontend")) {
    selectedQuestions = interviewQuestions.frontend;
  } else if (role.toLowerCase().includes("backend")) {
    selectedQuestions = interviewQuestions.backend;
  } else if (role.toLowerCase().includes("full")) {
    selectedQuestions = interviewQuestions.fullstack;
  }



  console.log(
  "Creating Interview For:",
  user.email
);



 const interview =
  await prisma.interview.create({
    data: {
      title,
      role,
      type,
      userId: user.id,

      questions: {
  create: selectedQuestions.map((q) => ({
    question: q.question,
  })),
},
    },
  });

  return {
  success: true,
  interviewId: interview.id,
};

console.log(
  "Interview Created:",
  interview.id
);
}



export async function getUserInterviews() {
  const session = await auth();

  if (!session?.user?.email) {
    return [];
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return [];
  }

  return await prisma.interview.findMany({
    where: {
      userId: user.id,
    },
    include: {
      questions: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getInterviewById(
  interviewId: string
) {
  return await prisma.interview.findUnique({
    where: {
      id: interviewId,
    },
    include: {
      questions: true,
    },
  });
}

export async function saveAnswer(
  questionId: string,
  answer: string
) {
  await prisma.interviewQuestion.update({
    where: {
      id: questionId,
    },
    data: {
      answer,
    },
  });

  return {
    success: true,
  };
}

export async function evaluateInterview(
  interviewId: string
) {
  const interview =
    await prisma.interview.findUnique({
      where: {
        id: interviewId,
      },
      include: {
        questions: true,
      },
    });

  if (!interview) {
    throw new Error("Interview not found");
  }

  let totalScore = 0;

 for (const question of interview.questions) {
  if (!question.answer) {
    continue;
  }

  const answer =
    question.answer.toLowerCase();

  let score = 0;

  if (answer.length > 200) {
    score = 95;
  } else if (answer.length > 120) {
    score = 80;
  } else if (answer.length > 60) {
    score = 65;
  } else if (answer.length > 20) {
    score = 40;
  } else {
    score = 15;
  }

  totalScore += score;
}

  const finalScore =
    interview.questions.length > 0
      ? Math.round(
          totalScore /
            interview.questions.length
        )
      : 0;

  await prisma.interview.update({
    where: {
      id: interviewId,
    },
    data: {
      score: finalScore,
      feedback: `Overall Interview Score: ${finalScore}%`,
    },
  });

  return finalScore;
}