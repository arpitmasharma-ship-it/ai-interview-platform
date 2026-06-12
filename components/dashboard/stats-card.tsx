"use client";

import { motion } from "framer-motion";

export default function StatsCard({
  title,
  value,
  icon,
}: any) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-6
      shadow-xl
      "
    >
      <div className="flex justify-between">
        <div>
          <p className="text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}