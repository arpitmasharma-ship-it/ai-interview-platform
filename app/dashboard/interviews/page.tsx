import CreateInterviewForm from "@/components/interview/create-interview-form";
import { getUserInterviews } from "@/actions/interview";
import Link from "next/link";

export default async function InterviewsPage() {
  const interviews = await getUserInterviews();

  return (
    <main className="p-10">
      <h1 className="mb-8 text-3xl font-bold">
        Interview Sessions 🚀
      </h1>

      <CreateInterviewForm />

      <div className="mt-10">
        <h2 className="text-2xl font-bold">
          My Interviews
        </h2>

        {interviews.length === 0 ? (
          <div className="mt-4 rounded-lg border p-6">
            <p>No interviews yet.</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {interviews.map((interview) => (
              <Link
                key={interview.id}
                href={`/dashboard/interviews/${interview.id}`}
                className="rounded-xl border p-5 shadow-sm transition hover:shadow-md hover:border-blue-500"
              >
                <h3 className="text-xl font-bold">
                  {interview.title}
                </h3>

                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <strong>Role:</strong>{" "}
                    {interview.role ?? "Not Specified"}
                  </p>

                  <p>
                    <strong>Type:</strong>{" "}
                    {interview.type}
                  </p>

                  <p>
                    <strong>Questions:</strong>{" "}
                    {interview.questions?.length ?? 0}
                  </p>

                  <p>
                    <strong>Score:</strong>{" "}
                    {interview.score ?? "Pending"}
                  </p>

                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(
                      interview.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-5">
                  <span className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-white">
                    Open Interview →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}