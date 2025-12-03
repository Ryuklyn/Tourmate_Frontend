// src/components/Settings/Payment.jsx

import React, { useState } from "react";
import { CreditCard, Landmark } from "lucide-react";

export default function Payment() {
  const [account, setAccount] = useState({
    bankName: "",
    accountNumber: "",
    routingNumber: "",
  });

  return (
    <div className="bg-white rounded-xl shadow-sm mt-6 p-8 border">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="text-green-700 w-6 h-6" />
        <h2 className="text-xl font-semibold">Payment Information</h2>
      </div>

      {/* Bank Details */}
      <div className="space-y-5">
        <div>
          <p className="font-semibold mb-1">Bank Name</p>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 bg-white"
            value={account.bankName}
            onChange={(e) =>
              setAccount({ ...account, bankName: e.target.value })
            }
          />
        </div>

        <div>
          <p className="font-semibold mb-1">Account Number</p>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 bg-white"
            value={account.accountNumber}
            onChange={(e) =>
              setAccount({ ...account, accountNumber: e.target.value })
            }
          />
        </div>

        <div>
          <p className="font-semibold mb-1">Routing Number</p>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 bg-white"
            value={account.routingNumber}
            onChange={(e) =>
              setAccount({ ...account, routingNumber: e.target.value })
            }
          />
        </div>
      </div>

      <button className="mt-5 bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700">
        Save Payment Details
      </button>
    </div>
  );
}
