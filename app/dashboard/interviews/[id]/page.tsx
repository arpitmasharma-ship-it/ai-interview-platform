import { getInterviewById } from "@/actions/interview";
import AnswerForm from "@/components/interview/answer-form";
import FinishInterviewButton from "@/components/interview/finish-interview-button";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function InterviewPage({
  params,
}: Props) {
  const { id } = await params;

  const interview = await getInterviewById(id);

  if (!interview) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <h1 className="text-3xl font-bold text-red-500">
            Interview Not Found
          </h1>
        </div>
      </div>
    );
  }

  const answeredQuestions =
    interview.questions.filter(
      (q) =>
        q.answer &&
        q.answer.trim().length > 0
    ).length;

  const progress =
    interview.questions.length > 0
      ? Math.round(
          (answeredQuestions /
            interview.questions.length) *
            100
        )
      : 0;

  return (
    <main className="mx-auto max-w-7xl p-8">
      {/* HERO SECTION */}

      <div className="mb-8 overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">
        <div className="p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-white">
                {interview.title}
              </h1>

              <p className="mt-2 text-lg text-slate-300">
                {interview.role}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                {interview.type}
              </span>

              <span className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white">
                {answeredQuestions}/
                {interview.questions.length} Answered
              </span>
            </div>
          </div>

          {/* Progress */}

          <div className="mt-8">
            <div className="mb-2 flex justify-between text-sm text-slate-300">
              <span>Interview Progress</span>
              <span>{progress}%</span>
            </div>

            <div className="h-4 w-full overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="mb-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
          <p className="text-sm text-slate-400">
            Total Questions
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {interview.questions.length}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
          <p className="text-sm text-slate-400">
            Answered
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-400">
            {answeredQuestions}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
          <p className="text-sm text-slate-400">
            Current Score
          </p>

          <h2 className="mt-2 text-4xl font-bold text-blue-400">
            {interview.score ?? 0}
          </h2>
        </div>
      </div>

      {/* QUESTIONS */}

      <div className="space-y-8">
        {interview.questions.map(
          (question, index) => (
            <div
              key={question.id}
              className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Question {index + 1}
                </h3>

                {question.answer ? (
                  <span className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white">
                    Answered
                  </span>
                ) : (
                  <span className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white">
                    Pending
                  </span>
                )}
              </div>

              <div className="mb-6 rounded-2xl border border-slate-700 bg-slate-800 p-5">
                <p className="text-lg font-medium text-white">
                  {question.question}
                </p>
              </div>

              <AnswerForm
                questionId={question.id}
              />

              {question.feedback && (
                <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
                  <h4 className="mb-2 font-bold text-blue-400">
                    AI Feedback
                  </h4>

                  <p className="text-slate-200">
                    {question.feedback}
                  </p>

                  {question.score !== null &&
                    question.score !==
                      undefined && (
                      <div className="mt-3">
                        <span className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white">
                          Score:{" "}
                          {Math.round(
                            Number(
                              question.score
                            )
                          )}
                          %
                        </span>
                      </div>
                    )}
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* FINISH BUTTON */}

      <div className="mt-12 flex justify-center">
        <FinishInterviewButton
          interviewId={interview.id}
        />
      </div>
    </main>
  );
}