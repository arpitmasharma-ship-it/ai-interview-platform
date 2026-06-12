import { prisma } from "@/lib/prisma";

export default async function TestPage() {
  const users = await prisma.user.findMany();

  return (
    <div className="p-10">
      <h1>Total Users: {users.length}</h1>
    </div>
  );
}