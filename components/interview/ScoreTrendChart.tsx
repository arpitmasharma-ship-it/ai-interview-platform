"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  interviews: {
    score: number;
  }[];
}

export default function ScoreTrendChart({
  interviews,
}: Props) {
  const data = interviews.map(
    (interview, index) => ({
      interview: index + 1,
      score: interview.score,
    })
  );

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="interview"
            stroke="#94A3B8"
          />

          <YAxis
            stroke="#94A3B8"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#06B6D4"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}