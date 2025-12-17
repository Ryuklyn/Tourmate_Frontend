import { X } from "lucide-react";

export default function ViewMessage({ message, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-[500px] p-6 relative shadow-xl">
        {/* Close Button */}
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
        >
          <X size={16} />
        </button> */}
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
        <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
          <img
            src={message.avatar}
            alt={message.name}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex-1">
            <div className="font-medium text-gray-900">{message.name}</div>
            <div className="text-sm text-gray-500">{message.email}</div>
          </div>

          <span className="px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-700">
            {message.userType}
          </span>

          <div className="text-sm text-gray-500 whitespace-nowrap">
            {message.date}
          </div>
        </div>

        {/* Message Content */}
        <div className="mt-6 bg-gray-50 rounded-xl p-5 text-gray-700 leading-relaxed text-sm">
          {message.message}
        </div>
      </div>
    </div>
  );
}
