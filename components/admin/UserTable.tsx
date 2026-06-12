interface UserTableProps {
  users: {
    id: string;
    name: string | null;
    email: string | null;
    resumes: any[];
    interviews: any[];
    PlacementReadiness: {
      score: number;
    } | null;
  }[];
}

export default function UserTable({
  users,
}: UserTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">

      <h2 className="mb-6 text-2xl font-bold">
        Users
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b text-left">

            <th className="p-4">
              Name
            </th>

            <th className="p-4">
              Email
            </th>

            <th className="p-4">
              Career Score
            </th>

            <th className="p-4">
              Resumes
            </th>

            <th className="p-4">
              Interviews
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-b hover:bg-slate-50 dark:hover:bg-slate-800"
            >

              <td className="p-4 font-medium">
                {user.name || "Unknown"}
              </td>

              <td className="p-4">
                {user.email}
              </td>

              <td className="p-4">

                <span className="rounded-xl bg-blue-100 px-3 py-1 text-blue-700 dark:bg-blue-900 dark:text-blue-300">

                  {user.PlacementReadiness?.score || 0}

                </span>

              </td>

              <td className="p-4">
                {user.resumes.length}
              </td>

              <td className="p-4">
                {user.interviews.length}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}