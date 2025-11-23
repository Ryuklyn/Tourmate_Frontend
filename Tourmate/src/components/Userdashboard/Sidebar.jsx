import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  Heart,
  Calendar,
  User,
  PlusCircle,
  HelpCircle,
  Package,
} from "lucide-react";

const menuItems = [
  {
    to: "/dashboard",
    icon: <LayoutDashboard size={18} />,
    label: "Dashboard",
    end: true,
  },
  {
    to: "/dashboard/findguide",
    icon: <Search size={18} />,
    label: "Find Guides",
  },
  { to: "/dashboard/favorites", icon: <Heart size={18} />, label: "Favorites" },
  {
    to: "/dashboard/bookings",
    icon: <Calendar size={18} />,
    label: "Bookings",
  },
  {
    to: "/dashboard/tour-packages",
    icon: <Package size={18} />,
    label: "Tour Packages",
  },
  {
    to: "/dashboard/profile",
    icon: <User size={18} />,
    label: "Profile Settings",
  },
  {
    to: "/dashboard/become-guide",
    icon: <PlusCircle size={18} />,
    label: "Become a Guide",
  },
  {
    to: "/dashboard/support",
    icon: <HelpCircle size={18} />,
    label: "Support",
  },
];

export default function Sidebar() {
  return (
    <div className="w-60 bg-white h-[calc(100vh-56px)] shadow-sm flex flex-col justify-between">
      <div>
        <div className="p-4 text-xs uppercase font-semibold text-gray-400"></div>
        <ul className="space-y-1 mt-2">
          {menuItems.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-2 w-full rounded-lg transition-all duration-200 relative font-medium ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-700 hover:bg-blue-50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* ICON */}
                    <span
                      className={`flex items-center justify-center transition-colors duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-gray-700 group-hover:text-blue-600"
                      }`}
                    >
                      {item.icon}
                    </span>

                    {/* LABEL */}
                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-gray-700 group-hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
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
