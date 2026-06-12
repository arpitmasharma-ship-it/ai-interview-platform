"use client";

import { useState } from "react";
import { createResume } from "@/actions/resume";

export default function UploadResumeForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    formData: FormData
  ) {
    setLoading(true);

    try {
      const title =
        formData.get("title") as string;

      const fileUrl =
        formData.get("fileUrl") as string;

      await createResume(
        title,
        fileUrl
      );

      alert(
        "Resume uploaded successfully"
      );
    } catch (error) {
      console.error(error);

      alert("Upload failed");
    }

    setLoading(false);
  }

  return (
    <form action={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Resume Title"
        className="mb-4 w-full rounded border p-2"
        required
      />

      <input
        type="text"
        name="fileUrl"
        placeholder="Resume File URL"
        className="mb-4 w-full rounded border p-2"
        required
      />

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {loading
          ? "Uploading..."
          : "Upload Resume"}
      </button>
    </form>
  );
}