import JobMatchForm from "@/components/job-match/JobMatchForm";

export default function JobMatchPage() {
  return (
    <main className="p-10 space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          AI Resume vs Job Match
        </h1>

        <p className="mt-2 text-slate-500">
          Compare your resume against any job description.
        </p>
      </div>

      <JobMatchForm />

    </main>
  );
}