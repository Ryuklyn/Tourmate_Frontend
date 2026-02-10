// src/components/Settings/Security.jsx

import React, { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";

export default function Security() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <div className="bg-white rounded-xl shadow-sm mt-6 p-8 border border-gray-300">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Lock className="text-[#0faf94] w-6 h-6" />
        <h2 className="text-xl font-semibold">Change Password</h2>
      </div>

      {/* Change Password Form */}
      <div className="space-y-5">
        {/* Current Password */}
        <div>
          <p className="font-medium mb-1">Current Password</p>
          <input
            type="password"
            className="w-full border border-gray-400 rounded-lg px-4 py-2 bg-white"
            value={form.currentPassword}
            onChange={(e) =>
              setForm({ ...form, currentPassword: e.target.value })
            }
          />
        </div>

        {/* New Password */}
        <div>
          <p className="font-medium mb-1">New Password</p>
          <input
            type="password"
            className="w-full border border-gray-400 rounded-lg px-4 py-2 bg-white"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <p className="font-medium mb-1">Confirm New Password</p>
          <input
            type="password"
            className="w-full border border-gray-400 rounded-lg px-4 py-2 bg-white"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        </div>
      </div>

      {/* Update Button */}
      <button className="mt-5 bg-[#0faf94] text-white py-2 px-5 rounded-lg hover:bg-[#0e8c7f] shadow-sm">
        Update Password
      </button>

      {/* Two Factor Authentication */}
      <div className="mt-10 border-t border-gray-400 pt-8">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="text-[#0faf94] w-6 h-6" />
          <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
        </div>

        <p className="text-gray-600 mb-4">
          Add an extra layer of security to your account by enabling two-factor
          authentication
        </p>

        <button className="border-[#0faf94] border-2 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-500">
          Enable 2FA
        </button>
      </div>
    </div>
  );
}
