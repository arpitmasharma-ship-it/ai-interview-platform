"use client";

import {
  useState,
} from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function VoiceInterviewPage() {
  const [score, setScore] =
    useState<number | null>(null);

  const [feedback, setFeedback] =
    useState("");

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div>
        Browser does not support speech recognition.
      </div>
    );
  }

  const evaluateAnswer = () => {
    let calculatedScore = 0;

    if (
      transcript.length > 100
    ) {
      calculatedScore += 40;
    }

    if (
      transcript.includes("React")
    ) {
      calculatedScore += 20;
    }

    if (
      transcript.includes("Next")
    ) {
      calculatedScore += 20;
    }

    if (
      transcript.includes("project")
    ) {
      calculatedScore += 20;
    }

    setScore(calculatedScore);

    if (
      calculatedScore > 80
    ) {
      setFeedback(
        "Excellent answer. Strong technical explanation."
      );
    } else if (
      calculatedScore > 60
    ) {
      setFeedback(
        "Good answer. Add more details."
      );
    } else {
      setFeedback(
        "Need improvement. Use examples and technical depth."
      );
    }
  };

  return (
    <main className="min-h-screen p-10">

      <h1 className="mb-3 text-5xl font-bold">
        AI Voice Interview
      </h1>

      <p className="mb-8 text-slate-400">
        Practice interviews using voice.
      </p>

      <div className="rounded-3xl border bg-slate-900 p-8">

        <h2 className="mb-4 text-2xl font-bold">
          Question
        </h2>

        <p className="text-lg">
          Tell me about a project you built using React and Next.js.
        </p>

        <div className="mt-8 flex gap-4">

          <button
            onClick={() =>
              SpeechRecognition.startListening({
                continuous: true,
              })
            }
            className="rounded-xl bg-green-600 px-5 py-3 text-white"
          >
            Start Recording
          </button>

          <button
            onClick={() =>
              SpeechRecognition.stopListening()
            }
            className="rounded-xl bg-red-600 px-5 py-3 text-white"
          >
            Stop Recording
          </button>

          <button
            onClick={resetTranscript}
            className="rounded-xl bg-slate-700 px-5 py-3 text-white"
          >
            Clear
          </button>

        </div>

      </div>

      <div className="mt-8 rounded-3xl border bg-slate-900 p-8">

        <h2 className="mb-4 text-2xl font-bold">
          Transcript
        </h2>

        <p className="whitespace-pre-wrap">
          {transcript}
        </p>

      </div>

      <button
        onClick={evaluateAnswer}
        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white"
      >
        Evaluate Answer
      </button>

      {score !== null && (
        <div className="mt-8 rounded-3xl border bg-slate-900 p-8">

          <h2 className="text-3xl font-bold">
            Score: {score}/100
          </h2>

          <p className="mt-4 text-slate-300">
            {feedback}
          </p>

        </div>
      )}

    </main>
  );
}