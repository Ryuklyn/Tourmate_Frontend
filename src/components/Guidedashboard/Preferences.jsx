// src/components/Settings/Preferences.jsx

import React, { useState } from "react";
import { Globe, Trash2 } from "lucide-react";

export default function Preferences() {
  const [prefs, setPrefs] = useState({
    language: "English (US)",
    timezone: "Eastern Time (ET)",
    currency: "USD ($)",
  });

  return (
    <div className="mt-6 space-y-8">
      {/* Regional Settings */}
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-300">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="text-[#0faf94] w-6 h-6" />
          <h2 className="text-xl font-semibold">Regional Settings</h2>
        </div>

        {/* Language */}
        <div>
          <p className="font-semibold mb-1">Language</p>
          <select
            className="w-full border border-gray-400 rounded-lg px-4 py-2 bg-white"
            value={prefs.language}
            onChange={(e) => setPrefs({ ...prefs, language: e.target.value })}
          >
            <option>English (US)</option>
            <option>English (UK)</option>
            <option>Nepali</option>
          </select>
        </div>

        {/* Timezone */}
        <div className="mt-5">
          <p className="font-semibold mb-1">Timezone</p>
          <select
            className="w-full border border-gray-400 rounded-lg px-4 py-2 bg-white"
            value={prefs.timezone}
            onChange={(e) => setPrefs({ ...prefs, timezone: e.target.value })}
          >
            <option>Eastern Time (ET)</option>
            <option>Central Time (CT)</option>
            <option>Pacific Time (PT)</option>
          </select>
        </div>

        {/* Currency */}
        <div className="mt-5">
          <p className="font-semibold mb-1">Currency</p>
          <select
            className="w-full border border-gray-400 rounded-lg px-4 py-2 bg-white"
            value={prefs.currency}
            onChange={(e) => setPrefs({ ...prefs, currency: e.target.value })}
          >
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>NPR (Rs)</option>
          </select>
        </div>
      </div>

      {/* Account Management */}
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-300">
        <h2 className="text-xl font-semibold mb-6">Account Management</h2>

        {/* Deactivate */}
        <div className="flex justify-between items-center border-b border-gray-400 pb-5 mb-5">
          <div>
            <p className="font-semibold">Deactivate Account</p>
            <p className="text-gray-600 text-sm">
              Temporarily disable your guide account
            </p>
          </div>
          <button className="border-2 border-[#0faf94] px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-500">
            Deactivate
          </button>
        </div>

        {/* Delete Account */}
        <div className="flex justify-between items-center bg-red-50 border border-red-300 p-4 rounded-xl">
          <div>
            <p className="font-semibold text-red-700 flex items-center gap-1">
              <Trash2 className="w-4 h-4" /> Delete Account
            </p>
            <p className="text-red-600 text-sm">
              Permanently delete your account and all data
            </p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
