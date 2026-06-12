import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {

  const users =
    await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="p-10">

      <h1 className="mb-8 text-4xl font-bold">
        Users
      </h1>

      <div className="rounded-3xl border overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Joined
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}