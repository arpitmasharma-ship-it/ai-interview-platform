export default function ApplicationPipeline({
  jobs = [],
}: {
  jobs?: any[];
}) {
  return (
    <div className="rounded-3xl border p-6">
      <h2 className="mb-6 text-2xl font-bold">
        Application Pipeline
      </h2>

      {jobs.length === 0 ? (
        <p className="text-slate-500">
          No jobs added yet.
        </p>
      ) : (
        <div>
          Jobs Loaded
        </div>
      )}
    </div>
  );
}