import RoadmapView
from "@/components/roadmap/roadmap-view";

import { generateRoadmap }
from "@/actions/roadmap";

export default async function RoadmapPage() {

  const skills = [
    "react",
    "next.js",
    "javascript",
  ];

  const roadmap =
    await generateRoadmap(
      skills,
      "fullstack"
    );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        AI Career Roadmap
      </h1>

      <RoadmapView
        roadmap={roadmap}
      />
    </div>
  );
}