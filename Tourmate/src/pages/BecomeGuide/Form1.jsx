// PreGuide.jsx
import React, { useState } from "react";
import { Upload, CheckCircle, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function Form1() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard/become-guide/form2");
  };
  const steps = [
    { id: 1, label: "Personal Info" },
    { id: 2, label: "Verification" },
    { id: 3, label: "Skills" },
    { id: 4, label: "Banking" },
  ];

  const [activeStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const allLanguages = [
    "English",
    "Nepali",
    "Hindi",
    "Japanese",
    "Chinese",
    "French",
    "Spanish",
  ];

  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const toggleLanguage = (lang) => {
    if (selected.includes(lang)) {
      setSelected(selected.filter((l) => l !== lang));
    } else {
      setSelected([...selected, lang]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6FAFF] py-10 px-4">
      {/* Steps */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-12">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Circle Wrapper (relative for correct line positioning) */}
            <div className="relative flex items-center">
              {/* Step circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white 
            ${activeStep === step.id ? "bg-blue-600" : "bg-gray-300"}`}
              >
                {activeStep > step.id ? (
                  <CheckCircle size={20} className="text-white" />
                ) : (
                  <span className="font-semibold">{step.id}</span>
                )}
              </div>

              {/* Line between circles */}
              {idx < steps.length - 1 && (
                <div className="absolute top-1/2 left-[170%] -translate-y-1/2 w-20 border-t border-gray-300"></div>
              )}
            </div>

            {/* Step label */}
            <p
              className={`mt-2 text-sm ${
                activeStep === step.id
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600"
              }`}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-10">
        <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
        <p className="text-gray-600 mb-8">Let's get to know you better</p>

        {/* Profile Upload */}
        <label className="block font-medium mb-2">Profile Picture</label>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="upload"
            onChange={handleFileSelect}
          />

          {!profileImage ? (
            <>
              <Upload size={32} className="mb-3 text-gray-500" />
              <label htmlFor="upload" className="cursor-pointer text-center">
                Click to upload a file
              </label>
            </>
          ) : (
            <img
              src={profileImage}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full border shadow-sm"
            />
          )}
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit}>
          <div className="mt-8 space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter phone number"
              />
            </div>

            {/* <div>
              <label className="block text-gray-700 font-medium mb-1">
                Languages You Speak
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Select languages..."
              />
            </div> */}
            <div className="relative w-full">
              {/* Label */}
              <label className="block text-gray-700 font-medium mb-1">
                Languages You Speak
              </label>

              {/* Input (dropdown trigger) */}
              <div
                onClick={() => setOpen(!open)}
                className="w-full px-4 py-3 border rounded-lg cursor-pointer bg-white flex justify-between items-center"
              >
                <span className="text-gray-600">
                  {selected.length > 0
                    ? selected.join(", ")
                    : "Select languages..."}
                </span>
                <span className="text-gray-500">{open ? "▲" : "▼"}</span>
              </div>

              {/* Dropdown */}
              {open && (
                <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {allLanguages.map((lang) => (
                    <div
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                        selected.includes(lang)
                          ? "bg-blue-100 font-semibold"
                          : ""
                      }`}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              )}

              {/* Selected Chips */}
              <div className="flex flex-wrap gap-2 mt-3">
                {selected.map((lang) => (
                  <div
                    key={lang}
                    className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                  >
                    <span>{lang}</span>
                    <X
                      size={16}
                      className="ml-2 cursor-pointer"
                      onClick={() => toggleLanguage(lang)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Experience Level <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Select your experience level</option>
                <option>Beginner (0-2 years)</option>
                <option>Intermediate (2-5 years)</option>
                <option>Expert (5+ years)</option>
                <option>Professional Guide</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-10">
            <button className="px-6 py-3 border rounded-lg text-gray-700 hover:bg-gray-100">
              Back
            </button>

            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
