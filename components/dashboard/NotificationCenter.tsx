interface Notification {
  id: number;
  title: string;
  message: string;
}

export default function NotificationCenter() {
  const notifications: Notification[] = [
    {
      id: 1,
      title: "Resume Analysis",
      message:
        "Your ATS score improved by 12 points.",
    },

    {
      id: 2,
      title: "Interview Progress",
      message:
        "You completed 5 mock interviews this week.",
    },

    {
      id: 3,
      title: "Coding Practice",
      message:
        "Your coding score increased by 8%.",
    },

    {
      id: 4,
      title: "Career Roadmap",
      message:
        "A new roadmap has been generated.",
    },
  ];

  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-slate-900">

      <h2 className="text-2xl font-bold">
        AI Notifications
      </h2>

      <div className="mt-6 space-y-4">

        {notifications.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border p-4"
          >
            <h3 className="font-bold">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {item.message}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}