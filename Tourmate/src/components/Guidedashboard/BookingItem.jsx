import React from "react";

export default function BookingItem({ initials, name, tour, datePrice }) {
  return (
    <div
      className="flex items-center justify-between bg-white p-4 rounded-xl2 border"
      style={{ borderColor: "#E2E8F0", borderWidth: "1px" }}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-semibold">
          {initials}
        </div>
        <div>
          <div className="font-semibold text-[#0F172A]">{name}</div>
          <div className="text-sm text-muted">{tour}</div>
          <div className="text-sm text-muted mt-1">{datePrice}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 rounded-full bg-[#0FAF94] text-white">
          Accept
        </button>
        <button className="px-4 py-2 rounded-full border border-gray-200 text-sm">
          Decline
        </button>
      </div>
    </div>
  );
}
