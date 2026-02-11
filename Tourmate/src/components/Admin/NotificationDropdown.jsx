import { useEffect, useState } from "react";
import { CheckCheck, Trash2, BellOff } from "lucide-react";
import {
  getAllNotifications,
  markNotificationAsRead,
} from "../../services/notification";

export default function NotificationDropdown({ setUnreadCount }) {
  const [notifications, setNotifications] = useState([]);

  // Fetch all notifications
  const fetchNotifications = async () => {
    const result = await getAllNotifications();
    if (result.success) {
      setNotifications(result.data);
      // ✅ update unread count whenever notifications change
      const unread = result.data.filter((n) => !n.read).length;
      setUnreadCount(unread);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  // Mark all notifications as read
  const handleReadAll = async () => {
    try {
      await Promise.all(
        notifications
          .filter((n) => !n.read)
          .map((n) => markNotificationAsRead(n.id))
      );
      fetchNotifications(); // ✅ will update unread count
    } catch (err) {
      console.error(err);
    }
  };

  // Clear notifications locally
  const handleClear = () => {
    setNotifications([]);
    setUnreadCount(0); // ✅ update badge
  };

  return (
    <div className="absolute right-0 top-14 w-[420px] bg-white rounded-xl shadow-xl border border-gray-100 z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-gray-900">Notifications</h4>
          {notifications.filter((n) => !n.read).length > 0 && (
            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
              {notifications.filter((n) => !n.read).length} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={handleReadAll}
            disabled={notifications.filter((n) => !n.read).length === 0}
            className="flex items-center gap-1 text-gray-600 hover:text-black disabled:opacity-40"
          >
            <CheckCheck size={16} /> Read all
          </button>

          <button
            onClick={handleClear}
            disabled={notifications.length === 0}
            className="flex items-center gap-1 text-red-500 hover:text-red-600 disabled:opacity-40"
          >
            <Trash2 size={16} /> Clear
          </button>
        </div>
      </div>

      {/* Notifications list */}
      <div className="divide-y max-h-[420px] overflow-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <BellOff size={28} className="mb-2" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          notifications.map((item) => (
            <NotificationItem
              key={item.id}
              {...item}
              refresh={fetchNotifications} // ✅ refresh on click
            />
          ))
        )}
      </div>
    </div>
  );
}

// Single notification item
function NotificationItem({ id, title, message, createdAt, read, refresh }) {
  const handleClick = async () => {
    if (!read) {
      await markNotificationAsRead(id);
      refresh(); // ✅ update unread count
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50"
    >
      {/* Dot indicator */}
      <div
        className={`w-3 h-3 rounded-full mt-2 ${
          read ? "bg-gray-300" : "bg-orange-500"
        }`}
      ></div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p className="font-medium text-sm">{title}</p>
        </div>
        <p className="text-sm text-gray-500 leading-snug">{message}</p>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
