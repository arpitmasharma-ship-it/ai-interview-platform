interface Props {
  title: string;
  description: string;
  earned: boolean;
}

export default function AchievementCard({
  title,
  description,
  earned,
}: Props) {
  return (
    <div
      className={`rounded-2xl border p-5 transition ${
        earned
          ? "border-green-500 bg-green-500/10"
          : "border-slate-700 bg-slate-800"
      }`}
    >
      <h3 className="text-lg font-bold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-300">
        {description}
      </p>

      <div className="mt-4">
        {earned ? (
          <span className="font-semibold text-green-400">
            ✅ Unlocked
          </span>
        ) : (
          <span className="font-semibold text-slate-500">
            🔒 Locked
          </span>
        )}
      </div>
    </div>
  );
}