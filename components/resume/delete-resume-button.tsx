"use client";

import { deleteResume } from "@/actions/resume";

export default function DeleteResumeButton({
  id,
}: {
  id: string;
}) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this resume?"
    );

    if (!confirmed) return;

    await deleteResume(id);

    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="mt-3 rounded bg-red-500 px-3 py-2 text-white"
    >
      Delete
    </button>
  );
}