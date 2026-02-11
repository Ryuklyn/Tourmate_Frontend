import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { authenticateRole, doLogout, validateAuthToken } from "../../services/auth";
import { getUserData } from "../../services/user";
import NotificationDropdown from "../Admin/NotificationDropdown";


export default function Header({ role }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeRole, setActiveRole] = useState(role);
  const [profileImage, setProfileImage] = useState("/https://api.dicebear.com/7.x/personas/svg?seed=John");
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setActiveRole(role);
  }, [role]);


  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserData();
      if (res.success) {
        const data = res.data;

        setUser(data);
        if (data.profilePic) {
          const imageSrc = data.profilePic
            ? `data:image/jpeg;base64,${data.profilePic}`
            : "/default-avatar.png";
          setProfileImage(imageSrc);
        }
      }
    };
    fetchUser();
  }, []);
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


  const handleRoleSwitch = async (nextRole) => {
    if (nextRole === activeRole) return;

    const isValid = await validateAuthToken(navigate);
    if (!isValid) return;
    if (nextRole === "GUIDE") {
      await authenticateRole("GUIDE", navigate)
    }
    setActiveRole(nextRole);

    // Navigate based on role
    if (nextRole === "GUIDE") {
      navigate("/dashboard/guide");
    } else {
      navigate("/dashboard");
    }
  };




  return (
    <header className="flex items-center justify-between bg-white px-6 py-3 shadow-sm">
      {/* Left - Logo */}
      <div className="text-xl font-bold text-blue-600">TourMate</div>

      {/* Right - Buttons + Icons */}
      <div className="flex items-center gap-4">
        {/* Traveler / Guide Toggle (Revamped + Fixed) */}
        <div className="relative flex bg-gray-100 rounded-full p-1 w-56">
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`absolute top-1 bottom-1 w-[50%] rounded-full bg-blue-600 shadow-md ${activeRole === "GUIDE" ? "right-1" : "left-1"
              }`}
            style={{
              backgroundColor: activeRole === "GUIDE" ? "#0FAF94" : "#2563EB",
              width: user.role === "GUIDE" ? "50%" : "100%" // Full width if only Traveler
            }}
          />

          {/* Traveler Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => handleRoleSwitch("TRAVELLER")}
            className={`relative z-10 flex-1 flex items-center justify-center text-sm font-semibold rounded-full transition-colors duration-300 
              focus:outline-none active:outline-none select-none
              ${activeRole === "TRAVELLER"
                ? "text-white"
                : "text-gray-600 hover:text-gray-800"
              }`}
          >
            Traveler
          </motion.button>

          {/* Guide Button */}
          {user.role === "GUIDE" && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => handleRoleSwitch("GUIDE")}
              className={`relative z-10 flex flex-1 items-center justify-center text-sm font-semibold rounded-full transition-colors duration-300 
                  focus:outline-none active:outline-none select-none
                  ${activeRole === "GUIDE"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-800"
                }`}
            >
              Guide
            </motion.button>
          )}
        </div>

        {/* Notification Icon */}
        <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
          <Bell size={22} />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5">
          {unreadCount}
          </span>
        </div>

        {open && <NotificationDropdown setUnreadCount={setUnreadCount} />}

        {/* User Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <img
            src={profileImage}
            alt="User Avatar"
            className="w-9 h-9 rounded-full cursor-pointer border-2 border-gray-200"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 min-w-[12rem] max-w-xs bg-white border-0.5 rounded-xl shadow-lg z-50">
              <div className="px-4 py-2 text-sm text-gray-700">
                <p className="font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-gray-400 text-xs">{user.email}</p>
              </div>
              <ul className="text-sm text-gray-600">
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate("/dashboard/profile")}>
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-red-50 text-red-500 cursor-pointer border-t"
                  onClick={() => doLogout(navigate)} // ✅ Call centralized logout
                >
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
