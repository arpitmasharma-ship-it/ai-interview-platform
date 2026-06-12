"use client";

import { useState } from "react";
import { evaluateInterview } from "@/actions/interview";

export default function EvaluateButton({
  interviewId,
}: {
  interviewId: string;
}) {
  const [message, setMessage] =
    useState("");

  async function handleEvaluate() {
    const score =
      await evaluateInterview(
        interviewId
      );

    setMessage(
      `Interview Score: ${score}/100`
    );

    window.location.reload();
  }

  return (
    <div className="mt-6">
      <button
        onClick={handleEvaluate}
        className="rounded bg-green-600 px-4 py-2 text-white"
      >
        Evaluate Interview
      </button>

      {message && (
        <p className="mt-2">
          {message}
        </p>
      )}
    </div>
  );
}