"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [message, setMessage] =
    useState<string>("");

  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(
      e.currentTarget
    );

    const email =
      formData.get("email") as string;

    const password =
      formData.get("password") as string;

    const result = await signIn(
      "credentials",
      {
        email,
        password,
        redirect: false,
      }
    );

    if (result?.error) {
      setMessage(
        "❌ Invalid Credentials"
      );
      return;
    }

    setMessage(
      "✅ Login Successful"
    );

    router.push("/dashboard");

    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">

      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

        <h1 className="mb-6 text-center text-4xl font-bold text-white">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center text-white">
            {message}
          </p>
        )}

      </div>

    </main>
  );
}