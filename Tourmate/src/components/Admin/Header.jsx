import { useEffect, useState } from "react";
import { getUserData } from "../../services/user";
import { Bell, Search } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

export default function Header() {
  const [profileImage, setProfileImage] = useState(
    "https://api.dicebear.com/7.x/personas/svg?seed=John"
  );
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  // ✅ Lifted unread count
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserData();
      if (res.success) {
        const data = res.data;
        setUser(data);

        if (data.profilePic) {
          setProfileImage(`data:image/jpeg;base64,${data.profilePic}`);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="h-16 bg-white border border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-96 pl-10 pr-4 py-2 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6 relative">
        {/* Bell */}
        <div
          className="relative cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <Bell size={22} />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Notification dropdown */}
        {open && (
          <NotificationDropdown
            setUnreadCount={setUnreadCount} // ✅ pass setter down
          />
        )}

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={profileImage} className="w-10 h-10 rounded-full" />
          <div className="leading-tight">
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
