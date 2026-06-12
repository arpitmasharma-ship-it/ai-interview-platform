interface Props {
  probability: number;
}

export default function PlacementPrediction({
  probability,
}: Props) {

  const status =
    probability >= 80
      ? "HIGH CHANCE"
      : probability >= 60
      ? "MODERATE"
      : "LOW CHANCE";

  return (
    <div className="rounded-3xl border p-8">

      <h2 className="text-2xl font-bold">
        Placement Prediction
      </h2>

      <div className="mt-6">

        <p className="text-6xl font-bold text-green-600">
          {probability}%
        </p>

        <p className="mt-3 text-xl font-bold">
          {status}
        </p>

      </div>

    </div>
  );
}