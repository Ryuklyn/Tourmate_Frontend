import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

export default function UserManage() {
  const [activeTab, setActiveTab] = useState("travelers");

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
      status: "verified",
      img: "https://i.pravatar.cc/100?img=12",
    },
    {
      name: "Yuki Tanaka",
      email: "yuki@email.com",
      location: "Tokyo, Japan",
      rating: 4.8,
      tours: 142,
      earnings: "$11,200",
      status: "verified",
      img: "https://i.pravatar.cc/100?img=22",
    },
    {
      name: "Pierre Dubois",
      email: "pierre@email.com",
      location: "Paris, France",
      rating: 4.9,
      tours: 138,
      earnings: "$10,800",
      status: "verified",
      img: "https://i.pravatar.cc/100?img=32",
    },
    {
      name: "Ana Santos",
      email: "ana@email.com",
      location: "Barcelona, Spain",
      rating: 4.7,
      tours: 125,
      earnings: "$9,650",
      status: "pending",
      img: "https://i.pravatar.cc/100?img=42",
    },
    {
      name: "John Smith",
      email: "john@email.com",
      location: "New York, USA",
      rating: 4.5,
      tours: 89,
      earnings: "$7,200",
      status: "suspended",
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
              ? "bg-white shadow text-gray-900"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Travelers (5)
        </button>

        <button
          onClick={() => setActiveTab("guides")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "guides"
              ? "bg-white shadow text-gray-900"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Guides (5)
        </button>
      </div>

      {/* ---------- SEARCH + FILTER ---------- */}
      <div className="flex justify-between items-center mt-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg bg-white hover:bg-gray-100">
          <Filter className="w-5 h-5" />
          <span>Filter by status</span>
        </button>
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="mt-6 bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            {activeTab === "travelers" ? (
              <tr className="text-left text-gray-600 text-sm">
                <th className="p-4">Traveler</th>
                <th className="p-4">Join Date</th>
                <th className="p-4">Bookings</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            ) : (
              <tr className="text-left text-gray-600 text-sm">
                <th className="p-4">Guide</th>
                <th className="p-4">Email</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Tours</th>
                <th className="p-4">Earnings</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            )}
          </thead>

          <tbody>
            {activeTab === "travelers"
              ? travelers.map((t, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 hover:bg-gray-50 transition text-sm"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={t.img}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{t.name}</p>
                        <p className="text-gray-500 text-xs">{t.email}</p>
                      </div>
                    </td>

                    <td className="p-4 text-gray-700">{t.joinDate}</td>
                    <td className="p-4 text-gray-700">{t.bookings}</td>
                    <td className="p-4 text-gray-700">{t.spent}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          t.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <MoreHorizontal className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                    </td>
                  </tr>
                ))
              : guides.map((g, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 hover:bg-gray-50 transition text-sm"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={g.img}
                        alt={g.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{g.name}</p>
                        <p className="text-gray-500 text-xs">{g.location}</p>
                      </div>
                    </td>

                    <td className="p-4 text-gray-700">{g.email}</td>

                    <td className="p-4 text-gray-700 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {g.rating}
                    </td>

                    <td className="p-4 text-gray-700">{g.tours}</td>
                    <td className="p-4 text-gray-700">{g.earnings}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          g.status === "verified"
                            ? "bg-green-100 text-green-700"
                            : g.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {g.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <MoreHorizontal className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                    </td>
                  </tr>
                ))}
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
    </div>
  );
}
