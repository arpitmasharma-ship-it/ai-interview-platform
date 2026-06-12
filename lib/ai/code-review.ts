export interface CodeReviewResult {
  score: number;
  complexity: string;
  feedback: string;
  strengths: string[];
  weaknesses: string[];
}

export async function reviewCode(
  problem: string,
  code: string
): Promise<CodeReviewResult> {

  let score = 50;

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  let complexity = "Unknown";

  if (code.length > 200) {
    score += 10;

    strengths.push(
      "Detailed implementation"
    );
  }

  if (
    code.includes("for(") ||
    code.includes("for (")
  ) {
    score += 10;

    strengths.push(
      "Uses iteration"
    );

    complexity = "O(n)";
  }

  if (
    code.includes("while(") ||
    code.includes("while (")
  ) {
    score += 10;

    strengths.push(
      "Uses looping efficiently"
    );

    complexity = "O(n)";
  }

  if (
    code.includes("new Map") ||
    code.includes("Map(")
  ) {
    score += 20;

    strengths.push(
      "Uses HashMap optimization"
    );

    complexity = "O(n)";
  }

  if (
    code.includes(".map(") ||
    code.includes(".filter(") ||
    code.includes(".reduce(")
  ) {
    score += 10;

    strengths.push(
      "Uses modern JavaScript methods"
    );
  }

  if (
    code.includes("return")
  ) {
    score += 10;

    strengths.push(
      "Returns result correctly"
    );
  } else {
    score -= 10;

    weaknesses.push(
      "Missing return statement"
    );
  }

  if (
    code.trim().length < 50
  ) {
    score = 30;

    weaknesses.push(
      "Solution appears incomplete"
    );
  }

  score = Math.max(
    0,
    Math.min(100, score)
  );

  return {
    score,

    complexity,

    feedback:
      score >= 90
        ? "Excellent solution."
        : score >= 70
        ? "Good solution with minor improvements possible."
        : score >= 50
        ? "Average solution. Optimization recommended."
        : "Incomplete solution.",

    strengths,

    weaknesses,
  };
}