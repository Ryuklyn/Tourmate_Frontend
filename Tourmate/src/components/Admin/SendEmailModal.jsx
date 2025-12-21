import { X, Mail } from "lucide-react";

export default function SendEmailModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[450px] rounded-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>

        <h2 className="text-lg font-semibold">Send Email</h2>
        <p className="text-sm text-gray-500 mb-4">
          Send an email to {user.name}
        </p>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block mb-1">To</label>
            <input
              disabled
              value={user.email}
              className="w-full border border-gray-400 text-gray-600 rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1">Subject</label>
            <input
              placeholder="Enter email subject"
              className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-1">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message here..."
              className="w-full border border-gray-400 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-xl"
          >
            Cancel
          </button>

          <button className="px-4 py-2 bg-orange-400 text-white rounded-xl flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}
