import React from "react";
import { Camera, Plus, X } from "lucide-react";

export default function GuideProfileManage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Profile Management
      </h1>

      {/* Container */}
      <div className="space-y-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Photo */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Profile Photo</h2>
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full border-2 border-gray-200 flex items-center justify-center bg-gray-100">
                <Camera className="text-gray-400 w-10 h-10" />
                <button className="absolute bottom-2 right-2 bg-[#0faf94] text-white p-2 rounded-full shadow hover:bg-green-700">
                  <Plus size={18} />
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-3">
                JPG or PNG. Max size 2MB
              </p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  First Name
                </label>
                <input
                  className="w-full p-3 border border-gray-300  rounded-lg focus:ring focus:ring-green-300"
                  placeholder="Alex"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Last Name
                </label>
                <input
                  className="w-full p-3 border border-gray-300  rounded-lg focus:ring focus:ring-green-300"
                  placeholder="Jordan"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-600 font-medium mb-1">
                Email
              </label>
              <input
                className="w-full p-3 border border-gray-300  rounded-lg"
                placeholder="alexjordan@wander.com"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-600 font-medium mb-1">
                Phone Number
              </label>
              <input
                className="w-full p-3 border border-gray-300  rounded-lg"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Professional Bio</h2>

          <label className="text-gray-600 font-medium mb-1 block">
            About You
          </label>
          <textarea
            rows="4"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
            placeholder="Write a compelling bio..."
          />
          <p className="text-gray-400 text-sm mt-1">Max 500 characters</p>
        </div>

        {/* Languages & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Languages */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Languages</h2>

            <div className="space-y-3">
              <input
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="English - Native"
              />
              <input
                className="w-full p-3 border border-gray-300  rounded-lg"
                placeholder="Spanish - Fluent"
              />
              <input
                className="w-full p-3 border border-gray-300  rounded-lg"
                placeholder="French - Intermediate"
              />
            </div>

            <button className="mt-4 text-[#0faf94] font-medium hover:underline flex items-center gap-1 border-2 border-[#0faf94] px-3 py-1 rounded-lg w-max">
              <Plus size={18} /> Add Language
            </button>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">
              Certifications & Specialties
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "Certified Tour Guide",
                "First Aid Certified",
                "Food Safety Handler",
                "Historical Expert",
                "Adventure Tourism",
              ].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>

            <button className="text-[#0faf94] font-medium hover:underline flex items-center gap-1 border-2 border-[#0faf94] px-3 py-1 rounded-lg w-max">
              <Plus size={18} /> Add Certification
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button className="px-6 py-3 bg-white rounded-lg hover:bg-gray-300 border-2 border-[#0faf94] text-gray-500">
            Cancel
          </button>
          <button className="px-6 py-3 bg-[#0faf94] text-white rounded-lg hover:bg-green-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
