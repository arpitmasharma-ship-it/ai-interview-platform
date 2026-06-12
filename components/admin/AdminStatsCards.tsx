interface Props {
  stats: {
    users: number;
    resumes: number;
    interviews: number;
    codingSubmissions: number;
    mockInterviewResults: number;
    achievements: number;
    jobApplications: number;
  };
}

export default function AdminStatsCards({
  stats,
}: Props) {
  const cards = [
    {
      title: "Users",
      value: stats.users,
      color: "text-blue-600",
    },
    {
      title: "Resumes",
      value: stats.resumes,
      color: "text-green-600",
    },
    {
      title: "Interviews",
      value: stats.interviews,
      color: "text-purple-600",
    },
    {
      title: "Coding",
      value: stats.codingSubmissions,
      color: "text-orange-600",
    },
    {
      title: "Mock Interviews",
      value: stats.mockInterviewResults,
      color: "text-cyan-600",
    },
    {
      title: "Achievements",
      value: stats.achievements,
      color: "text-yellow-600",
    },
    {
      title: "Applications",
      value: stats.jobApplications,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="
            rounded-3xl
            border
            bg-white
            p-6
            shadow-sm
            dark:bg-slate-900
          "
        >
          <p className="text-sm text-slate-500">
            {card.title}
          </p>

          <h2
            className={`mt-3 text-4xl font-bold ${card.color}`}
          >
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}