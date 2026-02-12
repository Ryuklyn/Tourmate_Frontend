

import React, { useEffect, useState } from "react";
import { getToursByGuide } from "../../../services/guideData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export default function TourPackages({ guideId, selectedTour, setSelectedTour,activeTour, setActiveTour }) {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTours = async () => {
      const res = await getToursByGuide(guideId);
      if (res.success) setTours(res.data);
    };
    fetchTours();
  }, [guideId]);

  if (!tours.length) return <div className="mt-4 text-center">No tours found.</div>;

  // 🔹 CONFIRM selection
  const handleProceed = () => {
    if (!activeTour) {
      toast.warn("Please select a tour first");
      console.log("No tour selected");
      return;
    }

    setSelectedTour(activeTour);
    toast.success(`${activeTour.name} selected successfully`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Tour Packages</h2>
        <button
          onClick={handleProceed}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition
          ${
            activeTour
              ? "bg-linear-to-r from-blue-400 to-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {activeTour ? "Proceed →" : "Select Trip"}
        </button>
      </div>

      {/* INFO BAR */}
      {activeTour && (
        <div className="mb-4 text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg">
          ✓ Tour selected! Click <strong>Proceed</strong> to continue with your
          booking.
        </div>
      )}

      {/* TOUR CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tours.map((t) => {
          const isActive = activeTour?.id === t.id;
          const isSelected = selectedTour?.id === t.id;

          return (
            <div
              key={t.id}
              onClick={() => setActiveTour(t)}
              className={`relative rounded-xl overflow-hidden border cursor-pointer transition
                ${
                  isActive
                    ? "border-orange-500 ring-2 ring-orange-100"
                    : "border-gray-200 hover:shadow-md"
                }`}
            >
              {/* CHECK ICON (only after Proceed) */}
              {isSelected && (
                <div className="absolute top-3 right-3 bg-orange-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">
                  ✓
                </div>
              )}

              <img
                src={`data:image/*;base64,${t.tourPic}`}
                alt={t.name}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{t.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{t.duration}</p>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-blue-600 font-semibold">Rs. {t.price}</p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/dashboard/tourdetails/${t.id}`)
                    }}
                    className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-50"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ToastContainer position="bottom-right" autoClose={2500} />
    </div>
  );
}

