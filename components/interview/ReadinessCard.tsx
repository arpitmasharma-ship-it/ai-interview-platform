interface Props {
  readinessScore: number;
}

export default function ReadinessCard({
  readinessScore,
}: Props) {
  let status = "";
  let color = "";

  if (readinessScore >= 90) {
    status = "Placement Ready";
    color = "text-green-400";
  } else if (readinessScore >= 75) {
    status = "Strong Candidate";
    color = "text-blue-400";
  } else if (readinessScore >= 60) {
    status = "Improving";
    color = "text-yellow-400";
  } else {
    status = "Needs Practice";
    color = "text-red-400";
  }

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-900
        p-8
        shadow-sm
        text-white
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          text-cyan-400
        "
      >
        Career Readiness
      </h2>

      <div className="mt-6">
        <p
          className="
            text-6xl
            font-extrabold
            text-white
          "
        >
          {readinessScore}
        </p>

        <p
          className={`mt-4 text-xl font-bold ${color}`}
        >
          {status}
        </p>
      </div>
    </div>
  );
}