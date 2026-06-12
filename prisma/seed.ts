import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // =========================
  // Job Recommendations
  // =========================

  await prisma.jobRecommendation.createMany({
    data: [
      {
        title: "Frontend Developer",
        company: "Google",
        location: "Bangalore",
        salary: "18 LPA",
        skills: ["react", "next.js"],
        description: "Frontend engineer role",
      },

      {
        title: "Full Stack Engineer",
        company: "Microsoft",
        location: "Hyderabad",
        salary: "22 LPA",
        skills: ["react", "node.js"],
        description: "Full stack product engineer",
      },
    ],
  });

  // =========================
  // Coding Problems
  // =========================

  await prisma.codingProblem.createMany({
    data: [
      {
        title: "Two Sum",
        difficulty: "Easy",
        description:
          "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",

        starterCode: `function twoSum(nums, target) {

}`,

        solution:
          "Use a HashMap to store visited values.",

        testCases: {
          input: [2, 7, 11, 15],
          target: 9,
          output: [0, 1],
        },
      },

      {
        title: "Valid Parentheses",
        difficulty: "Easy",
        description:
          "Given a string containing brackets, determine if the input string is valid.",

        starterCode: `function isValid(s) {

}`,

        solution:
          "Use a stack to track opening brackets.",

        testCases: {
          input: "()[]{}",
          output: true,
        },
      },

      {
        title: "Reverse String",
        difficulty: "Easy",
        description:
          "Write a function that reverses a string.",

        starterCode: `function reverseString(str) {

}`,

        solution:
          "Split, reverse and join the string.",

        testCases: {
          input: "hello",
          output: "olleh",
        },
      },

      {
        title: "Merge Intervals",
        difficulty: "Medium",
        description:
          "Merge all overlapping intervals.",

        starterCode: `function mergeIntervals(intervals) {

}`,

        solution:
          "Sort intervals and merge overlaps.",

        testCases: {
          input: [[1,3],[2,6],[8,10],[15,18]],
          output: [[1,6],[8,10],[15,18]],
        },
      },
    ],
  });

  console.log("✅ Seed completed successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });