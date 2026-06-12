interface Props {
  score: number;
  resumeScore: number;
  interviewScore: number;
  codingScore: number;
  roadmapScore: number;
}

export default function PlacementReadinessCard({
  score,
  resumeScore,
  interviewScore,
  codingScore,
  roadmapScore,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-slate-900">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Placement Readiness
          </h2>

          <p className="mt-2 text-slate-500">
            AI calculated placement score
          </p>
        </div>

        <div className="text-5xl font-extrabold text-blue-600">
          {score}
        </div>

      </div>

      <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-200">

        <div
          className="h-full rounded-full bg-gradient-to-r from-green-500 to-blue-600"
          style={{
            width: `${score}%`,
          }}
        />

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">

        <div className="rounded-xl border p-4">
          <p className="text-sm text-slate-500">
            Resume
          </p>

          <p className="text-2xl font-bold">
            {resumeScore}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-slate-500">
            Interview
          </p>

          <p className="text-2xl font-bold">
            {interviewScore}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-slate-500">
            Coding
          </p>

          <p className="text-2xl font-bold">
            {codingScore}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-slate-500">
            Roadmap
          </p>

          <p className="text-2xl font-bold">
            {roadmapScore}
          </p>
        </div>

      </div>

    </div>
  );
}