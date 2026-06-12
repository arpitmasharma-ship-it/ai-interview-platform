export default function RoadmapView({
  roadmap,
}: {
  roadmap: {
    week: number;
    skill: string;
  }[];
}) {
  return (
    <div className="space-y-4">
      {roadmap.map((item) => (
        <div
          key={item.week}
          className="rounded-xl border p-5"
        >
          <h3 className="font-bold">
            Week {item.week}
          </h3>

          <p>
            Learn {item.skill}
          </p>
        </div>
      ))}
    </div>
  );
}