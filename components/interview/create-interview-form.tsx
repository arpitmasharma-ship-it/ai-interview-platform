"use client";

import { useState, useTransition } from "react";
import { createInterview } from "@/actions/interview";
import { InterviewType } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function CreateInterviewForm() {
  const router = useRouter();

  const [title, setTitle] =
    useState("");

  const [role, setRole] =
    useState("");

  const [type, setType] =
    useState<InterviewType>(
      InterviewType.TECHNICAL
    );

  const [isPending, startTransition] =
    useTransition();

  const handleSubmit = (
    e: React.FormEvent
  ): void => {
    e.preventDefault();

    startTransition(async () => {
      const result = await createInterview(
        title,
        role,
        type
      );

      if (!result?.success) {
        alert(
          result?.error ??
          "Failed to create interview"
        );
        return;
      }

      alert(
        "Interview Created Successfully 🚀"
      );

      router.refresh();

      setTitle("");
      setRole("");
      setType(
        InterviewType.TECHNICAL
      );
    });
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">
          Create New Interview
        </h2>

        <p className="mt-2 text-slate-400">
          Generate an AI-powered mock
          interview session.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Interview Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Frontend React Interview"
            required
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-white
              placeholder:text-slate-500
              focus:border-blue-500
              focus:outline-none
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Job Role
          </label>

          <input
            type="text"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            placeholder="Frontend Developer"
            required
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-white
              placeholder:text-slate-500
              focus:border-blue-500
              focus:outline-none
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Interview Type
          </label>

          <select
            value={type}
            onChange={(e) =>
              setType(
                e.target
                  .value as InterviewType
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-white
              focus:border-blue-500
              focus:outline-none
            "
          >
            <option value="TECHNICAL">
              Technical
            </option>

            <option value="HR">
              HR
            </option>

            <option value="BEHAVIORAL">
              Behavioral
            </option>

            <option value="SYSTEM_DESIGN">
              System Design
            </option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="
            w-full
            rounded-xl
            bg-blue-600
            px-6
            py-4
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            disabled:opacity-50
          "
        >
          {isPending
            ? "Creating Interview..."
            : "Create Interview 🚀"}
        </button>
      </form>
    </div>
  );
}