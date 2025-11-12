import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeRole, setActiveRole] = useState("Traveler");
  const dropdownRef = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between bg-white px-6 py-3 shadow-sm">
      {/* Left - Logo */}
      <div className="text-xl font-bold text-blue-600">WanderGuide</div>

      {/* Right - Buttons + Icons */}
      <div className="flex items-center gap-4">
        {/* Traveler / Guide Toggle (Revamped + Fixed) */}
        <div className="relative flex bg-gray-100 rounded-full p-1 w-56">
          {/* Animated background */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`absolute top-1 bottom-1 w-[50%] rounded-full bg-blue-600 shadow-md ${
              activeRole === "Guide" ? "right-1" : "left-1"
            }`}
          />

          {/* Traveler Button */}
          <button
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveRole("Traveler")}
            className={`relative z-10 flex-1 text-sm font-semibold rounded-full transition-colors duration-300 
              focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 
              [&:focus:not(:focus-visible)]:outline-none active:outline-none active:bg-transparent select-none
              ${
                activeRole === "Traveler"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
          >
            Traveler
          </button>

          <button
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveRole("Guide")}
            className={`relative z-10 flex-1 text-sm font-semibold rounded-full transition-colors duration-300 
              focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 
              [&:focus:not(:focus-visible)]:outline-none active:outline-none active:bg-transparent select-none
              ${
                activeRole === "Guide"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
          >
            Guide
          </button>
        </div>

        {/* Notification Icon */}
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>

        {/* User Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <img
            src="https://api.dicebear.com/7.x/personas/svg?seed=John"
            alt="User Avatar"
            className="w-9 h-9 rounded-full cursor-pointer border-2 border-gray-200"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border-0.5 rounded-xl shadow-lg z-50">
              <div className="px-4 py-2 text-sm text-gray-700">
                <p className="font-medium">John Doe</p>
                <p className="text-gray-400 text-xs">john@example.com</p>
              </div>
              <ul className="text-sm text-gray-600">
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-red-50 text-red-500 cursor-pointer border-t">
                  Log out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
