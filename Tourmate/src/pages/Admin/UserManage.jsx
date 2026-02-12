// 

import React, { useState, useEffect } from "react";
import {
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
import { getGuides, getUsers } from "../../services/admin/UserManagement";

export default function UserManage() {
  const [activeTab, setActiveTab] = useState("travelers");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);

  const [travelers, setTravelers] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Status color helper
  // -----------------------------
  const getStatusClasses = (status) => {
    switch (status) {
      case "ACTIVE":
      case "VERIFIED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "SUSPENDED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // -----------------------------
  // Fetch data
  // -----------------------------
  const fetchData = async () => {
    setLoading(true);

    const usersRes = await getUsers();
    const guidesRes = await getGuides();

    if (usersRes.success) {
      setTravelers(usersRes.data.data);
    }

    if (guidesRes.success) {
      setGuides(guidesRes.data.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();

  }, []);

  // -----------------------------
  // Close dropdown on outside click
  // -----------------------------
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuIndex(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const data = activeTab === "travelers" ? travelers : guides;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ---------- TABS ---------- */}
      <div className="bg-gray-300/20 p-2 rounded-lg inline-flex gap-4">
        <button
          onClick={() => setActiveTab("travelers")}
          className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "travelers"
            ? "bg-red-400 text-white font-bold shadow"
            : "text-gray-600"
            }`}
        >
          Travelers ({travelers.length})
        </button>

        <button
          onClick={() => setActiveTab("guides")}
          className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "guides"
            ? "bg-red-400 text-white font-bold shadow"
            : "text-gray-600"
            }`}
        >
          Guides ({guides.length})
        </button>
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="mt-6 bg-white rounded-xl shadow border border-gray-200 overflow-visible">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-gray-600 text-sm">
                <th className="p-4">
                  {activeTab === "travelers" ? "Traveler" : "Guide"}
                </th>
                <th className="p-4">Email</th>
                <th className="p-4">
                  {activeTab === "travelers" ? "Bookings" : "Rating"}
                </th>
                <th className="p-4">
                  {activeTab === "travelers" ? "Spent" : "Tours"}
                </th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-50 text-sm"
                >
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={
                        item.profilePic
                          ? `data:image/jpeg;base64,${item.profilePic}`
                          : "https://i.pravatar.cc/100"
                      }
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">
                        {activeTab === "travelers"
                          ? `${item.firstName} ${item.lastName}`
                          : item.fullName}
                      </p>
                      <p className="text-xs text-gray-500">{item.email}</p>
                    </div>
                  </td>

                  <td className="p-4">{item.email}</td>

                  <td className="p-4">
                    {activeTab === "travelers" ? (
                      item.bookings
                    ) : (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {item.rating.toFixed(1)}
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    {activeTab === "travelers"
                      ? `Rs. ${item.spent}`
                      : item.tours}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
                        activeTab === "travelers"
                          ? item.suspended ? "SUSPENDED" : "ACTIVE"
                          : item.status
                      )}`}
                    >
                      {activeTab === "travelers"
                        ? item.suspended ? "SUSPENDED" : "ACTIVE"
                        : item.status}
                    </span>
                  </td>

                  {/* ---------- ACTIONS ---------- */}
                  <td
                    className="p-4 relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal
                      className="w-6 h-6 cursor-pointer"
                      onClick={() =>
                        setOpenMenuIndex(openMenuIndex === idx ? null : idx)
                      }
                    />

                    {openMenuIndex === idx && (
                      <div className="absolute right-4 top-10 w-44 bg-white border rounded-xl shadow-lg z-20">
                        <button
                          onClick={() => {
                            setSelectedUser(item);
                            setModalType("view");
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-50"
                        >
                          <Eye className="w-4 h-4" /> View Details
                        </button>

                        <button
                          onClick={() => {
                            setSelectedUser(item);
                            setModalType("email");
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-50"
                        >
                          <Mail className="w-4 h-4" /> Send Email
                        </button>

                        {/* <button
                          onClick={() => {
                            setSelectedUser(item);
                            setModalType("suspend");
                          }}
                          className={`flex items-center gap-3 w-full px-4 py-2 ${(activeTab === "travelers"
                            ? item.role === "SUSPENDED"
                            : item.status === "SUSPENDED")
                            ? "text-green-600 hover:bg-green-50"
                            : "text-red-600 hover:bg-red-50"
                            }`}
                        >
                          <Ban className="w-4 h-4" />
                          {(activeTab === "travelers"
                            ? item.role === "SUSPENDED"
                            : item.status === "SUSPENDED")
                            ? "Unsuspend"
                            : "Suspend"}
                        </button> */}
                        <button
                          onClick={() => {
                            setSelectedUser(item);
                            setModalType("suspend");
                          }}
                          className={`flex items-center gap-3 w-full px-4 py-2 ${activeTab === "travelers"
                            ? item.suspended
                              ? "text-green-600 hover:bg-green-50"
                              : "text-red-600 hover:bg-red-50"
                            : item.status === "SUSPENDED"
                              ? "text-green-600 hover:bg-green-50"
                              : "text-red-600 hover:bg-red-50"
                            }`}
                        >
                          <Ban className="w-4 h-4" />
                          {activeTab === "travelers"
                            ? item.suspended ? "Unsuspend" : "Suspend"
                            : item.status === "SUSPENDED" ? "Unsuspend" : "Suspend"}
                        </button>

                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ---------- MODALS ---------- */}
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
          type={activeTab}   // "travelers" | "guides"
          onClose={() => setModalType(null)}
          onSuccess={() => {
            setModalType(null);
            fetchData();
          }}
        />
      )}
    </div>
  );
}
