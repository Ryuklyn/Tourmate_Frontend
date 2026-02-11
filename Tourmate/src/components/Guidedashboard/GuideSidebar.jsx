import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Calendar,
  CircleDollarSign,
  Star,
  Clock,
  Settings,
  Package,
  HelpCircle,
} from "lucide-react";

const guideMenuItems = [
  {
    to: "/dashboard/guide",
    icon: <LayoutDashboard size={18} />,
    label: "Dashboard",
    end: true,
  },
  {
    to: "/dashboard/guide/profile",
    icon: <User size={18} />,
    label: "Profile Management",
  },
  {
    to: "/dashboard/guide/bookings",
    icon: <Calendar size={18} />,
    label: "Bookings",
  },
  {
    to: "/dashboard/guide/tourpackages",
    icon: <Package size={18} />,
    label: "Tour Packages",
  },
  {
    to: "/dashboard/guide/earnings",
    icon: <CircleDollarSign size={18} />,
    label: "Earnings",
  },
  {
    to: "/dashboard/guide/reviews",
    icon: <Star size={18} />,
    label: "Reviews",
  },
  {
    to: "/dashboard/guide/support",
    icon: <HelpCircle size={18} />,
    label: "Support",
  },
  {
    to: "/dashboard/guide/settings",
    icon: <Settings size={18} />,
    label: "Settings",
  },
];

export default function GuideSidebar() {
  return (
    <div className="w-60 bg-white h-[calc(100vh-56px)] shadow-sm flex flex-col justify-between">
      <div>
        <div className="p-4 text-2xl font-bold text-[#0faf94]"></div>

        <ul className="space-y-1 mt-2">
          {guideMenuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-2 w-full rounded-lg transition-all duration-200 relative font-medium 
                  ${
                    isActive
                      ? "bg-[#0FAF94] text-white shadow-sm"
                      : "text-gray-700 hover:bg-green-50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* ICON */}
                    <span
                      className={`flex items-center justify-center transition-colors duration-200 
                        ${
                          isActive
                            ? "text-white"
                            : "text-gray-700 group-hover:text-[#0FAF94]"
                        }`}
                    >
                      {item.icon}
                    </span>

                    {/* LABEL */}
                    <span
                      className={`relative z-10 transition-colors duration-200 
                        ${
                          isActive
                            ? "text-white"
                            : "text-gray-700 group-hover:text-[#0FAF94]"
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
        Share your expertise and earn money
      </div>
    </div>
  );
}
