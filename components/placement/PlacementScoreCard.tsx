interface Props {
  score: number;
}

export default function PlacementScoreCard({
  score,
}: Props) {
  return (
    <div className="rounded-3xl border p-8">

      <h2 className="text-2xl font-bold">
        Placement Probability
      </h2>

      <div className="mt-6 text-center">

        <h1 className="text-7xl font-extrabold text-blue-600">
          {score}%
        </h1>

      </div>

    </div>
  );
}