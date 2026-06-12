"use client";

import { useState } from "react";

import CodeEditor from "@/components/coding/code-editor";

export default function ProblemClient({
  problem,
}: any) {
  const [code, setCode] =
    useState(problem.starterCode);

  return (
    <main className="grid grid-cols-2 h-screen">

      <div className="overflow-y-auto p-8">

        <h1 className="text-3xl font-bold">
          {problem.title}
        </h1>

        <div
          className="mt-6"
          dangerouslySetInnerHTML={{
            __html: problem.description,
          }}
        />

      </div>

      <div>

        <CodeEditor
          code={code}
          setCode={setCode}
        />

      </div>

    </main>
  );
}