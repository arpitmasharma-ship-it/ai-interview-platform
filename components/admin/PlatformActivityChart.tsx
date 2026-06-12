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
  data: {
    name: string;
    value: number;
  }[];
}

export default function PlatformActivityChart({
  data,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-slate-900">

      <h2 className="mb-6 text-2xl font-bold">
        Platform Activity
      </h2>

      <div className="h-[400px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="name"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
              fill="#3B82F6"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}