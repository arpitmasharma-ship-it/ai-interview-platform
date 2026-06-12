export default function JobStats({
  jobs = [],
}: {
  jobs?: any[];
}) {
  const saved = jobs.filter(
    (j) => j.status === "SAVED"
  ).length;

  const applied = jobs.filter(
    (j) => j.status === "APPLIED"
  ).length;

  const interview = jobs.filter(
    (j) => j.status === "INTERVIEW"
  ).length;

  const offers = jobs.filter(
    (j) => j.status === "OFFER"
  ).length;

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <StatCard
        title="Saved"
        value={saved}
      />

      <StatCard
        title="Applied"
        value={applied}
      />

      <StatCard
        title="Interviews"
        value={interview}
      />

      <StatCard
        title="Offers"
        value={offers}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
      <p className="text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        {value}
      </h2>
    </div>
  );
}