import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AnalyticsPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
    include: {
      interviews: true,
      resumes: true,
    },
  });

  const interviews =
    user?.interviews ?? [];

  const resumes =
    user?.resumes ?? [];

  const totalInterviews =
    interviews.length;

  const totalResumes =
    resumes.length;

  const avgScore =
    totalInterviews > 0
      ? Math.round(
          interviews.reduce(
            (acc, item) =>
              acc + (item.score ?? 0),
            0
          ) / totalInterviews
        )
      : 0;

  const highestScore =
    interviews.length > 0
      ? Math.max(
          ...interviews.map(
            (i) => i.score ?? 0
          )
        )
      : 0;

  return (
    <main className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Track your career growth and
          interview performance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Interviews
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {totalInterviews}
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Average Score
          </p>

          <h2 className="mt-3 text-4xl font-bold text-blue-600">
            {avgScore}%
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Best Score
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-600">
            {highestScore}%
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Resumes
          </p>

          <h2 className="mt-3 text-4xl font-bold text-purple-600">
            {totalResumes}
          </h2>
        </div>

      </div>

      <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-slate-900">
        <h2 className="mb-6 text-2xl font-bold">
          Interview Performance
        </h2>

        <div className="space-y-4">

          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="space-y-2"
            >
              <div className="flex justify-between">
                <span>
                  {interview.title}
                </span>

                <span>
                  {interview.score ?? 0}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                  style={{
                    width: `${
                      interview.score ?? 0
                    }%`,
                  }}
                />

              </div>
            </div>
          ))}

          {interviews.length === 0 && (
            <p className="text-slate-500">
              No interview data yet.
            </p>
          )}

        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-slate-900">

          <h2 className="mb-4 text-2xl font-bold">
            Career Insights
          </h2>

          <ul className="space-y-3">
            <li>
              🚀 Average Score:
              {" "}
              {avgScore}%
            </li>

            <li>
              🎯 Best Performance:
              {" "}
              {highestScore}%
            </li>

            <li>
              📄 Resume Uploads:
              {" "}
              {totalResumes}
            </li>

            <li>
              🎤 Interviews Taken:
              {" "}
              {totalInterviews}
            </li>
          </ul>

        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-slate-900">

          <h2 className="mb-4 text-2xl font-bold">
            AI Recommendation
          </h2>

          {avgScore >= 80 ? (
            <p className="text-green-600">
              Strong placement readiness.
              Continue advanced interview
              practice.
            </p>
          ) : avgScore >= 60 ? (
            <p className="text-yellow-600">
              Good progress. Focus on
              technical depth and system
              design.
            </p>
          ) : (
            <p className="text-red-600">
              Improve fundamentals and
              complete more mock interviews.
            </p>
          )}

        </div>

      </div>

    </main>
  );
}