import React, { useState, useEffect } from "react";
import { Calendar, Users, Clock, Heart, ShieldCheck } from "lucide-react";
import { toggleFavouriteGuide } from "../../../services/guideData";
import { bookGuide } from "../../../services/booking";

export default function BookingSidebar({ guide, onToggleFavourite }) {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);  const [hours, setHours] = useState(1);
  const [groupSize, setGroupSize] = useState(1);
  const [favourite, setFavourite] = useState(false);

  // Initialize favourite state from guide prop
  useEffect(() => {
    setFavourite(guide?.favorited ?? false);
  }, [guide]);

  const handleToggleFavourite = async () => {
    const res = await toggleFavouriteGuide(guide.guideId);
    if (res.success) {
      setFavourite(prev => !prev); // toggle locally
      if (onToggleFavourite) onToggleFavourite(guide.guideId);
    }
  };

  const total = guide.price * hours * groupSize;
  const handleBookNow = async () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    const res = await bookGuide({
      guideId: guide.guideId,
      hours,
      groupSize,
    });

    if (res.success) {
      alert("Booking request sent successfully!");
    } else {
      alert(res.error);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
      {/* Price Top */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-1">${guide.price}</h2>
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

      <hr className="border-gray-300 my-5" />

      {/* Price Summary */}
      <div className="text-gray-700 text-sm">
        <p>
          ${guide.price} × {hours}h × {groupSize} people
          <span className="float-right">${total}</span>
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-2 mb-4">
        Total <span className="float-right text-blue-600">${total}</span>
      </h3>

      {/* Buttons */}
      <button
        className="w-full py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg font-semibold"
        onClick={handleBookNow}
      >
        Book Now
      </button>

      <button
        className="w-full py-3 bg-gray-100 rounded-lg mt-3 flex items-center justify-center gap-2"
        onClick={handleToggleFavourite}
      >
        <Heart size={18} className={favourite ? "text-red-500 fill-red-500" : ""} />
        {favourite ? "Saved" : "Save Guide"}
      </button>

      <div className="text-xs text-gray-500 mt-4 flex items-center gap-2">
        <ShieldCheck size={15} className="text-green-600" /> Verified guide •
        24/7 support
      </div>
    </div>
  );
}
