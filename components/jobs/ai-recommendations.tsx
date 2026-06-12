export default function AIRecommendations({
  jobs = [],
}: {
  jobs?: any[];
}) {
  return (
    <div className="rounded-3xl border p-6">
      <h2 className="mb-4 text-2xl font-bold">
        AI Recommendations
      </h2>

      <div className="space-y-4">
        <div className="rounded-xl border p-4">
          🚀 Apply to Product-Based Companies
        </div>

        <div className="rounded-xl border p-4">
          💡 Improve DSA for Interviews
        </div>

        <div className="rounded-xl border p-4">
          📈 Learn System Design
        </div>
      </div>
    </div>
  );
}