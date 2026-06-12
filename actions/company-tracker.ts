"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getCompanyApplications() {
  const session = await auth();

  if (!session?.user?.email)
    return [];

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  if (!user)
    return [];

  return prisma.companyApplication.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      appliedAt: "desc",
    },
  });
}