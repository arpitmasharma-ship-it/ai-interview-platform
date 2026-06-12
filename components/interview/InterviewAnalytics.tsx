"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: any;
}

export default function InterviewAnalytics({
  data,
}: Props) {
  const chartData =
    data.interviews.map(
      (
        item: any,
        index: number
      ) => ({
        name: `#${index + 1}`,
        score: item.score,
        technical:
          item.technical,
        communication:
          item.communication,
        confidence:
          item.confidence,
      })
    );

  return (
    <div className="space-y-8">

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl border p-6">
          <h3>Total Interviews</h3>
          <p className="text-4xl font-bold">
            {data.totalInterviews}
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h3>Average Score</h3>
          <p className="text-4xl font-bold">
            {data.averageScore}
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h3>Technical</h3>
          <p className="text-4xl font-bold">
            {data.averageTechnical}
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h3>Communication</h3>
          <p className="text-4xl font-bold">
            {data.averageCommunication}
          </p>
        </div>

      </div>

      <div className="rounded-2xl border p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Performance Trend
        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <LineChart
            data={chartData}
          >
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
            />

            <Line
              type="monotone"
              dataKey="technical"
            />

            <Line
              type="monotone"
              dataKey="communication"
            />

            <Line
              type="monotone"
              dataKey="confidence"
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}