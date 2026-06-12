import { getCompanies }
from "@/actions/placements";

import PlacementStats from "@/components/placement/PlacementStats";
import CompanyCard from "@/components/placement/CompanyCard";



export default async function PlacementsPage() {

  const companies =
    await getCompanies();

  return (
    <main className="space-y-8 p-10">

      <h1 className="text-4xl font-bold">
        Placement Tracker
      </h1>

      <PlacementStats
        total={companies.length}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {companies.map(
          company => (
            <CompanyCard
              key={company.id}
              company={company}
            />
          )
        )}

      </div>

    </main>
  );
}