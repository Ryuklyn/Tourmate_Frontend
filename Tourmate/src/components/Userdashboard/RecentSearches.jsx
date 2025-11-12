import React from "react";

export default function RecentSearches() {
  const searches = ["Paris", "Bali", "Iceland", "Peru", "Thailand"];

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
        <span>📍</span> Recent Searches
      </h2>
      <div className="flex gap-2 flex-wrap">
        {searches.map((place, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
          >
            {place}
          </span>
        ))}
      </div>
    </div>
  );
}
