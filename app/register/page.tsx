"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/register";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState<boolean>(false);

  const [message, setMessage] =
    useState<string>("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    const form = e.currentTarget;

    setLoading(true);
    setMessage("");

    const formData = new FormData(form);

    const result = await registerUser({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (result.success) {
      setMessage(
        "Account created successfully ✅"
      );

      form.reset();

      // Wait 1 second then redirect
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      setMessage(
        result.error ||
          "Something went wrong"
      );
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="name"
            placeholder="Full Name"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 p-4 font-semibold text-white transition hover:bg-blue-700"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center text-white">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-slate-400">
          Already have an account?
        </p>

        <button
          onClick={() =>
            router.push("/login")
          }
          className="mt-3 w-full rounded-xl border border-slate-700 p-3 text-white hover:bg-slate-800"
        >
          Login
        </button>

      </div>
    </main>
  );
}