import React, { useState } from "react";
import { Upload, CheckCircle } from "lucide-react";
import StepProgress from "./StepProgress";
import { useNavigate } from "react-router-dom";
import { useBecomeGuide } from "./BecomeGuideContext";

export default function Form2() {
  const navigate = useNavigate();
  const { updateForm } = useBecomeGuide();

  /* ------------------ STATES ------------------ */
  const [otpSent, setOtpSent] = useState(false);
  const [govId, setGovId] = useState("");
  const [dob, setDob] = useState("");
  const [idFile, setIdFile] = useState(null);
  const [error, setError] = useState("");

  /* ------------------ FILE UPLOAD ------------------ */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setIdFile(file);
  };

  /* ------------------ SUBMIT ------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!govId || !dob || !idFile) {
      setError("All fields are required");
      return;
    }

    setError("");

    updateForm("verification", {
      governmentNumber: govId,
      dob: dob,
      governmentPic: idFile,
    });

    navigate("/dashboard/become-guide/form3");
  };

  /* ------------------ OTP MOCK ------------------ */
  const handleSendCode = () => {
    setOtpSent(true);
    setTimeout(() => setOtpSent(false), 4000);
  };

  return (
    <div className="w-full flex flex-col items-center py-10 px-4 bg-[#f5f9ff]">
      <StepProgress
        steps={["Personal Info", "Verification", "Skills", "Banking"]}
        activeStep={2}
      />

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10 mt-6 relative">
        {/* OTP Toast */}
        {otpSent && (
          <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-lg">
            <CheckCircle size={18} />
            Verification code sent
          </div>
        )}

        <h2 className="text-3xl font-bold">Identity Verification</h2>
        <p className="text-gray-500 mt-1 mb-6">
          We need to verify your identity
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ------------------ FILE UPLOAD ------------------ */}
          <div>
            <label className="block font-medium mb-2">
              Upload Government ID <span className="text-red-500">*</span>
            </label>

            <label className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
              <Upload size={40} />
              <p className="mt-2 text-gray-600">
                {idFile ? idFile.name : "Click to upload file"}
              </p>
              <input
                type="file"
                accept="image/*,.pdf"
                hidden
                onChange={handleFileUpload}
                required
              />
            </label>
          </div>

          {/* ------------------ GOV ID ------------------ */}
          <div>
            <label className="block font-medium mb-2">
              Government ID Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-4 border rounded-lg"
              value={govId}
              onChange={(e) => setGovId(e.target.value)}
              required
            />
          </div>

          {/* ------------------ DOB ------------------ */}
          <div>
            <label className="block font-medium mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full p-4 border rounded-lg"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 font-medium text-sm">{error}</p>
          )}

          {/* ------------------ BUTTONS ------------------ */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => navigate("/dashboard/become-guide/form1")}
              className="px-8 py-3 bg-gray-200 rounded-lg"
            >
              Back
            </button>

            <button
              type="submit"
              onClick={handleSendCode}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
