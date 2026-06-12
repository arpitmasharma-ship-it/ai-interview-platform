import { getInterviewById } from "@/actions/interview";
import Link from "next/link";
import { Trophy, CheckCircle, AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function InterviewResultPage({
  params,
}: Props) {
  const { id } = await params;

  const interview = await getInterviewById(id);

  if (!interview) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-red-500">
          Interview Not Found
        </h1>
      </div>
    );
  }

  const score = Number(interview.score || 0);

  const performance =
    score >= 80
      ? "Excellent"
      : score >= 60
        ? "Good"
        : score >= 40
          ? "Average"
          : "Needs Improvement";

  const performanceColor =
    score >= 80
      ? "text-green-500"
      : score >= 60
        ? "text-blue-500"
        : score >= 40
          ? "text-yellow-500"
          : "text-red-500";

  return (
    <main className="mx-auto max-w-7xl p-8">
      {/* Header */}
      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
        <div className="flex items-center gap-4">
          <Trophy className="h-10 w-10 text-yellow-500" />

          <div>
            <h1 className="text-4xl font-bold text-white">
              Interview Results
            </h1>

            <p className="mt-2 text-slate-300">
              Performance Report
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center">
            <p className="text-slate-400">
              Final Score
            </p>

            <h2 className="mt-3 text-6xl font-bold text-blue-500">
              {score}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center">
            <p className="text-slate-400">
              Performance
            </p>

            <h2
              className={`mt-3 text-4xl font-bold ${performanceColor}`}
            >
              {performance}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center">
            <p className="text-slate-400">
              Questions
            </p>

            <h2 className="mt-3 text-6xl font-bold text-white">
              {interview.questions.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-10 rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
        <h2 className="mb-6 text-3xl font-bold text-white">
          Interview Review
        </h2>

        <div className="space-y-6">
          {interview.questions.map(
            (question, index) => (
              <div
                key={question.id}
                className="rounded-2xl border border-slate-700 bg-slate-800 p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">
                    Question {index + 1}
                  </h3>

                  {question.feedback?.includes(
                    "Excellent"
                  ) ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <AlertCircle className="text-yellow-500" />
                  )}
                </div>

                <p className="text-lg font-medium text-slate-200">
                  {question.question}
                </p>

                <div className="mt-4 rounded-xl bg-slate-700 p-4">
                  <p className="mb-2 text-sm font-semibold text-slate-300">
                    Your Answer
                  </p>

                  <p className="text-white">
                    {question.answer ||
                      "No Answer Provided"}
                  </p>
                </div>

                {question.feedback && (
                  <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
                    <p className="font-semibold text-blue-400">
                      Feedback
                    </p>

                    <p className="mt-2 text-slate-200">
                      {question.feedback}
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>


        <div className="mt-10 rounded-3xl border border-slate-700 bg-slate-900 p-8">
          <h2 className="mb-6 text-3xl font-bold text-white">
            AI Assessment
          </h2>

          <div className="grid gap-6 lg:grid-cols-3">

            {/* Strengths */}
            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
              <h3 className="mb-4 text-xl font-bold text-green-400">
                Strengths
              </h3>

              <ul className="space-y-3 text-slate-200">
                <li>✓ Good technical understanding</li>
                <li>✓ Attempted all questions</li>
                <li>✓ Consistent participation</li>
                <li>✓ Clear communication</li>
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
              <h3 className="mb-4 text-xl font-bold text-red-400">
                Areas To Improve
              </h3>

              <ul className="space-y-3 text-slate-200">
                <li>• Add more technical depth</li>
                <li>• Use industry terminology</li>
                <li>• Explain concepts thoroughly</li>
                <li>• Include practical examples</li>
              </ul>
            </div>

            {/* Recommendation */}
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">
              <h3 className="mb-4 text-xl font-bold text-blue-400">
                Hiring Recommendation
              </h3>

              {score >= 80 ? (
                <div>
                  <p className="text-2xl font-bold text-green-400">
                    Strong Hire
                  </p>

                  <p className="mt-3 text-slate-200">
                    Candidate demonstrated excellent understanding
                    and is job-ready.
                  </p>
                </div>
              ) : score >= 60 ? (
                <div>
                  <p className="text-2xl font-bold text-yellow-400">
                    Consider
                  </p>

                  <p className="mt-3 text-slate-200">
                    Candidate shows promise but needs additional
                    preparation.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-bold text-red-400">
                    Not Yet Ready
                  </p>

                  <p className="mt-3 text-slate-200">
                    Candidate should strengthen core concepts and
                    practice interviews.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>



        <div className="mt-8 flex gap-4">
          <Link
            href="/dashboard/interviews"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Interviews
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}