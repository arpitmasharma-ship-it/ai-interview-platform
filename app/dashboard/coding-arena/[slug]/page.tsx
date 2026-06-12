import { prisma } from "@/lib/prisma";
import ProblemClient from "./problem-client";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const problem =
  await prisma.codingProblem.findFirst({
  where: {
    title: slug,
  },
});

  if (!problem) {
    return <div>Problem Not Found</div>;
  }

  return (
    <ProblemClient
      problem={problem}
    />
  );
}