import React, { useState, useEffect } from "react";
import { Calendar, Users, Clock, Heart, ShieldCheck, X } from "lucide-react";
import { toggleFavouriteGuide } from "../../../services/guideData";
import { bookGuide, bookTour } from "../../../services/booking";

export default function BookingSidebar({ guide, selectedTour, clearSelectedTour }) {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [hours, setHours] = useState(1);
  const [groupSize, setGroupSize] = useState(1);
  const [favourite, setFavourite] = useState(false);
  const handleGroupSizeChange = (e) => {
    const value = Number(e.target.value);
    const max = selectedTour?.maxGuests || 1;
    setGroupSize(Math.min(Math.max(value || 1, 1), max));
  };
  // Initialize favourite state from guide prop
  useEffect(() => {
    setFavourite(guide?.favorited ?? false);
  }, [guide]);
  useEffect(() => {
    if (selectedTour) {
      setGroupSize(1);
    }
    console.log(selectedTour);
  }, [selectedTour]);


  const handleToggleFavourite = async () => {
    const res = await toggleFavouriteGuide(guide.guideId);
    if (res.success) {
      setFavourite(prev => !prev); // toggle locally
    }
    console.log(selectedTour);

  };

  const total = selectedTour ? selectedTour.price * groupSize : 0;
  const handleBookNow = async () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    const res = await bookTour({
    guideId: guide.guideId,
    tourId: selectedTour.id,
    travellers: groupSize,
    startDate: date,


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
        <h2 className="text-3xl font-bold text-blue-600 mb-1">${selectedTour?.price || 0}</h2>
        <p className="text-gray-500 mb-6">per hour</p>
      </div>

      {/* Date */}
      <label className="text-sm font-medium flex items-center gap-2">
        <Calendar size={16} /> Select Date
      </label>
      <input
        type="date"
        className="w-full mt-1 p-2 border rounded-md"
        disabled={!selectedTour}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />


      {/* Group Size */}
      <label className="text-sm font-medium mt-4 flex items-center gap-2">
        <Users size={16} /> Group Size (Max {selectedTour?.maxGuests} Guests)
      </label>

      <input
        type="number"
        min={1}
        max={selectedTour?.maxGuests || 1}
        disabled={!selectedTour}
        className={`w-full mt-1 p-2 border rounded-md ${!selectedTour ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          value={selectedTour ? groupSize : ""}
        onChange={handleGroupSizeChange}
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
          <p className="text-gray-700">{selectedTour.name}</p>
          <p className="text-xs text-gray-500">
            {/* {selectedTour.hours} • {selectedTour.price} */}
          </p>
        </div>
      )}

      {/* If not selectedTour */}
      {!selectedTour && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 text-center">
          Select a tour to see pricing and book
        </div>
      )}


      <hr className="border-gray-300 my-5" />

      {/* Price Summary */}
      {selectedTour && (
        <>
          <hr className="border-gray-300 my-5" />

          <div className="text-gray-700 text-sm">
            <p>
              ${selectedTour.price} × {groupSize} people
              <span className="float-right">${total}</span>
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-2 mb-4">
            Total <span className="float-right text-blue-600">${total}</span>
          </h3>
        </>
      )}

      {/* Buttons */}
      {/* <button className="w-full py-3 bg-linear-to-r from-blue-400 to-blue-600 text-white rounded-lg font-semibold">
        Book Now
      </button> */}
      <button
        disabled={!selectedTour}
        className={`w-full py-3 rounded-lg font-semibold transition
          ${selectedTour
            ? "bg-linear-to-r from-blue-400 to-blue-600 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
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
