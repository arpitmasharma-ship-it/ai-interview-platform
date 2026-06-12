import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import CareerInsights from "@/components/dashboard/CareerInsights";
import NotificationCenter from "@/components/dashboard/NotificationCenter";


import { getAchievements } from "@/actions/achievements";
import AchievementsSection from "@/components/dashboard/AchievementsSection";

import PlacementReadinessCard from "@/components/dashboard/PlacementReadinessCard";

import {
  calculatePlacementReadiness,
} from "@/actions/placement-readiness";


export default async function DashboardPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
    include: {
      interviews: true,
      resumes: true,
    },
  });

  const achievements =
    await getAchievements();

  const readiness =
    await calculatePlacementReadiness();

  const totalInterviews =
    user?.interviews.length ?? 0;

  const totalResumes =
    user?.resumes.length ?? 0;

  const avgScore =
    totalInterviews > 0
      ? Math.round(
        user!.interviews.reduce(
          (sum, interview) =>
            sum + (interview.score ?? 0),
          0
        ) / totalInterviews
      )
      : 0;

  const latestInterview =
    user?.interviews.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )[0];

  const careerLevel =
    avgScore >= 80
      ? "Job Ready 🚀"
      : avgScore >= 60
        ? "Growing 📈"
        : "Learning 🌱";

  return (
    <main className="space-y-8">
      {/* Hero Section */}
      <div
        className="
  relative
  overflow-hidden
  rounded-[32px]
  border
  border-white/10
  bg-gradient-to-r
  from-blue-600
  via-indigo-600
  to-purple-700
  p-10
  text-white
  shadow-2xl
"
      >
        <h1 className="text-5xl font-black">
          Welcome Back {user?.name}
        </h1>

        <p className="mt-4 text-xl text-blue-100">
          Your AI Career Operating System
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/dashboard/mock-interview"
            className="
      rounded-xl
      bg-white
      px-6
      py-3
      font-bold
      text-blue-700
      "
          >
            Start AI Interview
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Total Interviews
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {totalInterviews}
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Average Score
          </p>

          <h2 className="mt-3 text-4xl font-bold text-blue-600">
            {avgScore}%
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Uploaded Resumes
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-600">
            {totalResumes}
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Career Level
          </p>

          <h2 className="mt-3 text-2xl font-bold text-purple-600">
            {careerLevel}
          </h2>
        </div>
      </div>

      {/* Career Score */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              AI Career Score
            </h2>

            <p className="mt-2 text-slate-500">
              Based on interviews and
              resume performance.
            </p>
          </div>

          <div className="text-5xl font-bold text-blue-600">
            {avgScore}
          </div>
        </div>

        <div className="mt-6 h-5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
            style={{
              width: `${avgScore}%`,
            }}
          />
        </div>
      </div>

      <CareerInsights
        averageScore={avgScore}
        totalInterviews={totalInterviews}
      />

      {readiness && (
        <PlacementReadinessCard
          score={readiness.score}
          resumeScore={readiness.resumeScore}
          interviewScore={readiness.interviewScore}
          codingScore={readiness.codingScore}
          roadmapScore={readiness.roadmapScore}
        />
      )}

      <NotificationCenter />

      <AchievementsSection
        achievements={achievements}
      />

      {/* Latest Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-slate-900">
          <h2 className="mb-4 text-2xl font-bold">
            Latest Interview
          </h2>

          {latestInterview ? (
            <>
              <h3 className="text-xl font-semibold">
                {latestInterview.title}
              </h3>

              <p className="mt-2 text-slate-500">
                Role:{" "}
                {latestInterview.role ||
                  "Not specified"}
              </p>

              <p className="mt-2 text-slate-500">
                Score:{" "}
                {latestInterview.score ??
                  "Pending"}
              </p>

              <Link
                href={`/dashboard/interviews/${latestInterview.id}`}
                className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 text-white"
              >
                Continue →
              </Link>
            </>
          ) : (
            <p className="text-slate-500">
              No interviews yet.
            </p>
          )}
        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-slate-900">
          <h2 className="mb-4 text-2xl font-bold">
            Quick Actions
          </h2>

          <div className="space-y-3">
            <Link
              href="/dashboard/resume"
              className="block rounded-xl border p-4 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              📄 Analyze Resume
            </Link>

            <Link
              href="/dashboard/interviews"
              className="block rounded-xl border p-4 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              🎤 Practice Interview
            </Link>



            <Link
             href={`/profile/${user?.id}`}
              target="_blank"
              className="
    block
    w-full
    rounded-xl
    bg-green-600
    p-4
    text-white
    font-medium
    text-center
    transition
    hover:bg-green-700
  "
            >
              🚀 Share Profile
            </Link>
            <Link
              href="/dashboard/roadmap"
              className="block rounded-xl border p-4 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              🗺️ View Career Roadmap
            </Link>

            <Link
              href="/dashboard/company-tracker"
              className="block rounded-xl border p-4 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              🏢 Company Tracker
            </Link>

            <Link
              href="/dashboard/analytics"
              className="block rounded-xl border p-4 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              📊 Performance Analytics
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}