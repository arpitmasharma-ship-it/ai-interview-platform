import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CareerGapPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
    include: {
      resumes: true,
      interviews: true,
    },
  });

  const skills =
    user?.resumes.flatMap(
      (resume) => resume.skills
    ) || [];

  const targetSkills = [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "Docker",
    "AWS",
    "System Design",
    "DSA",
  ];

  const matchedSkills =
    targetSkills.filter((skill) =>
      skills.some(
        (userSkill) =>
          userSkill.toLowerCase() ===
          skill.toLowerCase()
      )
    );

  const missingSkills =
    targetSkills.filter(
      (skill) =>
        !skills.some(
          (userSkill) =>
            userSkill.toLowerCase() ===
            skill.toLowerCase()
        )
    );

  const readinessScore =
    Math.round(
      (matchedSkills.length /
        targetSkills.length) *
        100
    );

  return (
    <main className="space-y-8 p-8">

      <div>
        <h1 className="text-4xl font-bold">
          Career Gap Analysis
        </h1>

        <p className="text-slate-500 mt-2">
          Discover what is stopping you from
          getting your dream job.
        </p>
      </div>

      {/* Score */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-xl font-semibold">
          Career Readiness Score
        </h2>

        <div className="mt-4 text-6xl font-bold text-blue-600">
          {readinessScore}%
        </div>

      </div>

      {/* Existing Skills */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-2xl font-bold">
          Your Strengths
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">

          {matchedSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-green-100 px-4 py-2 text-green-700"
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

      {/* Missing Skills */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-2xl font-bold">
          Skills You Need
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">

          {missingSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-red-100 px-4 py-2 text-red-700"
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

      {/* AI Roadmap */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-2xl font-bold">
          Recommended Learning Roadmap
        </h2>

        <ol className="mt-6 space-y-4 list-decimal list-inside">

          {missingSkills.map((skill) => (
            <li key={skill}>
              Learn {skill}
            </li>
          ))}

        </ol>

      </div>

    </main>
  );
}