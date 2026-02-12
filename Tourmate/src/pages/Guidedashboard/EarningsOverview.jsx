import React, { useEffect, useState } from "react";
import { DollarSign, Wallet, Clock } from "lucide-react";
import { getEarnings } from "../../services/guide/dashboard";

export default function EarningsOverview() {
  const [earnings, setEarnings] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const fetchEarnings = async () => {
    const res = await getEarnings();
    if (res.success) {
      setEarnings(res.data);
      setTransactions(res.data.recentTransactions);
    }
  }

  useEffect(() => {
    fetchEarnings();
  }, [])


  const statusColor = {
    completed: "bg-green-100 text-[#0faf94]",
    pending: "bg-yellow-100 text-yellow-600",
    approved: "bg-yellow-100 text-yellow-600",
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
          <h2 className="text-3xl font-bold mt-2 text-[#0faf94]">
            Rs.{earnings.monthlyEarnings?.toLocaleString() || 0}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {(() => {
              const change = earnings.earningsChangePercent || 0;
              const isPositive = change > 0;
              const isNegative = change < 0;

              return (
                <span className={`${isPositive ? "text-[#0faf94]" : isNegative ? "text-red-500" : "text-gray-400"} font-medium`}>
                  {isPositive && "▲ "}
                  {isNegative && "▼ "}
                  {Math.abs(change).toFixed(1)}% from last month
                </span>
              );
            })()}
          </p>
        </div>


        {/* Total Earnings */}
        <div className="border border-gray-300 rounded-xl p-5 shadow-sm bg-white">
          <p className="text-gray-500">Total Earnings</p>
          <h2 className="text-3xl font-bold mt-2 text-[#0faf94]">Rs. {earnings.totalEarnings}</h2>
          <p className="text-gray-500 text-sm">All time earnings</p>
        </div>

        {/* Pending Payout */}
        <div className="border border-gray-300 rounded-xl p-5 shadow-sm bg-white">
          <p className="text-gray-500">Pending Payout</p>
          <h2 className="text-3xl font-bold mt-2 text-[#0faf94]">Rs. {earnings.pendingPayout}</h2>
          <p className="text-gray-500 text-sm mt-1">Available in 3 days</p>
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
                <p className="font-medium text-gray-900">{t.tourName}</p>
                <p className="text-gray-500 text-sm">{t.date}</p>
              </div>

              <div className="flex flex-col items-end">
                <p className="font-semibold">Rs. {t.amount}</p>
                <span
                  className={`px-3 py-1 mt-1 text-xs rounded-full font-medium ${statusColor[t.status]
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
