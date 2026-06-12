import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question, answer } =
      await req.json();

    if (!answer || answer.trim() === "") {
      return NextResponse.json({
        score: 0,
        feedback:
          "No answer detected. Please provide an answer.",
        strengths: [],
        improvements: [
          "Try speaking your answer clearly.",
        ],
      });
    }

    const wordCount =
      answer.split(" ").length;

    let score = 50;

    if (wordCount > 20) score += 10;
    if (wordCount > 40) score += 10;
    if (wordCount > 80) score += 10;

    const strengths: string[] = [];
    const improvements: string[] = [];

    if (wordCount > 30) {
      strengths.push(
        "Good answer length"
      );
    } else {
      improvements.push(
        "Provide more detailed explanations"
      );
    }

    if (
      answer.toLowerCase().includes("example")
    ) {
      strengths.push(
        "Used examples effectively"
      );
      score += 10;
    } else {
      improvements.push(
        "Add real-world examples"
      );
    }

    if (
      answer.toLowerCase().includes("because")
    ) {
      strengths.push(
        "Explained reasoning clearly"
      );
      score += 10;
    }

    score = Math.min(score, 100);

    return NextResponse.json({
      score,
      feedback:
        score >= 80
          ? "Excellent answer"
          : score >= 60
          ? "Good answer"
          : "Needs improvement",

      strengths,

      improvements,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to evaluate answer",
      },
      {
        status: 500,
      }
    );
  }
}