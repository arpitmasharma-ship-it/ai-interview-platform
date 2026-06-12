"use client";

import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ResumeBuilderPage() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const [template, setTemplate] =
    useState("modern");

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [github, setGithub] =
    useState("");

  const [linkedin, setLinkedin] =
    useState("");

  const [skills, setSkills] =
    useState("");

  const [projects, setProjects] =
    useState("");

  const [experience, setExperience] =
    useState("");

  const [education, setEducation] =
    useState("");

  const atsScore = Math.min(
    100,
    (skills ? 20 : 0) +
      (projects ? 20 : 0) +
      (experience ? 20 : 0) +
      (education ? 20 : 0) +
      (github ? 10 : 0) +
      (linkedin ? 10 : 0)
  );




const downloadResume = () => {
  const printContents =
    resumeRef.current?.innerHTML;

  if (!printContents) return;

  const printWindow = window.open(
    "",
    "_blank"
  );

  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head>
        <title>${name || "Resume"}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #000;
            background: #fff;
          }

          h1,h2,h3 {
            margin-bottom: 10px;
          }

          p {
            line-height: 1.6;
          }
        </style>
      </head>

      <body>
        ${printContents}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};


  return (
    <main className="min-h-screen p-8">

      {/* Header */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold text-white">
          AI Resume Builder
        </h1>

        <p className="mt-3 text-slate-400">
          Create ATS-Friendly Professional
          Resumes Instantly
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">

        {/* FORM SECTION */}

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-xl">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Resume Information
          </h2>

          <div className="space-y-5">

            <select
              value={template}
              onChange={(e) =>
                setTemplate(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
            >
              <option value="modern">
                Modern
              </option>

              <option value="minimal">
                Minimal
              </option>

              <option value="faang">
                FAANG
              </option>
            </select>

            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
            />

            <input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
            />

            <input
              placeholder="GitHub Profile"
              value={github}
              onChange={(e) =>
                setGithub(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
            />

            <input
              placeholder="LinkedIn Profile"
              value={linkedin}
              onChange={(e) =>
                setLinkedin(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
            />

            <textarea
              placeholder="Skills"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              className="h-32 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
            />

            <textarea
              placeholder="Projects"
              value={projects}
              onChange={(e) =>
                setProjects(e.target.value)
              }
              className="h-40 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
            />

            <textarea
              placeholder="Experience"
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
              className="h-40 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
            />

            <textarea
              placeholder="Education"
              value={education}
              onChange={(e) =>
                setEducation(e.target.value)
              }
              className="h-32 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
            />

          </div>
        </div>

        {/* PREVIEW SECTION */}

        <div className="space-y-6">

          {/* ATS SCORE */}

          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">

            <h3 className="font-bold text-green-400">
              ATS Score
            </h3>

            <div className="mt-2 text-5xl font-bold text-white">
              {atsScore}
            </div>

          </div>

          {/* DOWNLOAD BUTTON */}

          <button
            onClick={downloadResume}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Download Resume PDF
          </button>

          {/* RESUME PREVIEW */}

          <div
            ref={resumeRef}
            className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl"
          >

            <div className="space-y-8">

              <div>

                <h2 className="break-words text-5xl font-bold text-white">
                  {name || "Your Name"}
                </h2>

                <div className="mt-3 space-y-1 text-slate-300">

                  <p>
                    {email || "your@email.com"}
                  </p>

                  <p>
                    {phone ||
                      "+91 XXXXX XXXXX"}
                  </p>

                  <p className="break-all">
                    {github}
                  </p>

                  <p className="break-all">
                    {linkedin}
                  </p>

                </div>

              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-400">
                  Skills
                </h3>

                <p className="whitespace-pre-wrap break-all text-slate-200">
                  {skills ||
                    "No skills added"}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-green-400">
                  Projects
                </h3>

                <p className="whitespace-pre-wrap break-all text-slate-200">
                  {projects ||
                    "No projects added"}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-400">
                  Experience
                </h3>

                <p className="whitespace-pre-wrap break-all text-slate-200">
                  {experience ||
                    "No experience added"}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-yellow-400">
                  Education
                </h3>

                <p className="whitespace-pre-wrap break-all text-slate-200">
                  {education ||
                    "No education added"}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
                <h3 className="text-lg font-bold text-cyan-400">
                  Selected Template
                </h3>

                <p className="mt-2 capitalize text-slate-200">
                  {template}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}