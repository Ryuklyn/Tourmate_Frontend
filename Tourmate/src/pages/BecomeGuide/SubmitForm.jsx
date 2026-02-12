import React from "react";
import { CheckCircle, Clock, Mail, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SubmitForm() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F5F9FF] flex justify-center items-center py-12 px-4">
      <div className="bg-white w-full max-w-3xl p-10 rounded-2xl shadow-md text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="text-green-600" size={48} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800">
          Application Submitted Successfully!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for applying to become a TourMate Guide
        </p>

        {/* Under Review Box */}
        {/* <div className="bg-[#FFF7E6] border border-yellow-300 rounded-xl p-6 mt-8 flex items-start gap-4">
          <div className="text-center">
            <div>
              <Clock className="text-yellow-500 mt-1" size={28} />
              <h2 className="font-semibold text-gray-800">Under Review</h2>
            </div>
            <p className="text-gray-600 mt-1 text-sm">
              Your application is currently being reviewed by our team. This
              process typically takes 3-5 business days.
            </p>
          </div>
        </div> */}
        <div className="bg-[#FFF7E6] border border-yellow-300 rounded-xl p-6 mt-8 text-center">
          {/* Top Row: Clock + Text side-by-side */}
          <div className="flex justify-center items-center gap-2">
            <Clock className="text-yellow-500" size={28} />
            <h2 className="font-semibold text-gray-800 text-lg">
              Under Review
            </h2>
          </div>

          {/* Paragraph on new line */}
          <p className="text-gray-600 mt-2 text-sm max-w-md mx-auto">
            Your application is currently being reviewed by our team. This
            process typically takes 3–5 business days.
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-[#F8FAFF] border border-gray-200 rounded-xl p-6 mt-10 text-left">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            What happens next?
          </h3>

          <div className="flex items-start gap-3 mb-4">
            <Mail className="text-blue-600 mt-1" size={20} />
            <p className="text-gray-700 text-sm">
              You will receive a notification in the app inbox once your
              verification is approved, after which the guide portal will become
              accessible.
            </p>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <ShieldCheck className="text-blue-600 mt-1" size={20} />
            <p className="text-gray-700 text-sm">
              Our team will verify your documents and information.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="text-blue-600 mt-1" size={20} />
            <p className="text-gray-700 text-sm">
              You'll be notified by email once your application is approved.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            Return Home
          </button>
        </div>

        {/* Support */}
        <p className="text-gray-500 text-sm mt-8">
          Questions? Contact us at{" "}
          <a href="#" className="text-blue-600 underline">
            support@tourmate.com
          </a>
        </p>
      </div>
    </div>
  );
}
