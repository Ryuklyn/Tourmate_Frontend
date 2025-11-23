import React, { useState } from "react";
import { Upload, Info } from "lucide-react";
import StepProgress from "./StepProgress";
import { useNavigate } from "react-router-dom";

export default function Form4() {
  const navigate = useNavigate();

  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [confirmAcc, setConfirmAcc] = useState("");

  return (
    <div className="bg-[#f5f9ff] min-h-screen flex flex-col items-center w-full py-10 px-4">
      {/* STEP PROGRESS */}
      <StepProgress
        steps={["Personal Info", "Verification", "Skills", "Banking"]}
        activeStep={4}
      />

      {/* MAIN CARD */}
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-10 mt-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900">Bank Details</h1>
        <p className="text-gray-500 mt-1 mb-8">
          Securely add your payment information
        </p>

        {/* Info Ribbon */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 mb-6">
          <Info size={20} />
          <p className="text-sm">
            Your banking information is encrypted and secure. This is where
            you'll receive payments.
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-6">
          {/* Bank Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Bank Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter bank name"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>

          {/* Account Holder Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Account Holder Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Full name as per bank"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter account number"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={accNumber}
              onChange={(e) => setAccNumber(e.target.value)}
            />
          </div>

          {/* Confirm Account Number */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Confirm Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Re-enter account number"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={confirmAcc}
              onChange={(e) => setConfirmAcc(e.target.value)}
            />
          </div>

          {/* QR Code Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Payment QR Code (Optional)
            </label>

            <div className="mt-2 border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">
              <Upload size={40} className="text-gray-600" />
              <p className="mt-2 text-gray-600 text-[14px]">
                Click to upload a file
              </p>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Upload a QR code for alternative payment methods if available
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => navigate("/dashboard/become-guide/form3")}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Back
          </button>

          <button
            onClick={() => navigate("/dashboard/become-guide/review-form")}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
