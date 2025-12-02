import React, { useState } from "react";
import { CalendarDays, Clock, Lock, X } from "lucide-react";
import Calendar from "react-calendar";
import AvailabilityCalendar from "../../components/Guidedashboard/AvailabilityCalendar";
import ToggleSwitch from "../../components/Guidedashboard/ToggleSwitch";

const timeSlotsData = [
  { time: "9:00 AM", status: "available" },
  { time: "10:00 AM", status: "available" },
  { time: "11:00 AM", status: "booked" },
  { time: "12:00 PM", status: "available" },
  { time: "1:00 PM", status: "booked" },
  { time: "2:00 PM", status: "available" },
  { time: "3:00 PM", status: "available" },
  { time: "4:00 PM", status: "available" },
  { time: "5:00 PM", status: "booked" },
  { time: "6:00 PM", status: "available" },
];

const Availability = () => {
  const [date, setDate] = useState(new Date());
  const [slots] = useState(timeSlotsData);
  const [blockedDates, setBlockedDates] = useState([
    { id: 1, range: "Dec 24-26, 2025", description: "Christmas Holiday" },
    { id: 2, range: "Jan 1, 2026", description: "New Year’s Day" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newBlock, setNewBlock] = useState({
    start: "",
    end: "",
    reason: "",
  });

  const handleAddBlockedDate = () => {
    if (!newBlock.start || !newBlock.end || !newBlock.reason) return;
    setBlockedDates([
      ...blockedDates,
      {
        id: Date.now(),
        range: `${newBlock.start} - ${newBlock.end}`,
        description: newBlock.reason,
      },
    ]);
    setNewBlock({ start: "", end: "", reason: "" });
    setShowModal(false);
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
      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6 mt-6 w-full">
        <AvailabilityCalendar />

        {/* Quick Settings */}
        <div className="border border-gray-300 rounded-xl bg-white p-6">
          {/* <h2 className="font-semibold text-lg mb-4">Quick Settings</h2>

          <div className="flex justify-between items-center py-2 text-gray-700">
            <span>Auto-accept bookings</span>
            <input type="checkbox" className="toggle-checkbox" />
          </div>

          <div className="flex justify-between items-center py-2 text-gray-700">
            <span>Instant booking</span>
            <input type="checkbox" defaultChecked className="toggle-checkbox" />
          </div>

          <div className="flex justify-between items-center py-2 text-gray-700">
            <span>Weekends only</span>
            <input type="checkbox" className="toggle-checkbox" />
          </div> */}
          <h2 className="font-semibold text-lg mb-4">Quick Settings</h2>

          <div className="flex justify-between items-center py-3 text-gray-700">
            <span className="text-sm font-medium">Auto-accept bookings</span>
            <ToggleSwitch checked={autoAccept} onChange={setAutoAccept} />
          </div>

          <div className="flex justify-between items-center py-3 text-gray-700">
            <span className="text-sm font-medium">Instant booking</span>
            <ToggleSwitch
              checked={instantBooking}
              onChange={setInstantBooking}
            />
          </div>

          <div className="flex justify-between items-center py-3 text-gray-700">
            <span className="text-sm font-medium">Weekends only</span>
            <ToggleSwitch checked={weekendsOnly} onChange={setWeekendsOnly} />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full mt-6 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 font-semibold"
          >
            Block Date Range
          </button>
        </div>
      </div>

      {/* Time Slots section */}
      <div className="mt-8">
        <h2 className="flex items-center gap-2 font-semibold text-lg">
          <Clock className="w-5 h-5 text-emerald-600" /> Available Time Slots
          for November 30, 2025
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {slots.map((slot, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border text-center cursor-pointer ${
                slot.status === "available"
                  ? "border-emerald-600 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                  : "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <p className="font-semibold">{slot.time}</p>
              <p className="text-xs">
                {slot.status === "available" ? "Available" : "Booked"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Blocked Dates */}
      <div className="mt-10">
        <h2 className="font-semibold text-lg">Blocked Dates</h2>

        <div className="space-y-3 mt-4">
          {blockedDates.map((d) => (
            <div
              key={d.id}
              className="flex justify-between items-center border rounded-xl bg-white p-4"
            >
              <div>
                <p className="font-semibold">{d.range}</p>
                <p className="text-gray-500 text-sm">{d.description}</p>
              </div>
              <button
                onClick={() => removeBlockedDate(d.id)}
                className="text-red-500 hover:bg-red-100 px-3 py-1 rounded-md text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Block Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Lock className="w-5 h-5" /> Block Date Range
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <label className="block font-medium mt-2">Start Date</label>
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

            <label className="block font-medium mt-3">Reason</label>
            <input
              type="text"
              placeholder="Christmas Holiday, Maintenance..."
              className="w-full border rounded-lg p-2 mt-1"
              value={newBlock.reason}
              onChange={(e) =>
                setNewBlock({ ...newBlock, reason: e.target.value })
              }
            />

            <button
              onClick={handleAddBlockedDate}
              className="w-full bg-emerald-600 text-white mt-5 py-2 rounded-lg font-semibold hover:bg-emerald-700"
            >
              Add Block
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Availability;
