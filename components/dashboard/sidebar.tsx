"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import {
  LayoutDashboard,
  FileText,
  Briefcase,
  BarChart3,
  Settings,
  Map,
  Award,
  Target,
  Sparkles,
  LogOut,
  User,
  Code2,
  Brain,
} from "lucide-react";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/resume",
    label: "Resume Analyzer",
    icon: FileText,
  },
  {
    href: "/dashboard/resume-builder",
    label: "Resume Builder",
    icon: FileText,
  },
  {
    href: "/dashboard/coding",
    label: "Coding Practice",
    icon: Code2,
  },
  {
    href: "/dashboard/mock-interview",
    label: "AI Interview",
    icon: Brain,
  },
  {
    href: "/dashboard/interview-analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    href: "/dashboard/jobs",
    label: "Job Tracker",
    icon: Briefcase,
  },
  {
    href: "/dashboard/jobs/recommendations",
    label: "AI Recommendations",
    icon: Sparkles,
  },
  {
    href: "/dashboard/job-match",
    label: "Job Match",
    icon: Target,
  },
  {
    href: "/dashboard/roadmap",
    label: "Career Roadmap",
    icon: Map,
  },
  {
    href: "/dashboard/career-gap",
    label: "Career Gap",
    icon: Target,
  },
  {
    href: "/dashboard/certificate",
    label: "Certificate",
    icon: Award,
  },
  {
    href: "/dashboard/leaderboard",
    label: "Leaderboard",
    icon: Award,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside
      className="
      fixed
      left-0
      top-0
      z-50
      h-screen
      w-72
      bg-[#0B1120]
      border-r
      border-slate-800
      flex
      flex-col
      "
    >
      {/* LOGO */}

      <div className="px-6 py-6 border-b border-slate-800">
        <h1
          className="
          text-3xl
          font-black
          bg-gradient-to-r
          from-cyan-400
          via-blue-500
          to-purple-500
          bg-clip-text
          text-transparent
          "
        >
          AI Career OS
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Career Intelligence Platform
        </p>
      </div>

      {/* NAVIGATION */}

      <nav
        className="
        flex-1
        overflow-y-auto
        px-4
        py-5
        space-y-2
        "
      >
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href ||
            pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              transition-all
              duration-200
              ${
                active
                  ? `
                  bg-blue-600/15
                  border
                  border-blue-500/30
                  text-blue-400
                  `
                  : `
                  text-slate-400
                  hover:bg-slate-800
                  hover:text-white
                  `
              }
            `}
            >
              <Icon size={20} />

              <span className="font-medium">
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* USER CARD */}

      <div className="p-4 border-t border-slate-800">
        <div
          className="
          rounded-2xl
          border
          border-slate-800
          bg-slate-900
          p-4
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
              h-12
              w-12
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-purple-500
              flex
              items-center
              justify-center
              "
            >
              <User size={20} />
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold truncate text-white">
                {session?.user?.name || "User"}
              </h3>

              <p className="text-xs text-slate-500 truncate">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* LOGOUT */}

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="
          mt-4
          w-full
          h-12
          rounded-xl
          bg-red-600
          hover:bg-red-700
          transition
          font-medium
          text-white
          flex
          items-center
          justify-center
          gap-2
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}