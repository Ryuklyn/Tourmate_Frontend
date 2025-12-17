import { Bell, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
      <input
        type="text"
        placeholder="🔍  Search anything..."
        className="w-96 px-4 py-2 rounded-lg bg-gray-100 outline-none"
      />

      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <Bell size={22} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </div>

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
          <ChevronDown size={18} />
        </div>
      </div>
    </header>
  );
}
