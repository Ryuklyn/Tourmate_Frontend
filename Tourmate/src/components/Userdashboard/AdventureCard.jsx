import React from "react";

export default function AdventureCard({ title, guide, date, image }) {
  
  return (
    <div className="bg-white rounded-xl shadow-sm flex items-center justify-between p-3 hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt={title}
          className="w-24 h-20 object-cover rounded-lg"
        />
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">with {guide}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>
      <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        View Details
      </button>
    </div>
  );
}
