import React, { useState } from "react";
import { Search, MapPin, Clock, Users } from "lucide-react";

const bookingsData = [
  {
    id: 1,
    title: "Historic Downtown Walking Tour",
    guide: "Sarah Johnson",
    date: "Dec 15, 2025 at 10:00 AM",
    duration: "3 hours",
    guests: 4,
    status: "confirmed",
  },
  {
    id: 2,
    title: "Food & Culture Experience",
    guide: "Michael Chen",
    date: "Dec 16, 2025 at 2:00 PM",
    duration: "4 hours",
    guests: 2,
    status: "confirmed",
  },
  {
    id: 3,
    title: "Sunset Harbor Cruise",
    guide: "Emma Wilson",
    date: "Dec 17, 2025 at 6:00 PM",
    duration: "2 hours",
    guests: 6,
    status: "pending",
  },
  {
    id: 4,
    title: "Mountain Hiking Adventure",
    guide: "David Martinez",
    date: "Dec 18, 2025 at 8:00 AM",
    duration: "6 hours",
    guests: 3,
    status: "confirmed",
  },
];

const GuideBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
      <p className="text-gray-500 mt-1">
        Manage your tour bookings and schedule
      </p>

      {/* Search Bar */}
      <div className="mt-5 relative max-w-full">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search bookings by tourist name or tour..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Tabs */}
      {/* <div className="flex mt-6 space-x-4 pb-2">
        {[
          { key: "upcoming", label: "Upcoming (4)" },
          { key: "past", label: "Past Tours (2)" },
          { key: "cancelled", label: "Cancelled (0)" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-2 pb-2 text-sm font-medium ${
              activeTab === tab.key
                ? "text-white bg-[#0faf94] rounded-full"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div> */}

      <div className="w-full flex justify-left mt-6">
        <div className="bg-gray-200 px-2 py-2 rounded-lg flex space-x-4 pb-2">
          {[
            { key: "upcoming", label: "Upcoming (4)" },
            { key: "past", label: "Past Tours (2)" },
            { key: "cancelled", label: "Cancelled (0)" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 text-sm font-medium transition ${
                activeTab === tab.key
                  ? "text-white bg-[#0faf94] rounded-full shadow-sm"
                  : "text-black hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Booking List */}
      <div className="mt-4 space-y-4">
        {bookingsData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white border border-gray-300 shadow-sm rounded-xl p-5 hover:shadow-md transition"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h2>

              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  item.status === "confirmed"
                    ? "bg-green-100 text-[#0faf94]"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.status}
              </span>

              <div className="flex items-center gap-6 text-sm text-gray-500 mt-2">
                <p className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> {item.guests} guests
                </p>
                <p className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {item.date}
                </p>
                <p className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {item.duration}
                </p>
              </div>

              <p className="text-sm text-gray-700 mt-1">👤 {item.guide}</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border-2 border-[#0faf94] rounded-lg text-gray-600 hover:bg-gray-100">
                View Details
              </button>
              <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideBookings;
