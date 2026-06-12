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
  data: {
    month: string;
    users: number;
  }[];
}

export default function UserGrowthChart({
  data,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-slate-900">

      <h2 className="mb-6 text-2xl font-bold">
        User Growth
      </h2>

      <div className="h-[400px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="users"
              stroke="#2563EB"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}