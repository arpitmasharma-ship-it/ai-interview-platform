interface Props {
  total: number;
  offers: number;
  interviews: number;
}

export default function CompanyStatsCards({
  total,
  offers,
  interviews,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-3">

      <div className="rounded-3xl border p-6">
        <h3>Total Applications</h3>

        <p className="mt-3 text-4xl font-bold">
          {total}
        </p>
      </div>

      <div className="rounded-3xl border p-6">
        <h3>Interviews</h3>

        <p className="mt-3 text-4xl font-bold text-blue-600">
          {interviews}
        </p>
      </div>

      <div className="rounded-3xl border p-6">
        <h3>Offers</h3>

        <p className="mt-3 text-4xl font-bold text-green-600">
          {offers}
        </p>
      </div>

    </div>
  );
}