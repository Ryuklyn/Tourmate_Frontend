import { useState } from "react";
import ViewMessage from "../../components/Admin/View.jsx";
import { Filter, Mail, MessageSquare, Eye } from "lucide-react";
import NirojSir from "../../assets/img/NirojSir.jpg";

const initialMessages = [
  {
    id: 1,
    name: "Niroj Shrestha",
    email: "nirojshrestha@gmail.com",
    userType: "Guide",
    subject: "Payout delay inquiry",
    message:
      "Hello, my weekly payout hasn't arrived yet and it's been 5 days...",
    date: "Dec 9, 2024",
    seen: false,
    avatar: NirojSir,
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@email.com",
    userType: "Traveler",
    subject: "How to cancel my booking?",
    message:
      "Hi, I need to cancel my upcoming tour booking scheduled for next week...",
    date: "Dec 10, 2024",
    seen: false,
  },

  {
    id: 3,
    name: "James Chen",
    email: "james@email.com",
    userType: "Traveler",
    subject: "Change tour date request",
    message:
      "I booked a city tour for December 15th but I need to reschedule it to December 20th. Is it possible to change the date without additional charges? The guide hasn't confirmed yet.",
    date: "Dec 8, 2024",
    seen: false,
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma@email.com",
    userType: "Guide",
    subject: "Profile verification issue",
    message:
      "I submitted my documents for guide verification 10 days ago but still waiting for approval...",
    date: "Dec 7, 2024",
    seen: false,
  },
  {
    id: 5,
    name: "Ana Santos",
    email: "ana@email.com",
    userType: "Traveler",
    subject: "Refund status",
    message:
      "I requested a refund for my cancelled tour 2 weeks ago but I haven't received any update...",
    date: "Dec 6, 2024",
    seen: false,
  },
];

export default function Support() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState("All");
  const [openFilter, setOpenFilter] = useState(false);
  const filters = ["All", "Traveler", "Guide"];

  const filteredMessages =
    filter === "All"
      ? messages
      : messages.filter((msg) => msg.userType === filter);

  const handleView = (message) => {
    setSelectedMessage(message);
    // Mark message as seen
    setMessages((prev) =>
      prev.map((msg) => (msg.id === message.id ? { ...msg, seen: true } : msg))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Support Messages</h1>
      <p className="text-gray-500 mb-6">View help requests from users</p>
      <div className="flex gap-6 mb-6">
        {/* Unread Messages Card */}
        <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-xl border border-gray-200 shadow-sm min-w-[220px]">
          <div className="bg-orange-100 p-3 rounded-lg">
            <Mail className="text-orange-500" size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {messages.filter((m) => !m.seen).length}
            </div>
            <div className="text-sm text-gray-500">Unread Messages</div>
          </div>
        </div>

        {/* Total Messages Card */}
        <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-xl border border-gray-200 shadow-sm min-w-[220px]">
          <div className="bg-orange-100 p-3 rounded-lg">
            <MessageSquare className="text-orange-500" size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {messages.length}
            </div>
            <div className="text-sm text-gray-500">Total Messages</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search messages..."
          className="px-4 py-2 border border-gray-200 rounded-lg w-1/3"
        />

        <div className="relative">
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50"
          >
            <Filter size={16} />
            Filter by status
          </button>

          {openFilter && (
            <div className="absolute right-0 top-full z-20 mt-2 w-36 rounded-lg border border-gray-200 bg-white shadow">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    setOpenFilter(false);
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr className="text-gray-600">
              <th className="p-4 w-6"></th>
              <th className="p-4">From</th>
              <th className="p-4">User Type</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Message Preview</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMessages.map((msg) => (
              <tr
                key={msg.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                {/* Unread Dot */}
                <td className="p-4">
                  {!msg.seen && (
                    <span className="block w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
                  )}
                </td>

                {/* From */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={msg.avatar}
                      alt={msg.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {msg.name}
                      </div>
                      <div className="text-xs text-gray-500">{msg.email}</div>
                    </div>
                  </div>
                </td>

                {/* User Type */}
                <td className="p-4">
                  <span className="px-3 py-1 border border-gray-200 rounded-full text-xs font-medium text-gray-700 bg-white">
                    {msg.userType}
                  </span>
                </td>

                {/* Subject */}
                <td className={`p-4 ${!msg.seen ? "font-semibold" : ""}`}>
                  {msg.subject}
                </td>

                {/* Message Preview */}
                <td className="p-4 text-gray-500 max-w-md truncate">
                  {msg.message}
                </td>

                {/* Date */}
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {msg.date}
                </td>

                {/* Actions */}
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleView(msg)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-sm font-medium"
                  >
                    <Eye size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedMessage && (
        <ViewMessage
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  );
}
