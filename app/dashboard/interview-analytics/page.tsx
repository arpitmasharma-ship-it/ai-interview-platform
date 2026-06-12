import {
  getInterviewAnalytics,
} from "@/actions/interview-analytics";

import ScoreTrendChart from "@/components/interview/ScoreTrendChart";
import SkillBreakdownChart from "@/components/interview/SkillBreakdownChart";
import ReadinessCard from "@/components/interview/ReadinessCard";

export default async function InterviewAnalyticsPage() {
  const analytics =
    await getInterviewAnalytics();

  if (!analytics) {
    return (
      <main className="p-10 text-white">
        <h1 className="text-3xl font-bold">
          Interview Analytics
        </h1>

        <p className="mt-4 text-slate-400">
          No analytics found.
        </p>
      </main>
    );
  }

  return (
    <main className="space-y-8 p-10 text-white">

      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">
          Interview Analytics
        </h1>

        <p className="mt-2 text-slate-400">
          Track your interview performance
          and placement readiness.
        </p>
      </div>

      {/* OVERVIEW */}

      <div className="grid gap-6 md:grid-cols-5">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <h3 className="text-slate-400">
            Total Interviews
          </h3>

          <p className="mt-3 text-4xl font-bold text-white">
            {analytics.totalInterviews}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <h3 className="text-slate-400">
            Average Score
          </h3>

          <p className="mt-3 text-4xl font-bold text-blue-400">
            {analytics.averageScore}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <h3 className="text-slate-400">
            Best Score
          </h3>

          <p className="mt-3 text-4xl font-bold text-green-400">
            {analytics.bestScore}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <h3 className="text-slate-400">
            Latest Score
          </h3>

          <p className="mt-3 text-4xl font-bold text-cyan-400">
            {analytics.latestScore}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <h3 className="text-slate-400">
            Improvement
          </h3>

          <p
            className={`mt-3 text-4xl font-bold ${
              analytics.improvement >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {analytics.improvement > 0 ? "+" : ""}
            {analytics.improvement}
          </p>
        </div>

      </div>

      {/* READINESS */}

      <ReadinessCard
        readinessScore={
          analytics.readinessScore
        }
      />

      {/* SCORE TREND */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Score Progression
        </h2>

        <ScoreTrendChart
          interviews={
            analytics.interviews
          }
        />

      </div>

      {/* SKILLS */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Skill Breakdown
        </h2>

        <SkillBreakdownChart
          technicalAverage={
            analytics.technicalAverage
          }
          communicationAverage={
            analytics.communicationAverage
          }
          confidenceAverage={
            analytics.confidenceAverage
          }
        />

      </div>

    </main>
  );
}