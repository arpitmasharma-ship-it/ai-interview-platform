import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import VoiceInterview from "@/components/mock-interview/voice-interview";

export default async function MockInterviewPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",  
    },
    include: {
      mockInterviews: true,
    },
  });

 return (
  <main className="p-8 space-y-8">

    <div>
      <h1 className="text-4xl font-bold">
        AI Mock Interviews
      </h1>

      <p className="text-slate-500 mt-2">
        Practice interviews with AI and improve
        your placement readiness.
      </p>
    </div>

    {/* AI Voice Interview */}

    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">
        AI Voice Mock Interview
      </h2>

      <VoiceInterview />
    </div>

    {/* Your Mock Interviews */}

    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      ...
    </div>

  </main>
);
}