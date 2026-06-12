"use server";

import { prisma } from "@/lib/prisma";

export async function getCompanies() {
  return prisma.campusCompany.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCompanyById(
  id: string
) {
  return prisma.campusCompany.findUnique({
    where: {
      id,
    },
  });
}