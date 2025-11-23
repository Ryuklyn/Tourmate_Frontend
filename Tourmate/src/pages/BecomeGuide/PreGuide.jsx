// PreGuide.jsx
import React from "react";
import {
  DollarSign,
  Globe2,
  Star,
  BadgeCheck,
  CheckCircle,
} from "lucide-react";

import Tourist from "../../assets/img/Tourist1.jpeg";
import { useNavigate } from "react-router-dom";

export default function PreGuide() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F6FAFF]">
      {/* Hero Section */}
      <div
        className="relative w-full h-[380px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${Tourist})`,
        }}
      >
        {/* Black top overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* White bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-b from-transparent to-[#F6FAFF]"></div>

        {/* Text */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Become a TourMate Guide
          </h1>
          <p className="text-lg mt-3 opacity-90">
            Share your passion. Earn income. Create memories.
          </p>
        </div>
      </div>

      {/* Why Join Section */}
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Why Join TourMate?
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign className="text-blue-600" size={26} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Earn Extra Income</h3>
              <p className="text-gray-600 text-sm">
                Set your own rates and work on your schedule
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Globe2 className="text-blue-600" size={26} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Meet Global Travelers</h3>
              <p className="text-gray-600 text-sm">
                Connect with people from around the world
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Star className="text-blue-600" size={26} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Share Your Expertise</h3>
              <p className="text-gray-600 text-sm">
                Showcase your local knowledge and passion
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <BadgeCheck className="text-blue-600" size={26} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Build Your Reputation</h3>
              <p className="text-gray-600 text-sm">
                Grow your profile with reviews and ratings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6">What You'll Need</h2>

          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="text-green-600" size={22} /> Valid
              government-issued identification
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="text-green-600" size={22} /> Bank account
              for payments
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="text-green-600" size={22} /> Passion for
              your local area and culture
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="text-green-600" size={22} /> Good
              communication skills
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="text-green-600" size={22} /> Flexibility
              to work with diverse groups
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10 mb-20">
          <button
            onClick={() => navigate("/dashboard/become-guide/form1")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition"
          >
            Start Your Application
          </button>
          <p className="text-gray-500 text-sm mt-2">
            Takes about 10–15 minutes to complete
          </p>
        </div>
      </div>
    </div>
  );
}
