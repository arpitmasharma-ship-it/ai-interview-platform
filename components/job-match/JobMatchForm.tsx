"use client";

import { useState } from "react";

export default function JobMatchForm() {

  const [jobDescription, setJobDescription] =
    useState("");

  const [result, setResult] =
    useState<any>(null);

  const handleSubmit = async () => {

    const res = await fetch(
      "/api/job-match",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          jobDescription,
        }),
      }
    );

    const data =
      await res.json();

    setResult(data);
  };

  return (
    <div className="space-y-6">

      <textarea
        value={jobDescription}
        onChange={(e) =>
          setJobDescription(
            e.target.value
          )
        }
        rows={10}
        placeholder="Paste Job Description..."
        className="w-full rounded-xl border p-4"
      />

      <button
        onClick={handleSubmit}
        className="rounded-xl bg-blue-600 px-6 py-3 text-white"
      >
        Analyze Match
      </button>

      {result && (

        <div className="rounded-3xl border p-6">

          <h2 className="text-3xl font-bold">
            Match Score:
            {" "}
            {result.matchScore}%
          </h2>

          <div className="mt-6">

            <h3 className="font-bold">
              Matched Skills
            </h3>

            <ul>
              {result.matchedSkills.map(
                (skill: string) => (
                  <li key={skill}>
                    ✓ {skill}
                  </li>
                )
              )}
            </ul>

          </div>

          <div className="mt-6">

            <h3 className="font-bold">
              Missing Skills
            </h3>

            <ul>
              {result.missingSkills.map(
                (skill: string) => (
                  <li key={skill}>
                    ✗ {skill}
                  </li>
                )
              )}
            </ul>

          </div>

        </div>

      )}

    </div>
  );
}