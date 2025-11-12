import React from "react";

export default function Navbar({ name }) {
  return (
    <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm">
      {/* <div>
        <h1 className="text-2xl font-bold">Welcome back, {name}! 👋</h1>
        <p className="text-gray-500 text-sm">
          Ready for your next adventure? Here's what's happening with your
          travels.
        </p>
      </div> */}

      <div className="flex items-center gap-3">
        <button className="bg-blue-100 text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-200">
          Traveler
        </button>
        <button className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
          Guide
        </button>
        <img
          src="https://api.dicebear.com/7.x/personas/svg?seed=John"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </div>
  );
}
