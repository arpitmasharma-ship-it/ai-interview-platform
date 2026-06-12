"use client";

export default function AddJobForm() {
  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-bold">
        Add Job Application
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          placeholder="Company"
          className="rounded-xl border border-slate-700 bg-slate-950 p-3"
        />

        <input
          placeholder="Role"
          className="rounded-xl border border-slate-700 bg-slate-950 p-3"
        />

        <input
          placeholder="Location"
          className="rounded-xl border border-slate-700 bg-slate-950 p-3"
        />

        <select className="rounded-xl border border-slate-700 bg-slate-950 p-3">
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      <button className="mt-5 rounded-xl bg-blue-600 px-6 py-3">
        Save Job
      </button>
    </div>
  );
}