import React, { useState } from "react";
import { Star } from "lucide-react";

const FilterSidebarTour = () => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  return (
    <div className="w-64 bg-white rounded-2xl shadow-md p-5 h-fit">
      <h3 className="font-semibold text-lg mb-4 text-gray-800">Filters</h3>

      {/* Location */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          placeholder="Enter city or country"
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Range
        </label>
        <input
          type="range"
          min="0"
          max="200"
          className="w-full accent-blue-500"
        />
        <p className="text-sm text-gray-500 mt-1">$0 - $200/hour</p>
      </div>

      {/* Rating Filter */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Rating
        </label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Star
              key={rating}
              size={22}
              className={`cursor-pointer transition-colors duration-200 ${
                rating <= selectedRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => handleStarClick(rating)}
            />
          ))}
        </div>
        {selectedRating > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            {selectedRating} star{selectedRating > 1 ? "s" : ""} & up
          </p>
        )}
      </div>

      {/* Languages */}
      {/* <div className="mb-5">
        <h4 className="font-medium mb-2 text-gray-800">Languages</h4>
        {["English", "Spanish", "French", "German", "Italian", "Japanese"].map(
          (lang) => (
            <label key={lang} className="flex items-center space-x-2 mb-1">
              <input type="checkbox" className="accent-blue-500" />
              <span className="text-sm text-gray-700">{lang}</span>
            </label>
          )
        )}
      </div> */}

      {/* Tour Types */}
      <div className="mb-5">
        <h4 className="font-medium mb-2 text-gray-800">Tour Types</h4>
        {[
          "Cultural Experience",
          "City Tour",
          "Adventure",
          "Food Tours",
          "History",
          "Art",
          "Photography",
        ].map((type) => (
          <label key={type} className="flex items-center space-x-2 mb-1">
            <input type="checkbox" className="accent-blue-500" />
            <span className="text-sm text-gray-700">{type}</span>
          </label>
        ))}
      </div>

      {/* Clear Filters */}
      <button className="mt-4 text-sm text-blue-600 hover:underline">
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebarTour;
