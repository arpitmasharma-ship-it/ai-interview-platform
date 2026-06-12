import {
  getAdminStats,
  getPlatformActivity,
  getUserGrowthData,
} from "@/actions/admin";

import UserGrowthChart from "@/components/admin/UserGrowthChart";
import PlatformActivityChart from "@/components/admin/PlatformActivityChart";

export default async function AdminAnalyticsPage() {
  const [
    stats,
    activityData,
    growthData,
  ] = await Promise.all([
    getAdminStats(),
    getPlatformActivity(),
    getUserGrowthData(),
  ]);

  return (
    <main className="space-y-8 p-10">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-bold">
          Platform Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          Detailed insights into platform
          growth and user engagement.
        </p>

      </div>

      {/* OVERVIEW */}

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">

          <h3 className="text-slate-500">
            Total Users
          </h3>

          <p className="mt-3 text-4xl font-bold text-blue-600">
            {stats.users}
          </p>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">

          <h3 className="text-slate-500">
            Interviews
          </h3>

          <p className="mt-3 text-4xl font-bold text-green-600">
            {stats.interviews}
          </p>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">

          <h3 className="text-slate-500">
            Resumes
          </h3>

          <p className="mt-3 text-4xl font-bold text-purple-600">
            {stats.resumes}
          </p>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">

          <h3 className="text-slate-500">
            Coding Solutions
          </h3>

          <p className="mt-3 text-4xl font-bold text-orange-600">
            {stats.codingSubmissions}
          </p>

        </div>

      </div>

      {/* CHARTS */}

      <div className="grid gap-8 lg:grid-cols-2">

        <UserGrowthChart
          data={growthData}
        />

        <PlatformActivityChart
          data={activityData}
        />

      </div>

      {/* PLATFORM HEALTH */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-slate-900">

        <h2 className="mb-6 text-2xl font-bold">
          Platform Health
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <div>

            <h3 className="font-semibold">
              Mock Interviews
            </h3>

            <p className="mt-2 text-3xl font-bold text-cyan-600">
              {stats.mockInterviewResults}
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Job Applications
            </h3>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {stats.jobApplications}
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Achievements
            </h3>

            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {stats.achievements}
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}