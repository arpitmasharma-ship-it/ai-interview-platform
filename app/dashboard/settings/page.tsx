"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("Arpit Sharma");
  const [email, setEmail] = useState("arpit@gmail.com");
  const [theme, setTheme] = useState("dark");

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    showPasswordModal,
    setShowPasswordModal,
  ] = useState(false);

  const [notifications, setNotifications] =
    useState(true);

  const saveProfile = async () => {
    try {
      const res = await fetch(
        "/api/settings/update",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          "✅ Profile Updated Successfully"
        );
      }
    } catch (error) {
      console.error(error);

      alert("❌ Update Failed");
    }
  };

  const savePreferences = async () => {
    try {
      await fetch(
        "/api/settings/preferences",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            theme,
            notifications,
          }),
        }
      );

      alert(
        "✅ Preferences Updated"
      );
    } catch {
      alert(
        "❌ Failed To Save Preferences"
      );
    }
  };


  const changePassword = () => {
    alert(
      "🔐 Password Reset Feature Coming Soon"
    );
  };

  const enable2FA = () => {
    alert("🛡️ Two Factor Authentication Enabled");
  };
const deleteAccount = async (): Promise<void> => {
  const confirmed = confirm(
    "⚠️ This will permanently delete your account. Continue?"
  );

  if (!confirmed) return;

  try {
    const res = await fetch(
      "/api/settings/delete-account",
      {
        method: "DELETE",
      }
    );

    const data: {
      success?: boolean;
      error?: string;
    } = await res.json();

    if (data.success) {
      alert(
        "Account deleted successfully"
      );

      window.location.href =
        "/register";
    } else {
      alert(
        data.error ??
          "Something went wrong"
      );
    }
  } catch (error) {
    console.error(error);

    alert(
      "Failed to delete account"
    );
  }
};

  return (



    <main className="min-h-screen p-8">

      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-3 text-slate-400">
          Manage your account preferences and platform settings.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">

        {/* PROFILE */}

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Profile Settings
          </h2>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-slate-400">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-slate-400">
                Email
              </label>

              <input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={saveProfile}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Save Changes
            </button>

          </div>

        </div>

        {/* PREFERENCES */}

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Preferences
          </h2>

          <div className="space-y-6">

            <div>
              <label className="mb-2 block text-slate-400">
                Theme
              </label>

              <select
                value={theme}
                onChange={(e) =>
                  setTheme(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
              >
                <option value="dark">
                  Dark
                </option>

                <option value="light">
                  Light
                </option>

                <option value="system">
                  System
                </option>

              </select>
            </div>

            <div className="rounded-2xl border border-slate-700 p-5">

              <h3 className="font-semibold text-white">
                Notifications
              </h3>

              <p className="mt-2 text-slate-400">
                Receive interview reminders and career insights.
              </p>

              <div className="mt-4 flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() =>
                    setNotifications(
                      !notifications
                    )
                  }
                />

                <span className="text-slate-300">
                  Enable Notifications
                </span>

              </div>

            </div>

            <button
              onClick={savePreferences}
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Update Preferences
            </button>

          </div>

        </div>

      </div>

      {/* SECURITY */}

      <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-900 p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Security
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          {/* PASSWORD */}

          <div className="rounded-2xl bg-slate-950 p-6">

            <h3 className="font-bold text-white">
              Password
            </h3>

            <p className="mt-2 text-slate-400">
              Update your password regularly.
            </p>

            <button
              onClick={() =>
                setShowPasswordModal(true)
              }
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Change Password
            </button>

          </div>

          {/* 2FA */}

          <div className="rounded-2xl bg-slate-950 p-6">

            <h3 className="font-bold text-white">
              Two Factor Auth
            </h3>

            <p className="mt-2 text-slate-400">
              Improve account security.
            </p>

            <button
              onClick={enable2FA}
              className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Enable
            </button>

          </div>

          {/* DELETE */}

          <div className="rounded-2xl bg-slate-950 p-6">

            <h3 className="font-bold text-white">
              Delete Account
            </h3>

            <p className="mt-2 text-slate-400">
              Permanently remove your account.
            </p>

            <button
              onClick={deleteAccount}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Delete
            </button>

          </div>

        </div>

      </div>


      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6">

            <h2 className="mb-6 text-2xl font-bold text-white">
              Change Password
            </h2>

            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
            />

            <div className="mt-6 flex gap-4">

              <button
                onClick={async () => {
                  try {
                    const res = await fetch(
                      "/api/settings/change-password",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type":
                            "application/json",
                        },
                        body: JSON.stringify({
                          currentPassword,
                          newPassword,
                        }),
                      }
                    );

                    const data =
                      await res.json();

                    if (data.success) {
                      alert(
                        "✅ Password Changed Successfully"
                      );

                      setShowPasswordModal(false);

                      setCurrentPassword("");
                      setNewPassword("");
                    } else {
                      alert(
                        data.error ||
                        "Password update failed"
                      );
                    }
                  } catch {
                    alert(
                      "Server Error"
                    );
                  }
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Update Password
              </button>

              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setCurrentPassword("");
                  setNewPassword("");
                }}
                className="rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-slate-600"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}


    </main>
  );
}