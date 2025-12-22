import React, { useState } from "react";
import { CheckCircle, User, Shield, Star, Banknote } from "lucide-react";
import StepProgress from "./StepProgress";
import { useNavigate } from "react-router-dom";
import { useBecomeGuide } from "./BecomeGuideContext";
import { registerGuide } from "../../services/guideRegister";

export default function ReviewForm() {
  const navigate = useNavigate();
  const { formData } = useBecomeGuide(); 
  const { personal, verification, skills, banking } = formData;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const userId = localStorage.getItem("userId");

      // Prepare guide data for backend
      const guideData = {
        fullName: personal.fullName,
        email: personal.email,
        phoneNumber: personal.phone,
        experience: [personal.experience], // wrap in array for List<GuideExperience>
        languages: personal.languages.map(l => l.toUpperCase()), // must match enum names: ENGLISH, NEPALI
        categories: skills.specialities.map(c => c.toUpperCase()), // must match enum names
        location: personal.location || "",
        bio: skills.bio,
        price: Number(skills.hourlyRate), // convert to number
        governmentNumber: verification.governmentNumber,
        dob: verification.dob // "YYYY-MM-DD" is fine
      };
      

      const response = await registerGuide(
        userId,
        token,
        guideData,
        personal.profileImage,
        verification.governmentPic
        
      );

      console.log("Response:", response);
      setSuccess("Guide registration submitted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to submit guide registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5f9ff] min-h-screen flex flex-col items-center py-10 px-4 w-full">
      <StepProgress
        steps={["Personal Info", "Verification", "Skills", "Banking", "Review"]}
        activeStep={5}
      />

      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-10 mt-6">
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
            <h2 className="font-semibold text-gray-900">Personal Information</h2>
          </div>

          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Full Name: {personal.fullName}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Email: {personal.email}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Phone: {personal.phone}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Languages: {personal.languages.join(", ")}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Experience: {personal.experience}
            </li>
          </ul>
        </div>

        {/* --------------------------- VERIFICATION --------------------------- */}
        <div className="border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="text-blue-600" />
            <h2 className="font-semibold text-gray-900">Identity Verification</h2>
          </div>

          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Government ID: {verification.govId}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Date of Birth: {verification.dob}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> ID Verified: Pending
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
              <CheckCircle size={18} className="text-green-600" /> Specializations: {skills.specialities.join(", ")}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Hourly Rate: ${skills.hourlyRate}/hr
            </li>
            {skills.bio && (
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" /> Bio: {skills.bio}
              </li>
            )}
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
              <CheckCircle size={18} className="text-green-600" /> Bank: {banking.bankName}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Account Holder: {banking.holderName}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" /> Account: ****{banking.accountNumber.slice(-4)}
            </li>
          </ul>
        </div>

        {/* --------------------------- AGREEMENT --------------------------- */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 accent-blue-500" />
            <span className="text-gray-700 text-sm leading-relaxed">
              I agree to the{" "}
              <span className="text-blue-600 underline cursor-pointer">Terms and Conditions</span> and{" "}
              <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>. My application will be reviewed, and I will be notified within 3–5 business days.
            </span>
          </label>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        {/* --------------------------- BUTTONS --------------------------- */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate("/dashboard/become-guide/form4")}
            className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Back to Edit
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
}
