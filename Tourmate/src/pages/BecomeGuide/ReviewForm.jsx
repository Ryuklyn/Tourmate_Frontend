import React from "react";
import { CheckCircle, User, Shield, Star, Banknote } from "lucide-react";
import StepProgress from "./StepProgress";
import { useNavigate } from "react-router-dom";

export default function ReviewForm() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f5f9ff] min-h-screen flex flex-col items-center py-10 px-4 w-full">
      {/* STEP PROGRESS */}
      <StepProgress
        steps={["Personal Info", "Verification", "Skills", "Banking", "Review"]}
        activeStep={5}
      />

      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-10 mt-6">
        {/* HEADING */}
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Review & Submit
        </h1>
        <p className="text-gray-500 text-center mt-1 mb-8">
          Please review your information before submitting
        </p>

        {/* --------------------------- PERSONAL INFO --------------------------- */}
        <div className="border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <User className="text-blue-600" />
            <h2 className="font-semibold text-gray-900">
              Personal Information
            </h2>
          </div>

          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Full Name:
              John Doe
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Email:
              john@example.com
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Phone: +1 234
              567 8900
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Languages:
              English, Spanish
            </li>
          </ul>
        </div>

        {/* --------------------------- VERIFICATION --------------------------- */}
        <div className="border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="text-blue-600" />
            <h2 className="font-semibold text-gray-900">
              Identity Verification
            </h2>
          </div>

          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Government
              ID: Uploaded ✓
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> ID Verified:
              Pending
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Phone
              Verified: ✓
            </li>
          </ul>
        </div>

        {/* --------------------------- SKILLS & EXPERTISE --------------------------- */}
        <div className="border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Star className="text-blue-600" />
            <h2 className="font-semibold text-gray-900">Skills & Expertise</h2>
          </div>

          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" />
              Specializations: Historical Tours, Food & Culinary
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" />
              Hourly Rate: $50/hr
            </li>
          </ul>
        </div>

        {/* --------------------------- BANK DETAILS --------------------------- */}
        <div className="border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Banknote className="text-blue-600" />
            <h2 className="font-semibold text-gray-900">Bank Details</h2>
          </div>

          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Bank: Example
              Bank
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Account
              Holder: John Doe
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Account:
              ****1234
            </li>
          </ul>
        </div>

        {/* --------------------------- AGREEMENT --------------------------- */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 accent-blue-500" />
            <span className="text-gray-700 text-sm leading-relaxed">
              I agree to the{" "}
              <span className="text-blue-600 underline cursor-pointer">
                Terms and Conditions
              </span>
              and{" "}
              <span className="text-blue-600 underline cursor-pointer">
                Privacy Policy
              </span>
              . My application will be reviewed, and I will be notified within
              3–5 business days.
            </span>
          </label>
        </div>

        {/* --------------------------- BUTTONS --------------------------- */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate("/dashboard/become-guide/form4")}
            className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Back to Edit
          </button>

          <button
            onClick={() => navigate("/dashboard/become-guide/submit-form")}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
