import React from "react";
import { DollarSign, Wallet, Clock } from "lucide-react";

export default function EarningsOverview() {
  const transactions = [
    {
      title: "Historic Tokyo Walking Tour",
      date: "Jan 15, 2025",
      amount: "$150",
      status: "completed",
    },
    {
      title: "Food & Culture Experience",
      date: "Jan 12, 2025",
      amount: "$200",
      status: "completed",
    },
    {
      title: "Historic Tokyo Walking Tour",
      date: "Jan 10, 2025",
      amount: "$150",
      status: "pending",
    },
  ];

  const statusColor = {
    completed: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">
        Earnings Overview
      </h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* This Month */}
        <div className="border border-gray-300 rounded-xl p-5 shadow-sm bg-white">
          <p className="text-gray-500">This Month</p>
          <h2 className="text-3xl font-bold mt-2">$3,240</h2>
          <p className="text-green-600 text-sm mt-1">+15% from last month</p>
        </div>

        {/* Total Earnings */}
        <div className="border border-gray-300 rounded-xl p-5 shadow-sm bg-white">
          <p className="text-gray-500">Total Earnings</p>
          <h2 className="text-3xl font-bold mt-2">$28,450</h2>
          <p className="text-gray-500 text-sm">All time earnings</p>
        </div>

        {/* Pending Payout */}
        <div className="border border-gray-300 rounded-xl p-5 shadow-sm bg-white">
          <p className="text-gray-500">Pending Payout</p>
          <h2 className="text-3xl font-bold mt-2">$1,120</h2>
          <p className="text-blue-600 text-sm mt-1">Available in 3 days</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="border border-gray-300 rounded-xl bg-white shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

        <div className="space-y-4">
          {transactions.map((t, i) => (
            <div
              key={i}
              className="flex justify-between items-center border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-medium text-gray-900">{t.title}</p>
                <p className="text-gray-500 text-sm">{t.date}</p>
              </div>

              <div className="flex flex-col items-end">
                <p className="font-semibold">{t.amount}</p>
                <span
                  className={`px-3 py-1 mt-1 text-xs rounded-full font-medium ${
                    statusColor[t.status]
                  }`}
                >
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
