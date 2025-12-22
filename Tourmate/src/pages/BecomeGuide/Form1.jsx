// PreGuide.jsx
import React, { useEffect, useState } from "react";
import { Upload, CheckCircle, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import axios from "axios";
import CONFIG from "../../../config";
import { useBecomeGuide } from "./BecomeGuideContext";

export default function Form1() {
  const navigate = useNavigate();
  const { updateForm } = useBecomeGuide();

  /* ------------------ BASIC INFO ------------------ */
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  /* ------------------ PROFILE IMAGE ------------------ */
  const [profileImage, setProfileImage] = useState({
    file: null,
    preview: null,
  });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileImage({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  /* ------------------ ENUM DATA ------------------ */
  const [allLanguages, setAllLanguages] = useState([]);
  const [allExperience, setAllExperience] = useState([]);
  const EXPERIENCE_LEVELS = [
    { value: "BEGINNER", label: "Beginner" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "EXPERT", label: "Expert" },
    { value: "PROFESSIONAL", label: "Professional" },
    { value: "OTHER", label: "Other" },
  ];

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");

  const [openLang, setOpenLang] = useState(false);
  const [openExp, setOpenExp] = useState(false);


  /* ------------------ FETCH ENUMS ------------------ */
  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");

    const fetchEnums = async () => {
      try {
        const [langsRes, expRes] = await Promise.all([
          axios.get(`${CONFIG.API_URL}/user/enums/languages`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${CONFIG.API_URL}/user/enums/experience`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setAllLanguages(
          langsRes.data.map(l =>
            l.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())
          )
        );

        setAllExperience(
          expRes.data.map(e =>
            e.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())
          )
        );
      } catch (err) {
        console.error("Failed to fetch enums", err);
      }
    };

    fetchEnums();
  }, []);

  /* ------------------ TOGGLES ------------------ */
  const toggleLanguage = (lang) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const selectExperience = (level) => {
    setExperienceLevel(level);
  };

  /* ------------------ SUBMIT ------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();

    updateForm("personal", {
      fullName,
      email,
      phone,
      languages: selectedLanguages,
      experience: experienceLevel,
      profileImage: profileImage.file,
    });

    navigate("/dashboard/become-guide/form2");
  };

  /* ------------------ STEPS ------------------ */
  const steps = [
    { id: 1, label: "Personal Info" },
    { id: 2, label: "Verification" },
    { id: 3, label: "Skills" },
    { id: 4, label: "Banking" },
  ];

  const activeStep = 1;

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
              className={`mt-2 text-sm ${activeStep === step.id
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
        <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer">
          <input type="file" hidden id="upload" accept="image/*" onChange={handleFileSelect} required />
          {!profileImage.preview ? (
            <label htmlFor="upload" className="cursor-pointer">
              <Upload size={32} className="mx-auto mb-2 text-gray-500" />
              Click to upload a file
            </label>
          ) : (
            <img
              src={profileImage.preview}
              alt="Preview"
              className="w-32 h-32 mx-auto rounded-full object-cover border"
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="relative w-full">
              <label className="block text-gray-700 font-medium mb-1">
                Languages You Speak
              </label>

              <div
                onClick={() => setOpenLang(!openLang)}
                className="w-full px-4 py-3 border rounded-lg cursor-pointer bg-white flex justify-between items-center"
              >
                <span className="text-gray-600">
                  {selectedLanguages.length > 0
                    ? selectedLanguages.join(", ")
                    : "Select languages..."}
                </span>
                <span className="text-gray-500">{openLang ? "▲" : "▼"}</span>
              </div>

              {openLang && (
                <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {allLanguages.map(lang => (
                    <div
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${selectedLanguages.includes(lang)
                        ? "bg-blue-100 font-semibold"
                        : ""
                        }`}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-3">
                {selectedLanguages.map(lang => (
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




          </div>








          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Experience Level <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-3">
              {EXPERIENCE_LEVELS.map((exp) => (
                <button
                  key={exp.value}
                  type="button"
                  onClick={() => selectExperience(exp.value)}
                  className={`px-4 py-2 rounded-lg border transition ${experienceLevel === exp.value
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 hover:bg-blue-50"
                    }`}
                >
                  {exp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-10">
            <button
              type="button"
              onClick={() => navigate("/dashboard/become-guide")}
              className="px-6 py-3 border rounded-lg text-gray-700 hover:bg-gray-100">
              Back
            </button>

            <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
