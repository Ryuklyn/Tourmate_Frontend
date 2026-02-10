// src/components/Settings/Payment.jsx

import React, { useState } from "react";
import { CreditCard, Landmark } from "lucide-react";

export default function Payment() {
  /* ================= DUMMY DATA (OUTSIDE RETURN) ================= */
  const [bankAccount, setBankAccount] = useState({
    bankName: "Chase Bank",
    maskedAccount: "****4567",
    isPrimary: true,
  });

  const [payoutFrequency, setPayoutFrequency] = useState(
    "Monthly (1st of each month)"
  );

  const nextPayout = {
    date: "January 1, 2026",
    amount: "$1,430",
  };

  return (
    <div className="space-y-8">
      {/* ================= BANK ACCOUNT ================= */}
      <div className="bg-white rounded-xl border border-gray-200 mt-4 p-6">
        <div className="flex items-center gap-2 mb-5">
          <CreditCard className="w-5 h-5 text-[#0faf94]" />
          <h2 className="text-lg font-semibold">Bank Account</h2>
        </div>

        {/* Account Card */}
        <div className="flex items-center justify-between border border-gray-200 rounded-xl p-4 mb-4">
          <div>
            <p className="font-medium">
              {bankAccount.bankName} {bankAccount.maskedAccount}
            </p>
            {bankAccount.isPrimary && (
              <p className="text-sm text-gray-500">Primary account</p>
            )}
          </div>

          <button className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
            Edit
          </button>
        </div>

        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
          Add Bank Account
        </button>
      </div>

      {/* ================= PAYOUT SCHEDULE ================= */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Payout Schedule</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Payout Frequency
          </label>
          <select
            value={payoutFrequency}
            onChange={(e) => setPayoutFrequency(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-white"
          >
            <option>Monthly (1st of each month)</option>
            <option>Weekly</option>
            <option>Bi-weekly</option>
          </select>
        </div>

        <p className="text-sm text-gray-600 mb-5">
          Next payout: <span className="font-medium">{nextPayout.date}</span> •
          Estimated: <span className="font-medium">{nextPayout.amount}</span>
        </p>

        <button className="bg-[#0faf94] text-white px-5 py-2 rounded-lg hover:bg-[#0c8f79]">
          Save Changes
        </button>
      </div>
    </div>
  );
}
