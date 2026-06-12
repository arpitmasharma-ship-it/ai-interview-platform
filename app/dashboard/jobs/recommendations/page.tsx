// app/dashboard/jobs/recommendations/page.tsx

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function JobRecommendationsPage() {
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

  const avgScore =
    user?.interviews.length
      ? Math.round(
          user.interviews.reduce(
            (acc, curr) =>
              acc + (curr.score || 0),
            0
          ) /
            user.interviews.length
        )
      : 0;

  const jobs =
    await prisma.jobRecommendation.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  const recommendations = jobs
    .map((job) => {
      const matchedSkills = job.skills.filter(
        (skill) =>
          skills.some(
            (userSkill) =>
              userSkill.toLowerCase() ===
              skill.toLowerCase()
          )
      );

      const missingSkills = job.skills.filter(
        (skill) =>
          !skills.some(
            (userSkill) =>
              userSkill.toLowerCase() ===
              skill.toLowerCase()
          )
      );

      const score =
        job.skills.length > 0
          ? Math.round(
              (matchedSkills.length /
                job.skills.length) *
                100
            )
          : 0;

      let level = "Beginner 🌱";

      if (score >= 80) {
        level = "Job Ready 🚀";
      } else if (score >= 60) {
        level = "Growing 📈";
      } else if (score >= 40) {
        level = "Learning 🌱";
      }

      return {
        ...job,
        score,
        matchedSkills,
        missingSkills,
        level,
      };
    })
    .sort((a, b) => b.score - a.score);

  return (
    <main className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-bold">
          AI Job Recommendations
        </h1>

        <p className="mt-2 text-slate-500">
          Personalized opportunities based
          on your resumes, skills and
          interview performance.
        </p>
      </div>

      {/* PROFILE CARD */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
        <h2 className="text-2xl font-bold">
          Your Profile
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-slate-500">
              Average Interview Score
            </p>

            <h3 className="mt-2 text-5xl font-bold text-blue-600">
              {avgScore}%
            </h3>
          </div>

          <div>
            <p className="text-slate-500">
              Skills Found
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-slate-400">
                  No skills detected
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* JOBS */}

      <div className="space-y-6">
        <h2 className="text-3xl font-bold">
          Recommended Jobs
        </h2>

        {recommendations.length === 0 ? (
          <div className="rounded-3xl border bg-white p-8 text-center shadow-sm dark:bg-slate-900">
            <p className="text-slate-500">
              No recommendations found.
            </p>
          </div>
        ) : (
          recommendations.map((job) => (
            <div
              key={job.id}
              className="rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-xl dark:bg-slate-900"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-2xl font-bold">
                    {job.title}
                  </h3>

                  <p className="mt-1 text-slate-500">
                    {job.company}
                  </p>

                  <p className="text-slate-500">
                    {job.location}
                  </p>

                  {job.salary && (
                    <p className="mt-2 font-semibold text-green-600">
                      {job.salary}
                    </p>
                  )}
                </div>

                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600">
                    {job.score}%
                  </div>

                  <p className="text-sm text-slate-500">
                    Match Score
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-slate-600 dark:text-slate-300">
                {job.description}
              </p>

              {/* AI ANALYSIS */}

              <div className="mt-6 rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">
                <h4 className="font-bold">
                  AI Analysis
                </h4>

                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="font-semibold text-green-600">
                      Matching Skills
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.matchedSkills.length >
                      0 ? (
                        job.matchedSkills.map(
                          (skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-green-100 px-3 py-1 text-sm"
                            >
                              {skill}
                            </span>
                          )
                        )
                      ) : (
                        <p className="text-sm text-slate-500">
                          No matching skills
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-red-600">
                      Missing Skills
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.missingSkills.length >
                      0 ? (
                        job.missingSkills.map(
                          (skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-red-100 px-3 py-1 text-sm"
                            >
                              {skill}
                            </span>
                          )
                        )
                      ) : (
                        <p className="text-sm text-slate-500">
                          None
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="rounded-xl bg-blue-600 px-4 py-2 text-white">
                    {job.level}
                  </span>
                </div>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                  style={{
                    width: `${job.score}%`,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}