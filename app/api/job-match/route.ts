import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Tailwind",
  "Docker",
  "AWS",
  "Git",
  "Redux",
];

export async function POST(
  req: Request
) {
  try {

    const session =
      await auth();

    if (
      !session?.user?.email
    ) {
      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          email:
            session.user.email,
        },
        include: {
          resumes: true,
        },
      });

    if (
      !user ||
      user.resumes.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "No resume found",
        },
        {
          status: 400,
        }
      );
    }

    const body =
      await req.json();

    const {
      jobDescription,
    } = body;

    const latestResume =
      user.resumes[0];

    const resumeText =
      (
        latestResume.extractedText ||
        ""
      ).toLowerCase();

    const jd =
      jobDescription.toLowerCase();

    const matchedSkills =
      SKILLS.filter(
        (skill) =>
          resumeText.includes(
            skill.toLowerCase()
          ) &&
          jd.includes(
            skill.toLowerCase()
          )
      );

    const missingSkills =
      SKILLS.filter(
        (skill) =>
          jd.includes(
            skill.toLowerCase()
          ) &&
          !resumeText.includes(
            skill.toLowerCase()
          )
      );

    const matchScore =
      Math.min(
        100,
        Math.round(
          (matchedSkills.length /
            (matchedSkills.length +
              missingSkills.length ||
              1)) *
            100
        )
      );

    const suggestions =
      missingSkills.map(
        (skill) =>
          `Learn ${skill}`
      );

    await prisma.jobMatch.create(
      {
        data: {
          jobTitle:
            "Custom Job",
          jobDescription,
          matchScore,
          matchedSkills,
          missingSkills,
          suggestions,
          userId: user.id,
        },
      }
    );

    return NextResponse.json({
      matchScore,
      matchedSkills,
      missingSkills,
      suggestions,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed",
      },
      {
        status: 500,
      }
    );
  }
}