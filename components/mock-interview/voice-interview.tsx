"use client";

import { useState, useEffect } from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import {
  generateInterviewReport,
} from "@/components/interview/generate-report";

const questions = [
  "Tell me about yourself",
  "Explain React lifecycle",
  "Difference between SQL and NoSQL",
  "What is Next.js?",
  "Explain JavaScript closures",
];

export default function VoiceInterview() {
  const [mounted, setMounted] =
    useState(false);

  const [index, setIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState<string[]>([]);

  const [evaluation, setEvaluation] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    transcript,
    resetTranscript,
  } = useSpeechRecognition();

  if (!mounted) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-white">
        Loading Interview...
      </div>
    );
  }

  if (
    !SpeechRecognition.browserSupportsSpeechRecognition()
  ) {
    return (
      <div className="rounded-xl bg-red-500/10 p-6 text-red-400">
        Browser does not support speech recognition.
      </div>
    );
  }

  const startRecording = () => {
    resetTranscript();

    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();

    setAnswers((prev) => [
      ...prev,
      transcript,
    ]);
  };

  const nextQuestion = () => {
    if (
      index <
      questions.length - 1
    ) {
      setIndex((prev) => prev + 1);
    }

    setEvaluation(null);
    resetTranscript();
  };

  const evaluateAnswer =
    async () => {
      if (!transcript) {
        alert("Please answer first");
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          "/api/mock-interview/evaluate",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              question:
                questions[index],
              answer: transcript,
            }),
          }
        );

        const data =
          await res.json();

        setEvaluation(data);

        // AUTO SAVE RESULT

        await fetch(
          "/api/mock-interview/save",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              score:
                data.score,
              technical:
                data.technical,
              communication:
                data.communication,
              confidence:
                data.confidence,
              feedback:
                data.feedback,
              strengths:
                data.strengths,
              improvements:
                data.improvements,
            }),
          }
        );
      } catch (error) {
        console.error(error);

        alert(
          "Failed to evaluate answer"
        );
      }

      setLoading(false);
    };

  return (
    <div className="space-y-6 rounded-3xl border border-slate-700 bg-slate-900 p-8 text-white">

      {/* HEADER */}

      <h1 className="text-3xl font-bold">
        AI Voice Interview
      </h1>

      {/* PROGRESS */}

      <div>

        <div className="mb-2 flex justify-between text-sm text-slate-400">
          <span>
            Progress
          </span>

          <span>
            {index + 1}/
            {questions.length}
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">

          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
            style={{
              width: `${
                ((index + 1) /
                  questions.length) *
                100
              }%`,
            }}
          />

        </div>

      </div>

      {/* QUESTION */}

      <div className="rounded-2xl bg-slate-800 p-6">

        <h2 className="text-xl font-bold text-blue-400">
          Question {index + 1}
        </h2>

        <p className="mt-4 text-lg text-slate-200">
          {questions[index]}
        </p>

      </div>

      {/* ANSWER */}

      <div className="min-h-[220px] rounded-2xl border border-slate-700 bg-slate-800 p-6">

        <h3 className="mb-4 text-lg font-semibold text-cyan-400">
          Your Answer
        </h3>

        <p className="leading-8 text-slate-300">
          {transcript ||
            "Start speaking and your answer will appear here..."}
        </p>

      </div>

      {/* BUTTONS */}

      <div className="flex flex-wrap gap-4">

        <button
          onClick={startRecording}
          className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          🎤 Start
        </button>

        <button
          onClick={stopRecording}
          className="rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700"
        >
          ⏹ Stop
        </button>

        <button
          onClick={evaluateAnswer}
          disabled={loading}
          className="rounded-xl bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
        >
          {loading
            ? "Evaluating..."
            : "🤖 Evaluate"}
        </button>

        <button
          onClick={nextQuestion}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          ➜ Next Question
        </button>

      </div>

      {/* EVALUATION */}

      {evaluation && (

        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">

          <h3 className="mb-6 text-2xl font-bold text-cyan-400">
            AI Evaluation
          </h3>

          <div className="grid gap-4 md:grid-cols-4">

            <div className="rounded-xl bg-slate-900 p-4 text-center">

              <p className="text-slate-400">
                Overall
              </p>

              <h4 className="mt-2 text-4xl font-bold text-blue-400">
                {evaluation.score}
              </h4>

            </div>

            <div className="rounded-xl bg-slate-900 p-4 text-center">

              <p className="text-slate-400">
                Technical
              </p>

              <h4 className="mt-2 text-4xl font-bold text-green-400">
                {evaluation.technical}
              </h4>

            </div>

            <div className="rounded-xl bg-slate-900 p-4 text-center">

              <p className="text-slate-400">
                Communication
              </p>

              <h4 className="mt-2 text-4xl font-bold text-purple-400">
                {evaluation.communication}
              </h4>

            </div>

            <div className="rounded-xl bg-slate-900 p-4 text-center">

              <p className="text-slate-400">
                Confidence
              </p>

              <h4 className="mt-2 text-4xl font-bold text-yellow-400">
                {evaluation.confidence}
              </h4>

            </div>

          </div>

          <div className="mt-6">

            <h4 className="font-bold text-cyan-400">
              Feedback
            </h4>

            <p className="mt-2 text-slate-300">
              {evaluation.feedback}
            </p>

          </div>

          {/* DOWNLOAD REPORT */}

          <div className="mt-8">

            <button
              onClick={() =>
                generateInterviewReport(
                  evaluation
                )
              }
              className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
            >
              📄 Download Report
            </button>

          </div>

        </div>

      )}

    </div>
  );
}