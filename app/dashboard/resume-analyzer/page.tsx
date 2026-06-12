"use client";

import { useState } from "react";

export default function ResumeAnalyzerPage() {
  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);

    const formData =
      new FormData();

    formData.append(
      "resume",
      file
    );

    const response =
      await fetch(
        "/api/resume-analyzer",
        {
          method: "POST",
          body: formData,
        }
      );

    const data =
      await response.json();

    setResult(data);

    setLoading(false);
  };

  return (
    <main className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          AI Resume Analyzer
        </h1>

        <p className="text-slate-500">
          Upload your resume and get
          ATS feedback instantly.
        </p>
      </div>

      <div className="rounded-3xl border p-8">

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] ||
                null
            )
          }
        />

        <button
          onClick={handleAnalyze}
          className="mt-5 rounded-xl bg-blue-600 px-6 py-3 text-white"
        >
          {loading
            ? "Analyzing..."
            : "Analyze Resume"}
        </button>

      </div>

      {result && (
        <div className="space-y-6">

          <div className="rounded-3xl border p-8">
            <h2 className="text-3xl font-bold">
              ATS Score
            </h2>

            <div className="mt-3 text-6xl font-bold text-green-500">
              {result.score}%
            </div>
          </div>

          <div className="rounded-3xl border p-8">
            <h2 className="text-2xl font-bold">
              Suggestions
            </h2>

            <ul className="mt-4 space-y-2">
              {result.suggestions.map(
                (
                  item: string,
                  index: number
                ) => (
                  <li key={index}>
                    • {item}
                  </li>
                )
              )}
            </ul>
          </div>

        </div>
      )}

    </main>
  );
}