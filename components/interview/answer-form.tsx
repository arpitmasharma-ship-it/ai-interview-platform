"use client";

import { useState, useTransition } from "react";
import { saveAnswer } from "@/actions/interview";

interface AnswerFormProps {
  questionId: string;
}

export default function AnswerForm({
  questionId,
}: AnswerFormProps) {
  const [answer, setAnswer] = useState("");
  const [saved, setSaved] = useState(false);

  const [isPending, startTransition] =
    useTransition();

  const handleSave = () => {
    setSaved(false);

    startTransition(async () => {
      await saveAnswer(
        questionId,
        answer
      );

      setSaved(true);
    });
  };

  return (
    <div className="space-y-4">
      <textarea
        value={answer}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
        placeholder="Write your answer here..."
        className="
          min-h-[180px]
          w-full
          rounded-2xl
          border
          border-slate-700
          bg-slate-800
          p-5
          text-white
          placeholder:text-slate-400
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/30
        "
      />

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={
            isPending ||
            answer.trim() === ""
          }
          className="
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isPending
            ? "Saving..."
            : "Save Answer"}
        </button>

        {saved && (
          <span className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white">
            ✓ Answer Saved
          </span>
        )}
      </div>
    </div>
  );
}