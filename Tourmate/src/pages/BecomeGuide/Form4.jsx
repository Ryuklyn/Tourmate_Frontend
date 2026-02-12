import React, { useState } from "react";
import { Info } from "lucide-react";
import StepProgress from "./StepProgress";
import { useNavigate } from "react-router-dom";
import { useBecomeGuide } from "./BecomeGuideContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Form4() {
  const navigate = useNavigate();
  const { updateForm } = useBecomeGuide();

  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [confirmAcc, setConfirmAcc] = useState("");

  /* ------------------ SUBMIT ------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!bankName.trim()) {
      toast.warn("Bank name is required");
      return;
    }
  
    if (!holderName.trim()) {
      toast.warn("Account holder name is required");
      return;
    }
  
    if (!accNumber.trim()) {
      toast.warn("Account number is required");
      return;
    }
  
    if (!/^\d+$/.test(accNumber)) {
      toast.warn("Account number must contain only digits");
      return;
    }
  
    if (accNumber.length < 8) {
      toast.warn("Account number must be at least 8 digits");
      return;
    }
  
    if (!confirmAcc.trim()) {
      toast.warn("Please confirm your account number");
      return;
    }
  
    if (accNumber !== confirmAcc) {
      toast.warn("Account numbers do not match");
      return;
    }
  
    updateForm("banking", {
      bankName,
      holderName,
      accountNumber: accNumber,
    });
  
    navigate("/dashboard/become-guide/review-form");
  };
  

  return (
    <div className="bg-[#f5f9ff] min-h-screen flex flex-col items-center py-10 px-4">
      <StepProgress
        steps={["Personal Info", "Verification", "Skills", "Banking"]}
        activeStep={4}
      />

      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-10 mt-6">
        <h1 className="text-3xl font-bold">Bank Details</h1>
        <p className="text-gray-500 mt-1 mb-8">
          Securely add your payment information
        </p>

        {/* Info */}
        <div className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
          <Info size={20} />
          <p className="text-sm text-blue-800">
            Your banking information is encrypted and secure.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bank Name */}
          <div>
            <label className="block font-medium mb-2">
              Bank Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-3"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
            />
          </div>

          {/* Holder Name */}
          <div>
            <label className="block font-medium mb-2">
              Account Holder Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-3"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              required
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="block font-medium mb-2">
              Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full border rounded-lg px-4 py-3"
              value={accNumber}
              onChange={(e) => setAccNumber(e.target.value)}
              required
            />
          </div>

          {/* Confirm Account */}
          <div>
            <label className="block font-medium mb-2">
              Confirm Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full border rounded-lg px-4 py-3"
              value={confirmAcc}
              onChange={(e) => setConfirmAcc(e.target.value)}
              required
            />
          </div>



          {/* Buttons */}
          <div className="flex justify-between mt-10">
            <button
              type="button"
              onClick={() => navigate("/dashboard/become-guide/form3")}
              className="px-6 py-3 border rounded-lg"
            >
              Back
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2500} />

    </div>
  );
}
