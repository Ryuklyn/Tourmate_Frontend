import React, { useState } from "react";
import { Lock } from "lucide-react";
import { toast } from "react-toastify";
import { changePassword } from "../../services/user";
import { doLogout } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function Security() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const { currentPassword, newPassword, confirmPassword } = form;
  
    // ✅ Only validate new password fields
    if (!newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
  
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
  
    // No need to check currentPassword in frontend
    // But still send it to backend
    try {
      const res = await changePassword({
        oldPassword: currentPassword, // can be empty for Google users
        newPassword,
      });
  
      if (res.success) {
        toast.success(res.message); // Password changed successfully
        setTimeout(() => doLogout(navigate), 3000);
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update password";
      toast.error(message);
      console.error("Error changing password:", message);
    }
  };
  
  

  return (
    <div className="bg-white rounded-xl shadow-sm mt-6 p-8 border border-gray-300">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="text-blue-600 w-6 h-6" />
        <h2 className="text-xl font-semibold">Change Password</h2>
      </div>

      <div className="space-y-5">
        <div>
          <p className="font-medium mb-1">Current Password</p>
          <input
            type="password"
            name="currentPassword"
            className="w-full border border-gray-400 rounded-lg px-4 py-2"
            value={form.currentPassword}
            onChange={handleChange}
          />
        </div>

        <div>
          <p className="font-medium mb-1">New Password</p>
          <input
            type="password"
            name="newPassword"
            className="w-full border border-gray-400 rounded-lg px-4 py-2"
            value={form.newPassword}
            onChange={handleChange}
          />
        </div>

        <div>
          <p className="font-medium mb-1">Confirm New Password</p>
          <input
            type="password"
            name="confirmPassword"
            className="w-full border border-gray-400 rounded-lg px-4 py-2"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-5 bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-[#0e8c7f] shadow-sm"
      >
        Update Password
      </button>
    </div>
  );
}
