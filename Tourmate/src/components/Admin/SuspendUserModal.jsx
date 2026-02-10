import { useState } from "react";
import { suspendGuide, suspendTraveller } from "../../services/admin/UserManagement";

export default function SuspendUserModal({ user, onClose, type, onSuccess }) {
  if (!user) return null;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isSuspended =
    type === "guides"
      ? user.status === "SUSPENDED"
      : user.suspended === true;

  const handleToggle = async () => {
    setError(null);
    setLoading(true);

    const res =
      type === "guides"
        ? await suspendGuide(user.guideId)
        : await suspendTraveller(user.userId);

    setLoading(false);

    if (res.success) {
      onSuccess?.();
      onClose();
    } else {
      // Prefer backend message if available
      setError(
        typeof res.error === "string"
          ? res.error
          : "Action failed. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-2">
          {isSuspended ? "Unsuspend User" : "Suspend User"}
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to{" "}
          <span className="font-semibold">
            {isSuspended ? "unsuspend" : "suspend"}
          </span>{" "}
          <span className="font-semibold">
            {user.fullName || `${user.firstName} ${user.lastName}`}
          </span>
          ?
        </p>

        {/* 🔴 Error block */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleToggle}
            disabled={loading}
            className={`px-4 py-2 rounded-xl text-white ${
              isSuspended
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            } disabled:opacity-50`}
          >
            {loading
              ? "Processing..."
              : isSuspended
                ? "Unsuspend"
                : "Suspend"}
          </button>
        </div>
      </div>
    </div>
  );
}