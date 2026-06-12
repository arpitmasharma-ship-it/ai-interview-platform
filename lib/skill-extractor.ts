export function extractSkills(
  text: string
) {
  const skills = [
    "react",
    "next.js",
    "javascript",
    "typescript",
    "node.js",
    "express",
    "mongodb",
    "postgresql",
    "prisma",
    "docker",
    "aws",
    "tailwind",
    "python",
    "java",
    "c++",
  ];

  return skills.filter((skill) =>
    text.toLowerCase().includes(
      skill.toLowerCase()
    )
  );
}