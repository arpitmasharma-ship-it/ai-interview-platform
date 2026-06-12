"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function calculatePlacementReadiness() {
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
      CareerRoadmap: true,
    },
  });

  if (!user) return null;

  // Resume Score
  const resumeScore =
    user.resumes.length > 0
      ? Math.round(
          user.resumes.reduce(
            (sum, resume) =>
              sum +
              (resume.resumeAnalysis?.score || 0),
            0
          ) / user.resumes.length
        )
      : 0;

  // Interview Score
  const interviewScore =
    user.interviews.length > 0
      ? Math.round(
          user.interviews.reduce(
            (sum, interview) =>
              sum + (interview.score || 0),
            0
          ) / user.interviews.length
        )
      : 0;

  // Coding Score
  const codingScore =
    user.CodingSubmission.length > 0
      ? Math.round(
          user.CodingSubmission.reduce(
            (sum, submission) =>
              sum + submission.score,
            0
          ) / user.CodingSubmission.length
        )
      : 0;

  // Roadmap Score
  const roadmapScore =
    user.CareerRoadmap.length > 0 ? 100 : 0;

  // Final Placement Score
  const finalScore = Math.round(
    resumeScore * 0.4 +
      interviewScore * 0.3 +
      codingScore * 0.2 +
      roadmapScore * 0.1
  );

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];

  if (resumeScore >= 80)
    strengths.push("Strong Resume");
  else {
    weaknesses.push("Resume Quality");
    recommendations.push(
      "Improve resume and ATS score"
    );
  }

  if (interviewScore >= 80)
    strengths.push("Interview Skills");
  else {
    weaknesses.push("Interview Performance");
    recommendations.push(
      "Practice more mock interviews"
    );
  }

  if (codingScore >= 70)
    strengths.push("Coding Skills");
  else {
    weaknesses.push("Coding Practice");
    recommendations.push(
      "Solve more coding problems"
    );
  }

  if (roadmapScore === 100)
    strengths.push("Career Planning");
  else {
    recommendations.push(
      "Generate a career roadmap"
    );
  }

  await prisma.placementReadiness.upsert({
    where: {
      userId: user.id,
    },
    update: {
      score: finalScore,
      resumeScore,
      interviewScore,
      codingScore,
      roadmapScore,
      strengths,
      weaknesses,
      recommendations,
    },
    create: {
      userId: user.id,
      score: finalScore,
      resumeScore,
      interviewScore,
      codingScore,
      roadmapScore,
      strengths,
      weaknesses,
      recommendations,
    },
  });

  return {
    score: finalScore,
    resumeScore,
    interviewScore,
    codingScore,
    roadmapScore,
    strengths,
    weaknesses,
    recommendations,
  };
}