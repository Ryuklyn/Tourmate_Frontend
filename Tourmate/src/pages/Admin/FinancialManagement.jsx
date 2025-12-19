// =====================================================
// src/FinancialManagement.jsx
// =====================================================
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Percent,
  Search,
  Filter,
  Clock,
  Wallet,
  TrendingUp,
} from "lucide-react";

import WithdrawalDetailsModal from "../../components/Admin/WithdrawalDetailsModal";
import CommissionSettingsModal from "../../components/Admin/CommissionSettingsModal";

export default function FinancialManagement() {
  const [selected, setSelected] = useState(null);
  const [showCommission, setShowCommission] = useState(false);
  const [commissionRate, setCommissionRate] = useState(10);
  const [openMenu, setOpenMenu] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // const withdrawals = [
  //   {
  //     id: "WD001",
  //     name: "Marco Rivera",
  //     email: "marco@email.com",
  //     avatar: "https://i.pravatar.cc/100?img=1",
  //     amount: 1500,
  //     commission: 150,
  //     net: 1350,
  //     bank: "Bank of America",
  //     account: "4521",
  //     status: "Pending",
  //   },
  // ];
  const withdrawals = [
    {
      requestId: "WD001",
      requestDate: "Dec 10, 2024",

      name: "Marco Rivera",
      email: "marco@email.com",
      avatar: "https://i.pravatar.cc/100?img=1",

      bank: "Bank of America",
      account: "4521",

      amount: 1500,
      commission: 150,
      net: 1350,

      status: "Pending",
    },
  ];

  const filteredWithdrawals = withdrawals
    .filter((w) => w.name.toLowerCase().includes(search.toLowerCase()))
    .filter((w) => (statusFilter === "All" ? true : w.status === statusFilter));

  return (
    <div className="p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Financial Management</h1>
          <p className="text-sm text-gray-500">
            Manage guide withdrawals and commission settings
          </p>
        </div>

        <button
          onClick={() => setShowCommission(true)}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-white"
        >
          <Percent size={16} /> Manage Commission
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pending Requests"
          value="2"
          icon={<Clock size={18} />}
        />
        <StatCard
          title="Commission Rate"
          value={`${commissionRate}%`}
          icon={<Percent size={18} />}
        />
        <StatCard
          title="Total Withdrawn"
          value="₹45,000"
          icon={<Wallet size={18} />}
        />
        <StatCard
          title="Total Commission"
          value="₹5,000"
          icon={<TrendingUp size={18} />}
        />
      </div>

      {/* ================= SEARCH & FILTER ================= */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search withdrawals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring"
          />
        </div>

        {/* Filter */}
        <div className="relative">
          <Filter
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm focus:outline-none"
          >
            <option value="All">Filter by status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Request ID</th>
              <th className="p-3">Guide</th>
              <th className="p-3">Request Amount</th>
              <th className="p-3">Commission</th>
              <th className="p-3">Net Amount</th>
              <th className="p-3">Bank Details</th>
              <th className="p-3">Request Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredWithdrawals.map((w) => (
              <tr key={w.requestId} className="border-t border-gray-200">
                {/* Request ID */}
                <td className="p-3 font-medium">{w.requestId}</td>

                {/* Guide */}
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={w.avatar}
                      alt={w.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{w.name}</p>
                      <p className="text-xs text-gray-500">{w.email}</p>
                    </div>
                  </div>
                </td>

                {/* Request Amount */}
                <td className="p-3 font-medium">₹{w.amount}</td>

                {/* Commission */}
                <td className="p-3 text-red-500">-₹{w.commission}</td>

                {/* Net Amount */}
                <td className="p-3 font-medium text-green-600">₹{w.net}</td>

                {/* Bank Details */}
                <td className="p-3">
                  <p className="font-medium">{w.bank}</p>
                  <p className="text-xs text-gray-500">****{w.account}</p>
                </td>

                {/* Request Date */}
                <td className="p-3">{w.requestDate}</td>

                {/* Status */}
                <td className="p-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      w.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : w.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {w.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="relative p-3 text-right">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === w.requestId ? null : w.requestId)
                    }
                    className="rounded-md p-1 hover:bg-gray-100"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {openMenu === w.requestId && (
                    <div className="absolute right-4 top-full z-20 mt-2 w-36 rounded-lg border border-gray-200 bg-white shadow">
                      <button
                        onClick={() => {
                          setSelected(w);
                          setOpenMenu(null);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-50"
                      >
                        View Details
                      </button>
                      <button className="block w-full px-4 py-2 text-left text-green-600 hover:bg-gray-50">
                        Approve
                      </button>
                      <button className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50">
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {filteredWithdrawals.length === 0 && (
              <tr>
                <td colSpan="9" className="p-6 text-center text-gray-500">
                  No withdrawals found
                </td>
              </tr>
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

      {/* ================= MODALS ================= */}
      {selected && (
        <WithdrawalDetailsModal
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}

      {showCommission && (
        <CommissionSettingsModal
          rate={commissionRate}
          setRate={setCommissionRate}
          onClose={() => setShowCommission(false)}
        />
      )}
    </div>
  );
}

// ================= STAT CARD =================
function StatCard({ title, value, icon }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
      <div className="rounded-lg bg-orange-100 p-2 text-orange-600">{icon}</div>
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
}
