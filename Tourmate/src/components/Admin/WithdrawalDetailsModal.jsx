// =====================================================
// src/WithdrawalDetailsModal.jsx
// =====================================================
import { X, CheckCircle, XCircle, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WithdrawalDetailsModal({ data, onClose }) {
  const navigate = useNavigate();

  const handleApprove = () => {
    // Here you would typically send approval to the server
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        {/* ---------- HEADER ---------- */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Withdrawal Details</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>
        {/* ---------- USER INFO ---------- */}
        <div className="mb-6 flex items-center gap-4">
          <img
            src={data.avatar}
            alt="avatar"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900">{data.name}</p>
            <p className="text-sm text-gray-500">{data.email}</p>
          </div>
        </div>
        {/* ---------- DETAILS GRID ---------- */}
        <div className="mb-4 grid grid-cols-2 gap-y-4 text-sm">
          <div>
            <p className="text-gray-500">Request ID</p>
            <p className="font-medium text-gray-900">{data.requestId}</p>
          </div>

          <div>
            <p className="text-gray-500">Request Date</p>
            <p className="font-medium text-gray-900">{data.requestDate}</p>
          </div>

          <div>
            <p className="text-gray-500">Bank Name</p>
            <p className="font-medium text-gray-900">{data.bank}</p>
          </div>

          <div>
            <p className="text-gray-500">Account Number</p>
            <p className="font-medium text-gray-900">****{data.account}</p>
          </div>
        </div>

        <div className="absolute right-4 top-full z-20 mt-2 w-36 rounded-lg border border-gray-200 bg-white shadow">
          <button
            onClick={() => {
              setSelected(w);
              setOpenMenu(null);
            }}
            className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-50 gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button className="flex items-center w-full px-4 py-2 text-left text-green-600 hover:bg-gray-50 gap-2">
            <CheckCircle className="w-4 h-4" />
            Approve
          </button>
          <button className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50 gap-2">
            <XCircle className="w-4 h-4" />
            Reject
          </button>
        </div>
        {/* ---------- AMOUNT CARD ---------- */}
        <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm">
          <div className="flex justify-between font-medium">
            <span>Requested Amount</span>
            <span>₹{data.amount}</span>
          </div>

          <div className="mt-2 flex justify-between text-red-500">
            <span>Commission (10%)</span>
            <span>-₹{data.commission}</span>
          </div>

          <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 font-semibold text-green-600">
            <span>Net Amount</span>
            <span>₹{data.net}</span>
          </div>
        </div>
        {/* ---------- STATUS ---------- */}
        <div className="mt-5 flex items-center gap-2 text-sm">
          <span className="text-gray-500">Status:</span>
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">
            Pending
          </span>
        </div>
        {/* ---------- ACTION BUTTONS ---------- */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleApprove}
            className="flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-900 hover:bg-orange-50"
          >
            <XCircle size={16} />
            Reject
          </button>

          <button
            onClick={handleApprove}
            className="flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2 text-sm font-medium text-white hover:bg-orange-600"
          >
            <CheckCircle size={16} />
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
