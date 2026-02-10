import React, { useState } from "react";
import Notifications from "../../components/Guidedashboard/Notifications";
import Security from "../../components/Guidedashboard/Security";
import Preferences from "../../components/Guidedashboard/Preferences";
import Payment from "../../components/Guidedashboard/Payment";

export default function SettingsPage() {
  const [tab, setTab] = useState("notifications");

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-2">Settings</h1>
      <p className="text-gray-600 mb-6">
        Manage your account settings and preferences
      </p>

      {/* Tabs Wrapper */}
      <div className="w-full flex justify-left mt-2">
        <div className="bg-gray-200 px-2 py-2 rounded-lg">
          <div className="flex gap-3 font-medium text-black">
            <button
              className={`px-4 py-2 rounded-md ${
                tab === "notifications"
                  ? "bg-[#0faf94] shadow-sm text-white"
                  : ""
              }`}
              onClick={() => setTab("notifications")}
            >
              Notifications
            </button>

            <button
              className={`px-4 py-2 rounded-md ${
                tab === "security" ? "bg-[#0faf94] shadow-sm text-white" : ""
              }`}
              onClick={() => setTab("security")}
            >
              Security
            </button>

            <button
              className={`px-4 py-2 rounded-md ${
                tab === "payment" ? "bg-[#0faf94] shadow-sm text-white" : ""
              }`}
              onClick={() => setTab("payment")}
            >
              Payment
            </button>

            <button
              className={`px-4 py-2 rounded-md ${
                tab === "preferences" ? "bg-[#0faf94] shadow-sm text-white" : ""
              }`}
              onClick={() => setTab("preferences")}
            >
              Preferences
            </button>
          </div>
        </div>
      </div>

      {/* Render Components */}
      {tab === "notifications" && <Notifications />}
      {tab === "security" && <Security />}
      {tab === "preferences" && <Preferences />}
      {tab === "payment" && <Payment />}
    </div>
  );
}
