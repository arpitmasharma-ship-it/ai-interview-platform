interface Props {
  resumeScore: number;
  codingScore: number;
  interviewScore: number;
}

export default function ImprovementPlan({
  resumeScore,
  codingScore,
  interviewScore,
}: Props) {
  const tips = [];

  if (resumeScore < 80)
    tips.push(
      "Improve Resume Projects"
    );

  if (codingScore < 80)
    tips.push(
      "Solve More DSA Problems"
    );

  if (interviewScore < 80)
    tips.push(
      "Practice Mock Interviews"
    );

  return (
    <div className="rounded-3xl border p-8">

      <h2 className="text-2xl font-bold">
        AI Improvement Plan
      </h2>

      <ul className="mt-6 space-y-3">

        {tips.map((tip) => (
          <li key={tip}>
            • {tip}
          </li>
        ))}

      </ul>

    </div>
  );
}