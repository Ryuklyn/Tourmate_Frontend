import { X } from "lucide-react";

export default function ViewMessage({ message, onClose }) {
  if (!message) return null;

  const user = message.user || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100"
        >
          <X size={16} className="text-gray-700" />
        </button>

        {/* Subject */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {message.subject}
        </h2>

        {/* User Info Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {user.profilePic ? (
              <img
                src={`data:image/jpeg;base64,${user.profilePic}`}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                {user.firstName?.[0] || "U"}
              </div>
            )}
            <div>
              <div className="font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>

          {/* Role & Date */}
          <div className="flex flex-col sm:items-end text-right text-sm text-gray-500 gap-1">
            <span className="px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-700 bg-white">
              {message.role}
            </span>
            <span>
              {new Date(message.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Message Content */}
        <div className="mt-6 bg-gray-50 rounded-xl p-5 text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
          {message.message}
        </div>
      </div>
    </div>
  );
}
