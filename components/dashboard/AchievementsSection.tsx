import AchievementCard from "./AchievementCard";

interface Props {
  achievements: any[];
}

export default function AchievementsSection({
  achievements,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-sm">

      <h2 className="text-2xl font-bold text-white">
        Achievements
      </h2>

      {achievements.length === 0 ? (
        <p className="mt-4 text-slate-400">
          No achievements unlocked yet.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              title={achievement.title}
              description={achievement.description}
              earned={achievement.earned}
            />
          ))}
        </div>
      )}

    </div>
  );
}