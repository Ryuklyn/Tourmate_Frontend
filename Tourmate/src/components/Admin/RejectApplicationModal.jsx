import { useState } from "react";
import { X } from "lucide-react";

export default function RejectApplicationModal({ onClose, onReject }) {
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900">
          Reject Application
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Please provide a reason for rejecting the application.
        </p>

        {/* Textarea */}
        <textarea
          rows={5}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter rejection reason..."
          className="mt-4 w-full rounded-xl border border-orange-400 focus:ring-2 focus:ring-orange-400 focus:outline-none p-3 resize-none"
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onReject(reason)}
            disabled={!reason.trim()}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          >
            Reject Application
          </button>
        </div>
      </div>
    </div>
  );
}