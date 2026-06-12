const knownSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Prisma",
];

export function extractSkills(
  text: string
) {
  return knownSkills.filter(
    (skill) =>
      text
        .toLowerCase()
        .includes(skill.toLowerCase())
  );
}