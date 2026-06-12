import {
  getCompanyApplications,
} from "@/actions/company-tracker";

import CompanyStatsCards
from "@/components/company/CompanyStatsCards";

import PlacementPipeline
from "@/components/company/PlacementPipeline";

import CompanyTrackerTable
from "@/components/company/CompanyTrackerTable";

export default async function CompanyTrackerPage() {

  const applications =
    await getCompanyApplications();

  const offers =
    applications.filter(
      a =>
        a.status ===
        "Offer Received"
    ).length;

  const interviews =
    applications.filter(
      a =>
        a.status.includes(
          "Interview"
        )
    ).length;

  return (
    <main className="space-y-8 p-10">

      <h1 className="text-4xl font-bold">
        Company Tracker
      </h1>

      <CompanyStatsCards
        total={
          applications.length
        }
        offers={offers}
        interviews={
          interviews
        }
      />

      <PlacementPipeline
        applications={
          applications
        }
      />

      <CompanyTrackerTable
        applications={
          applications
        }
      />

    </main>
  );
}