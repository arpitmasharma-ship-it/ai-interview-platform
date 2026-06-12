"use client";

interface InterviewChartProps {
  data: {
    score: number;
    createdAt: Date;
  }[];
}

export default function InterviewChart({
  data,
}: InterviewChartProps) {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-xl border p-4"
        >
          <span>
            Interview {index + 1}
          </span>

          <span className="font-bold">
            {item.score}
          </span>
        </div>
      ))}
    </div>
  );
}