import React from "react";
import {
  LayoutDashboard,
  Search,
  Heart,
  Calendar,
  User,
  PlusCircle,
  HelpCircle,
} from "lucide-react";

const menuItems = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", active: true },
  { icon: <Search size={18} />, label: "Find Guides" },
  { icon: <Heart size={18} />, label: "Favorites" },
  { icon: <Calendar size={18} />, label: "Bookings" },
  { icon: <User size={18} />, label: "Profile Settings" },
  { icon: <PlusCircle size={18} />, label: "Become a Guide" },
  { icon: <HelpCircle size={18} />, label: "Support" },
];

export default function Sidebar() {
  return (
    <div className="w-60 bg-white h-[calc(100vh-56px)] shadow-sm flex flex-col justify-between">
      <div>
        <div className="p-4 text-xs uppercase font-semibold text-gray-400">
          Traveler Menu
        </div>
        <ul className="space-y-1 mt-2">
          {menuItems.map((item, i) => (
            <li key={i}>
              <button
                className={`flex items-center gap-3 px-4 py-2 w-full text-left rounded-lg ${
                  item.active
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 text-xs text-gray-500">
        Explore amazing destinations with local guides
      </div>
    </div>
  );
}
