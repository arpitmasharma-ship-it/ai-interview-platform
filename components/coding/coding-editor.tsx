"use client";

import { useState, useTransition } from "react";
import Editor from "@monaco-editor/react";
import { submitSolution } from "@/actions/coding";

interface Problem {
    id: string;
    title: string;
    description: string;
    starterCode: string;
}

interface Submission {
    id: string;
    score: number;
    feedback?: string | null;
    createdAt: Date | string;
}

interface ReviewResult {
    score: number;
    complexity: string;
    feedback: string;
    strengths: string[];
    weaknesses: string[];
}

interface CodingEditorProps {
    problem: Problem;
    submissions: Submission[];
}

export default function CodingEditor({
    problem,
    submissions,
}: CodingEditorProps) {
    const [code, setCode] = useState<string>(
        problem.starterCode
    );

    const [review, setReview] =
        useState<ReviewResult | null>(null);

    const [output, setOutput] =
        useState<string>("");

    const [isPending, startTransition] =
        useTransition();

    const handleSubmit = (): void => {
  startTransition(async () => {
    try {
      const response =
        await submitSolution(
          problem.id,
          code
        );

      setReview({
        score: response.score,
        complexity:
          response.complexity,
        feedback:
          response.feedback,
        strengths:
          response.strengths,
        weaknesses:
          response.weaknesses,
      });

      setOutput(
        response.output ||
        "No Output"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to submit solution"
      );
    }
  });
};

    return (
        <main className="p-10">
            <h1 className="text-4xl font-bold">
                {problem.title}
            </h1>

            <div className="mt-6 rounded-xl border p-6">
                <p>{problem.description}</p>
            </div>

            <div className="mt-6">
                <Editor
                    height="500px"
                    theme="vs-dark"
                    defaultLanguage="javascript"
                    value={code}
                    onChange={(value) =>
                        setCode(value ?? "")
                    }
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={isPending}
                className="
          mt-6
          rounded-xl
          bg-blue-600
          px-6
          py-3
          text-white
          hover:bg-blue-700
          disabled:opacity-50
        "
            >
                {isPending
                    ? "Submitting..."
                    : "Submit Solution"}
            </button>

            {review && (
                <div
                    className="
            mt-8
            rounded-2xl
            border
            border-green-500
            bg-slate-900
            p-6
          "
                >
                    <h2
                        className="
              text-2xl
              font-bold
              text-green-400
            "
                    >
                        AI Review
                    </h2>

                    <div className="mt-4 space-y-2">
                        <p>
                            Score:
                            <strong>
                                {" "}
                                {review.score}/100
                            </strong>
                        </p>

                        <p>
                            Complexity:
                            <strong>
                                {" "}
                                {review.complexity}
                            </strong>
                        </p>
                    </div>

                    <div className="mt-5">
                        <h3
                            className="
                font-semibold
                text-green-400
              "
                        >
                            Strengths
                        </h3>

                        <ul className="list-disc pl-5">
                            {review.strengths.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <li key={index}>
                                        {item}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div className="mt-5">
                        <h3
                            className="
                font-semibold
                text-red-400
              "
                        >
                            Weaknesses
                        </h3>

                        <ul className="list-disc pl-5">
                            {review.weaknesses.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <li key={index}>
                                        {item}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div className="mt-5">
                        <h3
                            className="
                font-semibold
                text-blue-400
              "
                        >
                            Feedback
                        </h3>

                        <p>
                            {review.feedback}
                        </p>
                    </div>
                </div>
            )}


            {output && (
  <div
    className="
      mt-6
      rounded-2xl
      border
      border-yellow-500
      bg-slate-900
      p-6
    "
  >
    <h2
      className="
        text-xl
        font-bold
        text-yellow-400
      "
    >
      Execution Output
    </h2>

    <pre
      className="
        mt-4
        whitespace-pre-wrap
        text-sm
        text-white
      "
    >
      {output}
    </pre>
  </div>
)}



            <div className="mt-10">
                <h2 className="mb-4 text-2xl font-bold">
                    Previous Submissions
                </h2>

                {submissions.length === 0 ? (
                    <p>No submissions yet.</p>
                ) : (
                    <div className="space-y-3">
                        {submissions.map(
                            (
                                submission
                            ) => (
                                <div
                                    key={
                                        submission.id
                                    }
                                    className="
                    rounded-xl
                    border
                    border-slate-700
                    p-5
                    bg-slate-900
                  "
                                >
                                    <div className="flex justify-between">
                                        <h3 className="font-bold">
                                            Score:
                                            {" "}
                                            {submission.score}
                                        </h3>

                                        <p
                                            className="
      text-sm
      text-slate-400
    "
                                        >
                                            {new Date(
                                                submission.createdAt
                                            ).toISOString()}
                                        </p>
                                    </div>

                                    <p className="mt-3">
                                        {
                                            submission.feedback
                                        }
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}