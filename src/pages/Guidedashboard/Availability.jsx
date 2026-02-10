import React, { useState } from "react";
import ToggleSwitch from "../../components/Guidedashboard/ToggleSwitch";
import AvailabilityCalendar from "../../components/Guidedashboard/AvailabilityCalendar";
import BlockDateModal from "../../components/Guidedashboard/BlockDateModal";

const Availability = () => {
  const [blockedDates, setBlockedDates] = useState([
    { id: 1, range: "Dec 24 - Dec 26, 2025", description: "Christmas Holiday" },
    { id: 2, range: "Jan 1, 2026", description: "New Year’s Day" },
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleAddBlockedDate = ({ start, end, reason }) => {
    setBlockedDates((prev) => [
      ...prev,
      {
        id: Date.now(),
        range: start === end ? start : `${start} - ${end}`,
        description: reason,
      },
    ]);
  };

  const removeBlockedDate = (id) => {
    setBlockedDates(blockedDates.filter((d) => d.id !== id));
  };

  const [autoAccept, setAutoAccept] = useState(false);
  const [instantBooking, setInstantBooking] = useState(true);
  const [weekendsOnly, setWeekendsOnly] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">Availability</h1>
      <p className="text-gray-500 mt-1">
        Manage your schedule and availability for tours
      </p>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6 mt-6">
        <AvailabilityCalendar />

        {/* Quick Settings */}
        <div className="border border-gray-300 rounded-xl bg-white p-6">
          <h2 className="font-semibold text-lg mb-4">Quick Settings</h2>

          <div className="flex justify-between items-center py-3">
            <span className="text-sm font-medium">Auto-accept bookings</span>
            <ToggleSwitch checked={autoAccept} onChange={setAutoAccept} />
          </div>

          <div className="flex justify-between items-center py-3">
            <span className="text-sm font-medium">Instant booking</span>
            <ToggleSwitch
              checked={instantBooking}
              onChange={setInstantBooking}
            />
          </div>

          <div className="flex justify-between items-center py-3">
            <span className="text-sm font-medium">Weekends only</span>
            <ToggleSwitch checked={weekendsOnly} onChange={setWeekendsOnly} />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full mt-6 bg-[#0faf94] text-white py-2 rounded-lg hover:bg-emerald-700 font-semibold"
          >
            Block Date
          </button>
        </div>
      </div>

      {/* Blocked Dates List */}
      <div className="mt-10">
        <h2 className="font-semibold text-lg">Blocked Dates</h2>

        <div className="space-y-3 mt-4">
          {blockedDates.map((d) => (
            <div
              key={d.id}
              className="flex justify-between items-center border border-gray-300 rounded-xl bg-white p-4"
            >
              <div>
                <p className="font-semibold">{d.range}</p>
                <p className="text-gray-500 text-sm">{d.description}</p>
              </div>
              <button
                onClick={() => removeBlockedDate(d.id)}
                className="text-red-600 bg-red-100 border border-red-300 px-3 py-1 rounded-md text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Block Date Modal */}
      {showModal && (
        <BlockDateModal
          setShowModal={setShowModal}
          handleAddBlockedDate={handleAddBlockedDate}
        />
      )}
    </div>
  );
};

export default Availability;
