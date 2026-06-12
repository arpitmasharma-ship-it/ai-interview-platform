import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CodingArenaPage() {
  const problems =
    await prisma.codingProblem.findMany();

  return (
    <main className="p-8">

      <h1 className="text-4xl font-bold">
        Coding Arena
      </h1>

      <div className="mt-8 grid gap-4">

        {problems.map((problem) => (

          <Link
            key={problem.id}
          href={`/dashboard/coding-arena/${problem.id}`}
            className="rounded-2xl border p-6 hover:shadow-lg"
          >

            <h2 className="text-xl font-bold">
              {problem.title}
            </h2>

            <p>
              {problem.difficulty}
            </p>

          </Link>

        ))}

      </div>

    </main>
  );
}