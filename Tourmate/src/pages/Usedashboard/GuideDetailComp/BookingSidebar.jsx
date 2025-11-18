import React, { useState } from "react";
import { Calendar, Users, Clock, Heart, ShieldCheck } from "lucide-react";

export default function BookingSidebar() {
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(3);
  const [groupSize, setGroupSize] = useState(2);

  const total = 45 * hours * groupSize;

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

      {/* Duration */}
      <label className="text-sm font-medium mt-4 flex items-center gap-2">
        <Clock size={16} /> Duration (hours)
      </label>
      <select
        className="w-full mt-1 p-2 border rounded-md"
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
      >
        <option value={1}>1 hour</option>
        <option value={2}>2 hours</option>
        <option value={3}>3 hours</option>
        <option value={4}>4 hours</option>
      </select>

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

      {/* Divider Line */}
      <hr className="border-gray-300 my-5" />

      {/* Price Summary */}
      <div className="text-gray-700 text-sm">
        <p>
          $45 × {hours}h × {groupSize} people
          <span className="float-right">${total}</span>
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-2 mb-4">
        Total <span className="float-right text-blue-600">${total}</span>
      </h3>

      {/* Buttons */}
      <button className="w-full py-3 bg-linear-to-r from-blue-400 to-blue-600 text-white rounded-lg font-semibold">
        Book Now
      </button>

      <button className="w-full py-3 bg-gray-100 rounded-lg mt-3 flex items-center justify-center gap-2">
        <Heart size={18} /> Save Guide
      </button>

      {/* Verified Footer */}
      <div className="text-xs text-gray-500 mt-4 flex items-center gap-2">
        <ShieldCheck size={15} className="text-green-600" /> Verified guide •
        24/7 support
      </div>
    </div>
  );
}
