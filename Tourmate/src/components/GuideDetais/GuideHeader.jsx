import React from "react";

const GuideHeader = () => {
  return (
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad"
        alt="Barcelona"
        className="w-full h-64 object-cover rounded-b-xl"
      />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-11/12 md:w-4/5 flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6 items-start">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Guide"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Maria Santos</h2>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                Verified
              </span>
            </div>
            <p className="text-gray-600">📍 Barcelona, Spain</p>
            <p className="text-yellow-500 font-medium text-sm">
              ★ 4.9 (4 reviews)
            </p>
            <p className="text-gray-500 text-sm">Responds in 1 hour</p>
            <p className="text-gray-400 text-xs mt-1">
              Member since 2019 • 340 tours completed
            </p>
          </div>
        </div>

        {/* Booking Card */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-80">
          <p className="text-3xl font-bold text-blue-600">$45</p>
          <p className="text-gray-500 text-sm mb-4">per hour</p>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Select Date</label>
              <select className="w-full border rounded-lg mt-1 p-2 text-sm">
                <option>Choose a date</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Duration (hours)</label>
              <select className="w-full border rounded-lg mt-1 p-2 text-sm">
                <option>3 hours</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Group Size</label>
              <select className="w-full border rounded-lg mt-1 p-2 text-sm">
                <option>2 people</option>
              </select>
            </div>
          </div>

          <div className="border-t mt-4 pt-3 text-sm text-gray-700">
            <p>$45 × 3h × 2 people = $270</p>
            <p className="font-semibold text-right mt-1">Total $270</p>
          </div>

          <button className="bg-blue-600 text-white w-full mt-4 py-2 rounded-lg hover:bg-blue-700">
            Book Now
          </button>
          <button className="border w-full py-2 mt-2 rounded-lg text-blue-600 border-blue-600 hover:bg-blue-50">
            💬 Message Maria Santos
          </button>

          <div className="text-xs text-gray-500 text-center mt-3">
            ✅ Verified guide • 24/7 support
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideHeader;
