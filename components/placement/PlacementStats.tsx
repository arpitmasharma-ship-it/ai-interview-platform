interface Props {
  total: number;
}

export default function PlacementStats({
  total,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">

      <h2 className="text-xl font-bold">
        Total Companies
      </h2>

      <p className="mt-4 text-5xl font-extrabold text-blue-600">
        {total}
      </p>

    </div>
  );
}