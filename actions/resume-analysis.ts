"use server";

import { prisma } from "@/lib/prisma";
import { extractSkills } from "@/lib/skill-extractor";

export async function analyzeResume(
  resumeId: string
) {
  const resume =
    await prisma.resume.findUnique({
      where: {
        id: resumeId,
      },
    });

  if (!resume) {
    throw new Error(
      "Resume not found"
    );
  }

  const text =
    resume.extractedText?.toLowerCase() ||
    "";

  // Extract skills from resume
  const extractedSkills =
    extractSkills(text);

  console.log(
    "EXTRACTED TEXT:",
    text
  );

  let score = 0;

  const strengths: string[] = [];
  const suggestions: string[] = [];

  const skillPoints = {
    react: 8,
    "next.js": 8,
    javascript: 7,
    typescript: 8,
    "node.js": 8,
    express: 5,
    mongodb: 6,
    postgresql: 6,
    prisma: 6,
    docker: 8,
    aws: 10,
    git: 4,
    github: 4,
    tailwind: 5,
    redux: 5,
    mysql: 5,
  };

  let skillCount = 0;

  Object.entries(skillPoints).forEach(
    ([skill, points]) => {
      if (text.includes(skill)) {
        score += points;
        skillCount++;
      }
    }
  );

  if (skillCount >= 8) {
    strengths.push(
      "Strong technical skill set detected."
    );
  }

  if (
    text.includes("project") ||
    text.includes("projects")
  ) {
    score += 10;
    strengths.push(
      "Projects section detected."
    );
  } else {
    suggestions.push(
      "Add a Projects section."
    );
  }

  if (
    text.includes("internship") ||
    text.includes("experience") ||
    text.includes("work experience")
  ) {
    score += 15;
    strengths.push(
      "Experience section detected."
    );
  } else {
    suggestions.push(
      "Add internships or work experience."
    );
  }

  if (
    text.includes("achievement") ||
    text.includes("award") ||
    text.includes("certification") ||
    text.includes("certificate")
  ) {
    score += 10;
    strengths.push(
      "Achievements or certifications found."
    );
  } else {
    suggestions.push(
      "Add certifications or achievements."
    );
  }

  if (
    text.includes("github.com")
  ) {
    score += 5;
    strengths.push(
      "GitHub profile found."
    );
  } else {
    suggestions.push(
      "Add GitHub profile link."
    );
  }

  if (
    text.includes("linkedin.com")
  ) {
    score += 5;
    strengths.push(
      "LinkedIn profile found."
    );
  } else {
    suggestions.push(
      "Add LinkedIn profile."
    );
  }

  if (
    text.includes("%") ||
    text.includes("improved") ||
    text.includes("increased") ||
    text.includes("reduced") ||
    text.includes("optimized")
  ) {
    score += 10;
    strengths.push(
      "Impact-based achievements detected."
    );
  } else {
    suggestions.push(
      "Add measurable achievements with numbers."
    );
  }

  score = Math.min(
    Math.max(score, 0),
    100
  );

  let feedback = "";

  feedback += `ATS Score: ${score}/100\n\n`;

  if (strengths.length > 0) {
    feedback += "Strengths:\n\n";

    strengths.forEach((item) => {
      feedback += `• ${item}\n`;
    });

    feedback += "\n";
  }

  feedback += "Suggestions:\n\n";

  suggestions.forEach((item) => {
    feedback += `• ${item}\n`;
  });

await prisma.resume.update({
  where: {
    id: resumeId,
  },
  data: {
    atsScore: score,
    feedback,
  },
});

  return {
    score,
    feedback,
    skills: extractedSkills,
  };
}