"use client";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface Props {
  onTranscript: (text: string) => void;
}

export default function VoiceAnswer({
  onTranscript,
}: Props) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <p>
        Browser doesn't support speech recognition.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-4 min-h-[120px]">
        {transcript || "Start speaking..."}
      </div>

      <div className="flex gap-3">
        <button
          className="rounded-lg bg-green-600 px-4 py-2 text-white"
          onClick={() =>
            SpeechRecognition.startListening({
              continuous: true,
            })
          }
        >
          🎤 Start
        </button>

        <button
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
          onClick={() =>
            SpeechRecognition.stopListening()
          }
        >
          ⏹ Stop
        </button>

        <button
          className="rounded-lg bg-slate-600 px-4 py-2 text-white"
          onClick={() => {
            onTranscript(transcript);
          }}
        >
          Save Answer
        </button>

        <button
          className="rounded-lg border px-4 py-2"
          onClick={resetTranscript}
        >
          Reset
        </button>
      </div>

      <p>
        Status:
        {listening
          ? " Listening..."
          : " Stopped"}
      </p>
    </div>
  );
}