import React from "react";

export default function StatCard({ title, value, subtitle, icon, extra }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition border border-[#E2E8F0]">
      <div className="flex justify-between items-center">
        {/* LEFT TEXT SECTION */}
        <div>
          <h3 className="text-sm text-gray-500">{title}</h3>
          <p className="text-2xl font-bold mt-1 text-[#0F172A]">{value}</p>

          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}

          {extra && <p className="text-xs mt-2">{extra}</p>}
        </div>

        {/* ICON SECTION */}
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  );
}
