"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  technicalAverage: number;
  communicationAverage: number;
  confidenceAverage: number;
}

export default function SkillBreakdownChart({
  technicalAverage,
  communicationAverage,
  confidenceAverage,
}: Props) {
  const data = [
    {
      skill: "Technical",
      score: technicalAverage,
    },
    {
      skill: "Communication",
      score: communicationAverage,
    },
    {
      skill: "Confidence",
      score: confidenceAverage,
    },
  ];

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="skill"
            stroke="#94A3B8"
          />

          <YAxis
            stroke="#94A3B8"
          />

          <Tooltip />

          <Bar
            dataKey="score"
            fill="#06B6D4"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}