import { Lock, X } from "lucide-react";
import { useState } from "react";

export default function BlockDateModal({ setShowModal, handleAddBlockedDate }) {
  const [selectionType, setSelectionType] = useState("range");

  const [newBlock, setNewBlock] = useState({
    start: "",
    end: "",
    date: "",
    reason: "",
  });

  const handleSubmit = () => {
    if (selectionType === "single") {
      handleAddBlockedDate({
        start: newBlock.date,
        end: newBlock.date,
        reason: newBlock.reason,
      });
    } else {
      handleAddBlockedDate({
        start: newBlock.start,
        end: newBlock.end,
        reason: newBlock.reason,
      });
    }
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Block Date
          </h2>
          <button onClick={() => setShowModal(false)}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Selection Type */}
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              checked={selectionType === "range"}
              onChange={() => setSelectionType("range")}
            />
            Date Range
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              checked={selectionType === "single"}
              onChange={() => setSelectionType("single")}
            />
            Single Date
          </label>
        </div>

        {/* Range Picker */}
        {selectionType === "range" && (
          <>
            <label className="block font-medium">Start Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2 mt-1"
              value={newBlock.start}
              onChange={(e) =>
                setNewBlock({ ...newBlock, start: e.target.value })
              }
            />

            <label className="block font-medium mt-3">End Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2 mt-1"
              value={newBlock.end}
              onChange={(e) =>
                setNewBlock({ ...newBlock, end: e.target.value })
              }
            />
          </>
        )}

        {/* Single Date Picker */}
        {selectionType === "single" && (
          <>
            <label className="block font-medium">Select Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2 mt-1"
              value={newBlock.date}
              onChange={(e) =>
                setNewBlock({ ...newBlock, date: e.target.value })
              }
            />
          </>
        )}

        {/* Reason */}
        <label className="block font-medium mt-3">Reason</label>
        <input
          type="text"
          placeholder="Holiday, Maintenance..."
          className="w-full border rounded-lg p-2 mt-1"
          value={newBlock.reason}
          onChange={(e) => setNewBlock({ ...newBlock, reason: e.target.value })}
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#0faf94] text-white mt-5 py-2 rounded-lg font-semibold hover:bg-emerald-700"
        >
          Add Block
        </button>
      </div>
    </div>
  );
}
