"use client";

import { useState } from "react";
import { analyzeResume } from "@/actions/resume-analysis";

export default function AnalyzeResumeButton({
  resumeId,
}: {
  resumeId: string;
}) {
  const [loading, setLoading] =
    useState(false);

  async function handleAnalyze() {
    try {
      setLoading(true);

      await analyzeResume(
        resumeId
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleAnalyze}
      disabled={loading}
      className="rounded bg-blue-600 px-4 py-2 text-white"
    >
      {loading
        ? "Analyzing..."
        : "Analyze Resume"}
    </button>
  );
}