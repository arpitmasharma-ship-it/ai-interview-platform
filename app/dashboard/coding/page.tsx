import Link from "next/link";

import {
  getProblems,
} from "@/actions/coding";

import {
  getCodingAnalytics,
} from "@/actions/coding-analytics";

export default async function CodingPage() {
  const problems =
    await getProblems();

  const analytics =
    await getCodingAnalytics();

  return (
    <main className="p-10">
      <h1 className="mb-8 text-4xl font-bold">
        Coding Practice
      </h1>

      {analytics && (
        <div
          className="
            mb-10
            grid
            grid-cols-1
            gap-4
            md:grid-cols-4
          "
        >
          <div
            className="
              rounded-2xl
              border
              p-6
            "
          >
            <h3 className="text-sm text-slate-500">
              Problems Solved
            </h3>

            <p className="text-3xl font-bold">
              {analytics.solvedProblems}
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              p-6
            "
          >
            <h3 className="text-sm text-slate-500">
              Total Submissions
            </h3>

            <p className="text-3xl font-bold">
              {analytics.totalSubmissions}
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              p-6
            "
          >
            <h3 className="text-sm text-slate-500">
              Average Score
            </h3>

            <p className="text-3xl font-bold">
              {analytics.averageScore}
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              p-6
            "
          >
            <h3 className="text-sm text-slate-500">
              Best Score
            </h3>

            <p className="text-3xl font-bold">
              {analytics.bestScore}
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-5">
        {problems.map(
          (problem) => (
            <Link
              key={problem.id}
              href={`/dashboard/coding/${problem.id}`}
              className="
                rounded-2xl
                border
                p-6
              "
            >
              <h2 className="text-xl font-bold">
                {problem.title}
              </h2>

              <p>
                {problem.difficulty}
              </p>
            </Link>
          )
        )}
      </div>
    </main>
  );
}