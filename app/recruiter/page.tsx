import { getCandidates } from "@/actions/recruiter";

export default async function RecruiterPage() {
  const candidates =
    await getCandidates();

  return (
    <main className="p-10">

      <h1 className="mb-8 text-4xl font-bold">
        Recruiter Dashboard
      </h1>

      <div className="grid gap-6">

        {candidates.map((candidate) => (

          <div
            key={candidate.id}
            className="rounded-3xl border p-6"
          >

            <h2 className="text-2xl font-bold">
              {candidate.name}
            </h2>

            <p className="text-slate-500">
              {candidate.email}
            </p>

            <div className="mt-4 flex gap-6">

              <div>
                Placement Score:
                {" "}
                <span className="font-bold text-blue-600">
                candidate.PlacementReadiness?.score
                </span>
              </div>

              <div>
                Resumes:
                {" "}
                {candidate.resumes.length}
              </div>

              <div>
                Interviews:
                {" "}
                {candidate.interviews.length}
              </div>

              <div>
                Coding:
                {" "}
                {candidate.CodingSubmission.length}
              </div>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}