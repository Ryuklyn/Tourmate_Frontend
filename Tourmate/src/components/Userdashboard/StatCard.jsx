import React from "react";

export default function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm text-gray-500">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        </div>
        <div className="text-2xl text-blue-500">{icon}</div>
      </div>
    </div>
  );
}
