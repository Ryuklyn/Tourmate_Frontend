import React, { useState } from "react";
import { Calendar, Users, Clock, Heart, ShieldCheck, X } from "lucide-react";

export default function BookingSidebar({ selectedTour, clearSelectedTour }) {
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(3);
  const [groupSize, setGroupSize] = useState(2);

  // const total = 45 * hours * groupSize;
  const total = selectedTour ? selectedTour.price * groupSize : 0;
  console.log("BookingSidebar - selectedTour:", selectedTour);
  console.log("BookingSidebar - total:", total);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
      {/* Price Top */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-1">$45</h2>
        <p className="text-gray-500 mb-6">per hour</p>
      </div>

      {/* Date */}
      <label className="text-sm font-medium flex items-center gap-2">
        <Calendar size={16} /> Select Date
      </label>
      <input
        type="date"
        className="w-full mt-1 p-2 border rounded-md"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Group Size */}
      <label className="text-sm font-medium mt-4 flex items-center gap-2">
        <Users size={16} /> Group Size
      </label>

      <input
        type="number"
        min="1"
        max="50"
        className="w-full mt-1 p-2 border rounded-md"
        value={groupSize}
        onChange={(e) => setGroupSize(Number(e.target.value))}
      />
      {/* ✅ SELECTED TRIP */}
      {selectedTour && (
        <div className="relative mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          {/* ❌ Cancel */}
          <button
            onClick={clearSelectedTour}
            className="absolute top-2 right-2 text-blue-600 hover:text-red-500 transition"
            title="Cancel selected trip"
          >
            <X size={16} />
          </button>

          <p className="font-medium text-blue-700">Selected Trip</p>
          <p className="text-gray-700">{selectedTour.title}</p>
          <p className="text-xs text-gray-500">
            {selectedTour.hours} • {selectedTour.price}
          </p>
        </div>
      )}

      {/* Divider Line */}
      <hr className="border-gray-300 my-5" />

      {/* Price Summary */}
      {selectedTour && (
        <div className="text-gray-700 text-sm">
          <p>
            ${selectedTour.price} × {groupSize} people
            <span className="float-right font-semibold">${total}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Duration: {selectedTour.hours} hours
          </p>
        </div>
      )}

      <h3 className="text-xl font-semibold mt-2 mb-4">
        Total <span className="float-right text-blue-600">${total}</span>
      </h3>

      {/* Buttons */}
      <button
        disabled={!selectedTour}
        className={`w-full py-3 rounded-lg font-semibold transition
          ${
            selectedTour
              ? "bg-linear-to-r from-blue-400 to-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        Book Now
      </button>

      <button className="w-full py-3 bg-gray-100 rounded-lg mt-3 flex items-center justify-center gap-2">
        <Heart size={18} /> Save Tour
      </button>

      {/* Verified Footer */}
      <div className="text-xs text-gray-500 mt-4 flex items-center gap-2">
        <ShieldCheck size={15} className="text-green-600" /> Verified guide •
        24/7 support
      </div>
    </div>
  );
}
