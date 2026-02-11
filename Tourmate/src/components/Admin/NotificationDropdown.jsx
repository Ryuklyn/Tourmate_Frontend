import { useState } from "react";
import {
  UserPlus,
  Headphones,
  Wallet,
  Users,
  UserCheck,
  CheckCheck,
  Trash2,
  BellOff,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    icon: <UserPlus />,
    color: "bg-blue-100 text-blue-600",
    title: "New Guide Application",
    desc: "Sarah Johnson has submitted a guide application...",
    time: "5m ago",
    unread: true,
  },
  {
    id: 2,
    icon: <Headphones />,
    color: "bg-orange-100 text-orange-600",
    title: "Support Message Received",
    desc: `John Doe: "Unable to access my booking history".`,
    time: "20m ago",
    unread: true,
  },
  {
    id: 3,
    icon: <Wallet />,
    color: "bg-red-100 text-red-600",
    title: "Withdrawal Request",
    desc: "Guide Emily Brown requested a withdrawal of...",
    time: "1h ago",
    unread: true,
  },
  {
    id: 4,
    icon: <Users />,
    color: "bg-green-100 text-green-600",
    title: "New User Registration",
    desc: "Michael Chen has registered as a new tourist.",
    time: "2h ago",
    unread: false,
  },
  {
    id: 5,
    icon: <UserCheck />,
    color: "bg-indigo-100 text-indigo-600",
    title: "Guide Application Pending",
    desc: "Robert Kim has submitted a guide application...",
    time: "3h ago",
    unread: false,
  },
];

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // ✅ Read all
  const handleReadAll = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // ✅ Clear all
  const handleClear = () => {
    setNotifications([]);
  };

  return (
    <div className="absolute right-0 top-14 w-[420px] bg-white rounded-xl shadow-xl border border-gray-100 z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-gray-900">Notifications</h4>
          {unreadCount > 0 && (
            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={handleReadAll}
            disabled={unreadCount === 0}
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
        {/* {notifications.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-8">
            No notifications 🎉
          </p>
        ) : (
          notifications.map((item) => (
            <NotificationItem key={item.id} {...item} />
          ))
        )} */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <BellOff size={28} className="mb-2" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          notifications.map((item) => (
            <NotificationItem key={item.id} {...item} />
          ))
        )}
      </div>
    </div>
  );
}

function NotificationItem({ icon, title, desc, time, color, unread }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-gray-200">
      <div className={`p-2 rounded-full ${color}`}>{icon}</div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p className="font-medium text-sm">{title}</p>
          {unread && (
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-1" />
          )}
        </div>

        <p className="text-sm text-gray-500 leading-snug">{desc}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}
