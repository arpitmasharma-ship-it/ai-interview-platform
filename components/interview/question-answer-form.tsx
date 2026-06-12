"use client";

import { useState } from "react";
import { saveAnswer } from "@/actions/interview";

export default function QuestionAnswerForm({
  questionId,
  initialAnswer,
}: {
  questionId: string;
  initialAnswer?: string | null;
}) {
  const [answer, setAnswer] = useState(
    initialAnswer || ""
  );

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      await saveAnswer(questionId, answer);

      setMessage("Answer Saved ✅");
    } catch {
      setMessage("Failed to save answer ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <textarea
        value={answer}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
        placeholder="Type your answer..."
        rows={5}
        className="w-full rounded-lg border p-3"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-3 rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : "Save Answer"}
      </button>

      {message && (
        <p className="mt-2 text-sm">
          {message}
        </p>
      )}
    </div>
  );
}