import React from "react";
import Navbar from "../components/Dashboard/Navigation";
import FilterSidebar from "../components/FindGuide/FilterSidebar";
import GuideList from "../components/FindGuide/GuideList";
import Chatbot from "../components/FindGuide/Chatbot";

const FindGuidePage = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Title */}
        <p className="text-2xl font-bold mb-6 text-gray-900">
          Find Your Perfect Guide
        </p>

        {/* Search & Sort Bar */}
        <div className="flex items-center justify-between py-3 mb-6">
          <input
            type="text"
            placeholder="Search by location, guide name, or specialty..."
            className="flex-1 border border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mr-4"
          />
          <select className="border border-gray-200 px-3 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>Sort by Rating</option>
            <option>Sort by Price</option>
          </select>
        </div>

        {/* Main content */}
        <div className="flex gap-6">
          <FilterSidebar />
          <div className="flex-1">
            <GuideList />

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-10">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md bg-blue-600 text-white font-medium">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">
                3
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

export default FindGuidePage;
