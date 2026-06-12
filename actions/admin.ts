"use server";

import { prisma } from "@/lib/prisma";

export async function getAdminStats() {
  const [
    users,
    resumes,
    interviews,
    codingSubmissions,
    mockInterviewResults,
    achievements,
    jobApplications,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.resume.count(),
    prisma.interview.count(),
    prisma.codingSubmission.count(),
    prisma.mockInterviewResult.count(),
    prisma.achievement.count(),
    prisma.jobApplication.count(),
  ]);

  const latestUsers = await prisma.user.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      resumes: true,
      interviews: true,
    },
  });

  return {
    users,
    resumes,
    interviews,
    codingSubmissions,
    mockInterviewResults,
    achievements,
    jobApplications,
    latestUsers,
  };
}

export async function getUsersForAdmin() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      resumes: true,
      interviews: true,
      PlacementReadiness: true,
    },
  });
}

export async function getPlatformActivity() {
  const [
    users,
    interviews,
    resumes,
    codingSubmissions,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.interview.count(),
    prisma.resume.count(),
    prisma.codingSubmission.count(),
  ]);

  return [
    {
      name: "Users",
      value: users,
    },
    {
      name: "Interviews",
      value: interviews,
    },
    {
      name: "Resumes",
      value: resumes,
    },
    {
      name: "Coding",
      value: codingSubmissions,
    },
  ];
}

export async function getUserGrowthData() {
  const users = await prisma.user.findMany({
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const monthlyMap = new Map<string, number>();

  users.forEach((user) => {
    const month = new Date(
      user.createdAt
    ).toLocaleString("en-US", {
      month: "short",
    });

    monthlyMap.set(
      month,
      (monthlyMap.get(month) || 0) + 1
    );
  });

  return Array.from(
    monthlyMap.entries()
  ).map(([month, users]) => ({
    month,
    users,
  }));
}