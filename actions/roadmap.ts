"use server";

import { requiredSkills }
from "@/lib/roadmap";

export async function generateRoadmap(
  skills: string[],
  role: string
) {
  let targetSkills =
    requiredSkills.fullstack;

  if (
    role.toLowerCase().includes(
      "frontend"
    )
  ) {
    targetSkills =
      requiredSkills.frontend;
  }

  if (
    role.toLowerCase().includes(
      "backend"
    )
  ) {
    targetSkills =
      requiredSkills.backend;
  }

  const missingSkills =
    targetSkills.filter(
      (skill) =>
        !skills.includes(skill)
    );

  return missingSkills.map(
    (skill, index) => ({
      week: index + 1,
      skill,
    })
  );
}