interface Props {
  averageScore: number;
  totalInterviews: number;
}

export default function CareerInsights({
  averageScore,
  totalInterviews,
}: Props) {
  let recommendation = "";
  let level = "";

  if (averageScore >= 85) {
    level = "Placement Ready 🚀";

    recommendation =
      "Start applying for internships and product companies.";
  } else if (averageScore >= 70) {
    level = "Strong Candidate 📈";

    recommendation =
      "Focus on DSA and Mock Interviews.";
  } else if (averageScore >= 50) {
    level = "Improving 🌱";

    recommendation =
      "Practice technical interviews weekly.";
  } else {
    level = "Beginner 🔥";

    recommendation =
      "Work on resume, projects and communication skills.";
  }

  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-slate-900">

      <h2 className="text-2xl font-bold">
        AI Career Insights
      </h2>

      <div className="mt-6 space-y-4">

        <div>
          <p className="text-slate-500">
            Career Level
          </p>

          <h3 className="text-2xl font-bold text-blue-600">
            {level}
          </h3>
        </div>

        <div>
          <p className="text-slate-500">
            Total Practice
          </p>

          <h3 className="text-xl font-semibold">
            {totalInterviews} Interviews
          </h3>
        </div>

        <div>
          <p className="text-slate-500">
            AI Recommendation
          </p>

          <p className="font-medium">
            {recommendation}
          </p>
        </div>

      </div>

    </div>
  );
}   