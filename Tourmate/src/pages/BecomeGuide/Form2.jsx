import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import StepProgress from "./StepProgress";
import { useNavigate } from "react-router-dom";
import { useBecomeGuide } from "./BecomeGuideContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form2() {
  const navigate = useNavigate();
  const { updateForm, formData } = useBecomeGuide();

  /* ------------------ STATES ------------------ */
  const [govId, setGovId] = useState("");
  const [dob, setDob] = useState("");
  const [idFile, setIdFile] = useState(null);

  /* ------------------ PREFILL IF AVAILABLE ------------------ */
  useEffect(() => {
    if (formData.verification) {
      setGovId(formData.verification.governmentNumber || "");
      setDob(formData.verification.dob || "");
      setIdFile(formData.verification.governmentPic || null);
    }
  }, [formData]);

  /* ------------------ FILE UPLOAD ------------------ */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setIdFile(file);
  };

  /* ------------------ SUBMIT ------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!govId || !dob || !idFile) {
      toast.warn("All fields are required");
      return;
    }

    // Gov ID format check (8-12 alphanumeric)
    if (!/^[A-Za-z0-9]{8,12}$/.test(govId)) {
      toast.warn("Invalid Government ID format");
      return;
    }

    // Age validation: minimum 18 years
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    if (age < 18) {
      toast.warn("You must be at least 18 years old");
      return;
    }

    updateForm("verification", {
      governmentNumber: govId,
      dob,
      governmentPic: idFile,
    });

    navigate("/dashboard/become-guide/form3");
  };

  return (
    <div className="w-full flex flex-col items-center py-10 px-4 bg-[#f5f9ff]">
      <StepProgress
        steps={["Personal Info", "Verification", "Skills", "Banking"]}
        activeStep={2}
      />

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10 mt-6 relative">
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
                {idFile
                  ? idFile.name || "Previously uploaded file"
                  : "Click to upload file"}
              </p>
              <input
                type="file"
                accept="image/*,.pdf"
                hidden
                onChange={handleFileUpload}
              />
            </label>

            {/* Preview if image */}
            {idFile && idFile.type && idFile.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(idFile)}
                alt="ID Preview"
                className="w-32 h-32 object-cover rounded-md mt-2"
              />
            )}
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
