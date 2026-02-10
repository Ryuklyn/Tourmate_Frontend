// =====================================================
// src/CommissionSettingsModal.jsx
// =====================================================
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CommissionSettingsModal({ rate, setRate, onClose }) {
  const navigate = useNavigate();

  const handleSave = () => {
    // Here you would typically save the commission rate to the server
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="mb-4 flex justify-between">
          <h2 className="text-lg font-semibold">Commission Settings</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <label className="mb-1 block text-sm">Commission Rate (%)</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="mb-3 w-full rounded-lg border border-gray-200 px-3 py-2"
        />

        <p className="mb-4 text-sm text-gray-500">
          This percentage will be deducted from guide withdrawal requests.
        </p>

        <div className="rounded-lg bg-gray-50 p-3 text-sm">
          <p>Guide requests: ₹1,000</p>
          <p className="text-red-500">
            Commission ({rate}%): -₹{(rate * 1000) / 100}
          </p>
          <p className="font-semibold text-green-600">
            Guide receives: ₹{1000 - (rate * 1000) / 100}
          </p>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-orange-500 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
