interface Props {
  placementScore: number;
  resumeScore: number;
  codingScore: number;
  interviewScore: number;
}

export default function PlacementScoreCard({
  placementScore,
  resumeScore,
  codingScore,
  interviewScore,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-white">

      <h2 className="text-2xl font-bold">
        Placement Readiness Score
      </h2>

      <div className="mt-6">

        <h1 className="text-7xl font-extrabold text-cyan-400">
          {placementScore}%
        </h1>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">

        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-slate-400">
            Resume
          </p>

          <h3 className="text-3xl font-bold">
            {resumeScore}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-slate-400">
            Coding
          </p>

          <h3 className="text-3xl font-bold">
            {codingScore}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-slate-400">
            Interview
          </p>

          <h3 className="text-3xl font-bold">
            {interviewScore}
          </h3>
        </div>

      </div>

    </div>
  );
}