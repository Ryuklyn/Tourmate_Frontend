import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Star,
  Eye,
  Mail,
  Ban,
} from "lucide-react";
import TravelerDetailsModal from "../../components/Admin/TravelerDetailsModal";
import SendEmailModal from "../../components/Admin/SendEmailModal";
import SuspendUserModal from "../../components/Admin/SuspendUserModal";

export default function UserManage() {
  const [activeTab, setActiveTab] = useState("travelers");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);

  // -----------------------------
  // Status color helper
  // -----------------------------
  const getStatusClasses = (status) => {
    switch (status) {
      case "Active":
      case "Verified":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // -----------------------------
  // Close dropdown on outside click
  // -----------------------------
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuIndex(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // -----------------------------
  // Travelers Data
  // -----------------------------
  const travelers = [
    {
      name: "Sarah Wilson",
      email: "sarah@email.com",
      joinDate: "Jan 15, 2024",
      bookings: 8,
      spent: "$2,450",
      status: "Active",
      img: "https://i.pravatar.cc/100?img=10",
    },
    {
      name: "James Chen",
      email: "james@email.com",
      joinDate: "Feb 3, 2024",
      bookings: 5,
      spent: "$1,200",
      status: "Active",
      img: "https://i.pravatar.cc/100?img=20",
    },
    {
      name: "Emma Davis",
      email: "emma@email.com",
      joinDate: "Mar 12, 2024",
      bookings: 12,
      spent: "$4,100",
      status: "Active",
      img: "https://i.pravatar.cc/100?img=30",
    },
    {
      name: "Alex Murphy",
      email: "alex@email.com",
      joinDate: "Apr 8, 2024",
      bookings: 3,
      spent: "$890",
      status: "Suspended",
      img: "https://i.pravatar.cc/100?img=40",
    },
    {
      name: "Lisa Park",
      email: "lisa@email.com",
      joinDate: "May 20, 2024",
      bookings: 7,
      spent: "$2,100",
      status: "Active",
      img: "https://i.pravatar.cc/100?img=50",
    },
  ];

  // -----------------------------
  // Guides Data
  // -----------------------------
  const guides = [
    {
      name: "Marco Rivera",
      email: "marco@email.com",
      location: "Rome, Italy",
      rating: 4.9,
      tours: 156,
      earnings: "$12,450",
      status: "Verified",
      img: "https://i.pravatar.cc/100?img=12",
    },
    {
      name: "Yuki Tanaka",
      email: "yuki@email.com",
      location: "Tokyo, Japan",
      rating: 4.8,
      tours: 142,
      earnings: "$11,200",
      status: "Verified",
      img: "https://i.pravatar.cc/100?img=22",
    },
    {
      name: "Pierre Dubois",
      email: "pierre@email.com",
      location: "Paris, France",
      rating: 4.9,
      tours: 138,
      earnings: "$10,800",
      status: "Verified",
      img: "https://i.pravatar.cc/100?img=32",
    },
    {
      name: "Ana Santos",
      email: "ana@email.com",
      location: "Barcelona, Spain",
      rating: 4.7,
      tours: 125,
      earnings: "$9,650",
      status: "Pending",
      img: "https://i.pravatar.cc/100?img=42",
    },
    {
      name: "John Smith",
      email: "john@email.com",
      location: "New York, USA",
      rating: 4.5,
      tours: 89,
      earnings: "$7,200",
      status: "Suspended",
      img: "https://i.pravatar.cc/100?img=52",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ---------- TABS ---------- */}
      <div className="bg-gray-300/20 p-2 rounded-lg inline-flex gap-4">
        <button
          onClick={() => setActiveTab("travelers")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "travelers"
              ? "bg-red-400 text-white font-bold shadow"
              : "text-gray-600"
          }`}
        >
          Travelers (5)
        </button>

        <button
          onClick={() => setActiveTab("guides")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "guides"
              ? "bg-red-400 text-white font-bold shadow"
              : "text-gray-600"
          }`}
        >
          Guides (5)
        </button>
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="mt-6 bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-gray-600 text-sm">
              <th className="p-4">
                {activeTab === "travelers" ? "Traveler" : "Guide"}
              </th>
              <th className="p-4">
                {activeTab === "travelers" ? "Join Date" : "Email"}
              </th>
              <th className="p-4">
                {activeTab === "travelers" ? "Bookings" : "Rating"}
              </th>
              <th className="p-4">
                {activeTab === "travelers" ? "Spent" : "Tours"}
              </th>
              <th className="p-4">
                {activeTab === "travelers" ? "Status" : "Earnings"}
              </th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {(activeTab === "travelers" ? travelers : guides).map(
              (item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-50 text-sm"
                >
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.email || item.location}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">{item.joinDate || item.email}</td>

                  <td className="p-4">
                    <div className="inline-flex items-center gap-2">
                      {item.rating && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                      <span>{item.bookings ?? item.rating}</span>
                    </div>
                  </td>

                  <td className="p-4">{item.spent || item.tours}</td>

                  {/* ✅ STATUS WITH BG */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${getStatusClasses(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* ---------- ACTION DROPDOWN ---------- */}
                  <td
                    className="p-4 relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal
                      className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-800"
                      onClick={() =>
                        setOpenMenuIndex(openMenuIndex === idx ? null : idx)
                      }
                    />

                    {openMenuIndex === idx && (
                      <div className="absolute right-4 top-10 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                        <button
                          onClick={() => {
                            setSelectedUser(item);
                            setModalType("view");
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>

                        <button
                          onClick={() => {
                            setSelectedUser(item);
                            setModalType("email");
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          <Mail className="w-4 h-4" />
                          Send Email
                        </button>

                        <button
                          onClick={() => {
                            setSelectedUser(item);
                            setModalType("suspend");
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Ban className="w-4 h-4" />
                          Suspend
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* ---------- FOOTER / PAGINATION ---------- */}
      <div className="flex justify-between items-center p-4 text-sm text-gray-500">
        <p>Showing 1 to 5 of 5 entries</p>

        <div className="flex items-center gap-2">
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100">
            <ChevronLeft />
          </button>

          <button className="px-3 py-1 rounded-lg bg-orange-500 text-white">
            1
          </button>

          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100">
            <ChevronRight />
          </button>
        </div>
      </div>

      {modalType === "view" && (
        <TravelerDetailsModal
          user={selectedUser}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === "email" && (
        <SendEmailModal
          user={selectedUser}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === "suspend" && (
        <SuspendUserModal
          user={selectedUser}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}
