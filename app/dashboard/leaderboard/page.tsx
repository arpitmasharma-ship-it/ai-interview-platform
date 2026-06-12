import { getLeaderboard } from "@/actions/leaderboard";

export default async function LeaderboardPage() {
  const leaderboard =
    await getLeaderboard();

  return (
    <main className="p-10">
      <h1 className="mb-8 text-4xl font-bold">
        🏆 Coding Leaderboard
      </h1>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
        "
      >
        <table className="w-full">
          <thead>
            <tr
              className="
                border-b
                bg-slate-900
              "
            >
              <th className="p-4 text-left">
                Rank
              </th>

              <th className="p-4 text-left">
                User
              </th>

              <th className="p-4 text-left">
                Problems Solved
              </th>

              <th className="p-4 text-left">
                Average Score
              </th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map(
              (
                user,
                index
              ) => (
                <tr
                  key={`${user.name}-${index}`}
                  className="
                    border-b
                  "
                >
                  <td className="p-4">
                    #{index + 1}
                  </td>

                  <td className="p-4">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.solved}
                  </td>

                  <td className="p-4">
                    {user.avgScore}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}