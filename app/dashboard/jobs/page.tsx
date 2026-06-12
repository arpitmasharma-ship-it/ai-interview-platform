import JobStats from "@/components/jobs/job-stats";
import AddJobForm from "@/components/jobs/add-job-form";
import ApplicationPipeline from "@/components/jobs/application-pipeline";
import AIRecommendations from "@/components/jobs/ai-recommendations";

export default async function JobsPage() {
 const jobs: any[] = [];

  return (
    <main className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-bold">
          AI Job Tracker
        </h1>

        <p className="mt-2 text-slate-500">
          Manage applications and discover opportunities.
        </p>
      </div>

      <JobStats jobs={jobs} />

      <AddJobForm />

      <ApplicationPipeline jobs={jobs} />

      <AIRecommendations jobs={jobs} />
    </main>
  );
}