"use server";

import { prisma } from "@/lib/prisma";

export async function getCandidates() {
return prisma.user.findMany({
  include: {
    PlacementReadiness: true,
    resumes: true,
    interviews: true,
    CodingSubmission: true,
  },
});
}