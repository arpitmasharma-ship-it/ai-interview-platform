"use client";

import { useState } from "react";

export default function StartInterviewPage() {
  const [role, setRole] = useState("Frontend Developer");

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">
        Start AI Interview
      </h1>

      <div className="mt-8 max-w-md">
        <label className="block font-medium">
          Select Role
        </label>

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="mt-2 w-full rounded-xl border p-3"
        >
          <option>
            Frontend Developer
          </option>

          <option>
            Backend Developer
          </option>

          <option>
            Full Stack Developer
          </option>

          <option>
            AI Engineer
          </option>
        </select>

        <button
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white"
        >
          Start Interview
        </button>
      </div>
    </main>
  );
}