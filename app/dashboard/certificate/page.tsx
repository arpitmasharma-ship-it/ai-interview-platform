import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Award, Download, Trophy } from "lucide-react";

export default async function CertificatePage() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      interviews: true,
    },
  });

  if (!user) {
    return null;
  }

  const completedInterviews =
    user.interviews.filter(
      (i) => i.score !== null
    );

  const averageScore =
    completedInterviews.length > 0
      ? Math.round(
          completedInterviews.reduce(
            (acc, curr) =>
              acc + (curr.score || 0),
            0
          ) / completedInterviews.length
        )
      : 0;

  const eligible =
    completedInterviews.length >= 3 &&
    averageScore >= 70;

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-2 text-5xl font-bold">
          Achievement Certificate
        </h1>

        <p className="mb-10 text-slate-400">
          Showcase your interview preparation journey
        </p>

        {!eligible ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8">
            <h2 className="text-2xl font-bold text-red-400">
              Certificate Locked
            </h2>

            <p className="mt-4 text-slate-300">
              Complete at least 3 interviews and
              maintain 70% average score.
            </p>

            <div className="mt-6 space-y-2">
              <p>
                Interviews Completed:
                {" "}
                {completedInterviews.length}/3
              </p>

              <p>
                Average Score:
                {" "}
                {averageScore}% / 70%
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-12">

              <div className="text-center">

                <Award
                  className="mx-auto mb-6 text-yellow-400"
                  size={90}
                />

                <h2 className="text-5xl font-bold">
                  Certificate of Excellence
                </h2>

                <p className="mt-6 text-xl text-slate-300">
                  Presented To
                </p>

                <h3 className="mt-4 text-4xl font-bold text-blue-400">
                  {user.name || "Student"}
                </h3>

                <p className="mt-8 text-lg text-slate-300">
                  For Successfully Completing AI Mock
                  Interview Preparation Program
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-3">

                  <div className="rounded-2xl bg-slate-800 p-5">
                    <Trophy
                      className="mx-auto mb-3 text-yellow-400"
                      size={30}
                    />

                    <p className="text-slate-400">
                      Average Score
                    </p>

                    <h4 className="text-3xl font-bold">
                      {averageScore}%
                    </h4>
                  </div>

                  <div className="rounded-2xl bg-slate-800 p-5">
                    <p className="text-slate-400">
                      Interviews
                    </p>

                    <h4 className="text-3xl font-bold">
                      {completedInterviews.length}
                    </h4>
                  </div>

                  <div className="rounded-2xl bg-slate-800 p-5">
                    <p className="text-slate-400">
                      Level
                    </p>

                    <h4 className="text-3xl font-bold text-green-400">
                      Certified
                    </h4>
                  </div>

                </div>

                <button className="mt-10 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700 mx-auto">
                  <Download size={18} />
                  Download Certificate
                </button>

              </div>
            </div>
          </>
        )}

      </div>
    </main>
  );
}