import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserResumes } from "@/actions/resume";
import CreateResumeForm from "@/components/resume/create-resume-form";
import DeleteResumeButton from "@/components/resume/delete-resume-button";
import AnalyzeResumeButton from "@/components/resume/analyze-resume-button";

export default async function ResumePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const resumes = await getUserResumes();

  return (
    <main className="p-10">
      <h1 className="mb-8 text-3xl font-bold">
        Resume Management 🚀
      </h1>

      <CreateResumeForm />

      <div className="mt-10">
        <h2 className="text-2xl font-bold">
          My Resumes
        </h2>

        {resumes.length === 0 ? (
          <p className="mt-4">
            No resumes added yet.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="rounded-xl border p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold">
                  {resume.title}
                </h3>

                {/* Debug URL */}
                <p className="mt-2 break-all text-sm text-red-500">
                  {resume.fileUrl}
                </p>

                <a
                  href={resume.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-blue-600 hover:underline"
                >
                 View Resume ({resume.fileUrl})
                </a>

                <div className="mt-4 flex gap-3">
                  <AnalyzeResumeButton
                    resumeId={resume.id}
                  />

                  <DeleteResumeButton
                    id={resume.id}
                  />
                </div>

                {resume.atsScore !== null &&
                  resume.atsScore !== undefined && (
                    <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                      <p className="font-bold text-green-900">
                        ATS Score: {resume.atsScore}/100
                      </p>
                    </div>
                  )}

                {resume.feedback && (
                  <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
                    <h4 className="mb-2 font-semibold">
                      Feedback
                    </h4>

                    <p className="whitespace-pre-wrap text-sm text-slate-800">
                      {resume.feedback}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}