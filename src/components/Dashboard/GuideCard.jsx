import React from "react";
import { MapPin } from "lucide-react";

const GuideCard = ({ guide }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={guide.image}
        alt={guide.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h4 className="font-bold text-lg text-gray-900">{guide.name}</h4>
        <p className="text-sm text-gray-600 flex items-center mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          {guide.location}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Languages: {guide.languages}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="font-semibold text-gray-900">{guide.rating}</span>
            <span className="text-gray-500 text-sm ml-1">
              ({guide.reviews})
            </span>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
