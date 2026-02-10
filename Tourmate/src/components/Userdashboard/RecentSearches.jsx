import React from "react";
import { Clock } from "lucide-react";

export default function RecentSearches() {
  const searches = [
    "Paris",
    "Bali",
    "Iceland",
    "Peru",
    "Thailand",
    "Singapore",
    "Japan",
  ];

  return (
    <div className="mt-10">
      {/* Heading */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-600" />
        Recent Searches
      </h2>

      {/* Card Container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {searches.map((place, i) => (
          <div
            key={i}
            className="bg-white shadow-sm border border-gray-200 rounded-xl px-4 py-3 
                       flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <span className="text-gray-700 font-medium">{place}</span>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
