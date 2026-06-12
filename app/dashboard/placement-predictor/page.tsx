import { getPlacementPrediction }
from "@/actions/placement-predictor";

import PlacementScoreCard
from "@/components/placement/PlacementScoreCard";

import CompanyPredictionCard
from "@/components/placement/CompanyPredictionCard";

import ImprovementPlan
from "@/components/placement/ImprovementPlan";

export default async function PlacementPredictorPage() {

  const data =
    await getPlacementPrediction();

  if (!data) {
    return (
      <main className="p-10">
        No Data
      </main>
    );
  }

  return (
    <main className="space-y-8 p-10">

      <h1 className="text-4xl font-bold">
        AI Placement Predictor
      </h1>

      <PlacementScoreCard
        score={
          data.placementProbability
        }
      />

      <CompanyPredictionCard
        dreamCompanies={
          data.dreamCompanies
        }
        productCompanies={
          data.productCompanies
        }
        serviceCompanies={
          data.serviceCompanies
        }
      />

      <ImprovementPlan
        resumeScore={
          data.resumeScore
        }
        codingScore={
          data.codingScore
        }
        interviewScore={
          data.interviewScore
        }
      />

    </main>
  );
}