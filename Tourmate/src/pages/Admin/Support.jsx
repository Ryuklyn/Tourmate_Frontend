import { useEffect, useState } from "react";
import ViewMessage from "../../components/Admin/View.jsx";
import {
  Filter,
  Mail,
  MessageSquare,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  getSupportMessagesByRole,
  markSupportAsSeen,
} from "../../services/admin/support"; // import your service

export default function Support() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState("All");
  const [openFilter, setOpenFilter] = useState(false);
  const filters = ["All", "Traveller", "Guide"];

  // Fetch messages on mount
  useEffect(() => {
    const fetchMessages = async () => {
      let roleParam = filter === "All" ? "ALL" : filter.toUpperCase();
      const res = await getSupportMessagesByRole(roleParam);
      console.log(res);
      if (res.success) {
        const formatted = res.data.map(msg => ({
          ...msg,
          read: msg.view,
          date: new Date(msg.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        }));
  
        setMessages(formatted);
      } else {
        console.error(res.error);
      }
    };
  
    fetchMessages();
  }, [filter]);
  



  const handleView = async (message) => {
    setSelectedMessage(message);

    if (!message.read) {
      // Mark as seen in backend
      const res = await markSupportAsSeen(message.id);
      if (res.success) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === message.id ? { ...msg, read: true } : msg
          )
        );
      } else {
        console.error(res.error);
      }
    }
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
              {messages.filter((m) => !m.read).length}
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
            <div className="text-2xl font-bold text-gray-900">{messages.length}</div>
            <div className="text-sm text-gray-500">Total Messages</div>
          </div>
        </div>
      </div>

      {/* Filter/Search */}
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

      {/* Messages Table */}
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
            {messages.map((msg) => (
              <tr
                key={msg.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="p-4">
                  {!msg.read && (
                    <span className="block w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {msg.avatar && (
                      <img
                        src={`data:image/jpeg;base64,${msg.user.profilePic}`}
                        alt={msg.user.fullName}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{msg.user.firstName} {msg.user.lastName}</div>
                      <div className="text-xs text-gray-500">{msg.user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 border border-gray-200 rounded-full text-xs font-medium text-gray-700 bg-white">
                    {msg.role}
                  </span>
                </td>
                <td className={`p-4 ${!msg.read ? "font-semibold" : ""}`}>{msg.subject}</td>
                <td className="p-4 text-gray-500 max-w-md truncate">{msg.message}</td>
                <td className="p-4 text-gray-700 whitespace-nowrap">{msg.date}</td>
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

      {/* Pagination */}
      <div className="flex justify-between items-center p-4 text-sm text-gray-500">
        <p>Showing 1 to {messages.length} of {messages.length} entries</p>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100">
            <ChevronLeft />
          </button>
          <button className="px-3 py-1 rounded-lg bg-orange-500 text-white">1</button>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100">
            <ChevronRight />
          </button>
        </div>
      </div>

      {selectedMessage && (
        <ViewMessage message={selectedMessage} onClose={() => setSelectedMessage(null)} />
      )}
    </div>
  );
}
