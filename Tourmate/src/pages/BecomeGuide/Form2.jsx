import React, { useState } from "react";
import { Upload, CheckCircle } from "lucide-react";
import StepProgress from "./StepProgress";
import { useNavigate } from "react-router-dom";

export default function Form2() {
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to the next step or dashboard
    navigate("/dashboard/become-guide/form3");
  };

  const handleBack = () => {
    // Navigate to the previous step
    navigate("/dashboard/become-guide/form1");
  };

  const handleSendCode = () => {
    setOtpSent(true);
    setTimeout(() => setOtpSent(false), 5000); // optional auto-hide
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* STEP HEADER */}
      <StepProgress
        steps={["Personal Info", "Verification", "Skills", "Banking"]}
        activeStep={2} // change dynamically
      />

      {/* PAGE CARD */}
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10 mt-6 relative">
        {/* Ribbon shown after sending OTP */}
        {otpSent && (
          <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow-lg flex items-center gap-2">
            <CheckCircle size={18} />
            Verification code sent to +977-98XXXXXXX
          </div>
        )}

        <h2 className="text-3xl font-bold text-gray-900">
          Identity Verification
        </h2>
        <p className="text-gray-500 mt-1">
          We need to verify your identity for security purposes
        </p>

        {/* Upload Box */}
        <h1 className="text-[14px] font-medium text-gray-700 mt-4">
          Upload Government ID <span className="text-red-500">*</span>
        </h1>

        <div className="mt-2 border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">
          <Upload size={40} className="text-gray-600" />
          <p className="mt-2 text-gray-600 text-[14px]">
            Click to upload a file
          </p>
        </div>

        {/* Govt ID Input */}
        <input
          type="text"
          placeholder="Government ID Number *"
          className="w-full mt-6 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* DOB */}
        <h1 className="text-[14px] font-medium text-gray-700 mt-4">
          Date of Birth <span className="text-red-500">*</span>
        </h1>
        <input
          type="date"
          className="w-full mt-4 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* BUTTONS */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg"
          >
            Back
          </button>

          <button
            onClick={handleContinue}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
