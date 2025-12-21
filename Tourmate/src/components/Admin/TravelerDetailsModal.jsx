import { X, Mail, CalendarDays, Briefcase } from "lucide-react";

export default function TravelerDetailsModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>

        <h2 className="text-lg font-semibold">Traveler Details</h2>
        <p className="text-sm text-gray-500 mb-4">
          View complete traveler information
        </p>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={user.img}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{user.name}</p>
            <span className="text-xs bg-green-200 text-green-700 px-2 py-0.5 rounded-full">
              {user.status}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-500" />
            {user.email}
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="w-4 h-4 text-gray-500" />
            Joined {user.joinDate}
          </div>

          <div className="flex items-center gap-3">
            <Briefcase className="w-4 h-4 text-gray-500" />
            {user.bookings} bookings • {user.spent} spent
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-200 rounded-xl hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
