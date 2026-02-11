import { Bell, Search } from "lucide-react";
import { useState } from "react";
import NotificationDropdown from "./NotificationDropdown";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 bg-white border border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
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

      <div className="flex items-center gap-6 relative">
        {/* Bell */}
        <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
          <Bell size={22} />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5">
            4
          </span>
        </div>

        {open && <NotificationDropdown />}

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            className="w-10 h-10 rounded-full"
          />
          <div className="leading-tight">
            <p className="font-semibold">Super Admin</p>
            <p className="text-xs text-gray-500">admin@tourmate.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
