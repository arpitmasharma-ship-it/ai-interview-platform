"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { evaluateInterview } from "@/actions/interview";

export default function FinishInterviewButton({
  interviewId,
}: {
  interviewId: string;
}) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await evaluateInterview(
            interviewId
          );

          router.push(
            `/dashboard/interviews/${interviewId}/result`
          );
        })
      }
      disabled={pending}
      className="mt-6 rounded-lg bg-green-600 px-5 py-3 text-white"
    >
      {pending
        ? "Evaluating..."
        : "Finish Interview"}
    </button>
  );
}