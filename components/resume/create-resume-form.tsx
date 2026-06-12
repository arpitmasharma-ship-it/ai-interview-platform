"use client";

import { useState } from "react";
import { createResume } from "@/actions/resume";

export default function CreateResumeForm() {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!file) {
            setMessage("Please select a PDF file");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            const formData =
                new FormData();

            formData.append(
                "file",
                file
            );

            const upload =
                await fetch(
                    "/api/upload-resume",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

            const data = await upload.json();

            console.log("UPLOAD RESPONSE:", data);

            if (!data.url) {
                throw new Error(
                    "Upload failed: no URL returned"
                );
            }

            await createResume(
                title,
                data.url
            );

            setMessage(
                "Resume saved successfully ✅"
            );

            setTitle("");
            setFile(null);

            window.location.reload();
        } catch (error) {
            console.error(error);

            setMessage(
                "Failed to save resume ❌"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">
                Add Resume
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <input
                    type="text"
                    placeholder="Resume Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
                    required
                />

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                        setFile(
                            e.target.files?.[0] ||
                            null
                        )
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white"
                >
                    {loading
                        ? "Saving..."
                        : "Save Resume"}
                </button>
            </form>

            {message && (
                <p className="mt-4 text-white">
                    {message}
                </p>
            )}
        </div>
    );
}