import {
  getAdminStats,
  getUsersForAdmin,
  getPlatformActivity,
  getUserGrowthData,
} from "@/actions/admin";

import AdminStatsCards from "@/components/admin/AdminStatsCards";
import UserTable from "@/components/admin/UserTable";
import UserGrowthChart from "@/components/admin/UserGrowthChart";
import PlatformActivityChart from "@/components/admin/PlatformActivityChart";

export default async function AdminPage() {
  const [
    stats,
    users,
    activityData,
    growthData,
  ] = await Promise.all([
    getAdminStats(),
    getUsersForAdmin(),
    getPlatformActivity(),
    getUserGrowthData(),
  ]);

  return (
    <main className="space-y-8 p-10">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor platform growth,
          user activity and performance.
        </p>

      </div>

      {/* STATS */}

      <AdminStatsCards
        stats={{
          users: stats.users,
          resumes: stats.resumes,
          interviews: stats.interviews,
          codingSubmissions:
            stats.codingSubmissions,
          mockInterviewResults:
            stats.mockInterviewResults,
          achievements:
            stats.achievements,
          jobApplications:
            stats.jobApplications,
        }}
      />

      {/* CHARTS */}

      <div className="grid gap-8 lg:grid-cols-2">

        <UserGrowthChart
          data={growthData}
        />

        <PlatformActivityChart
          data={activityData}
        />

      </div>

      {/* USERS TABLE */}

      <UserTable
        users={users}
      />

    </main>
  );
}