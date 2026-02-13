import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import { getUserData } from "../../services/user";

export default function Header() {
  const [profileImage, setProfileImage] = useState(
    "https://api.dicebear.com/7.x/personas/svg?seed=John"
  );
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
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
    <header className="h-16 bg-white border border-gray-200 flex items-center justify-end px-6 sticky top-0 z-50">
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
