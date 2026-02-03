import React, { useState } from "react";
import {
  ShieldCheck,
  Heart,
  MapPin,
  Languages,
  MapPinned,
  Utensils,
  Landmark,
  Building,
  Star,
  Clock,
} from "lucide-react";
import Niroj from "../../../assets/img/NirojSir.jpg";

export default function GuideHeader() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(!saved);
    // 👉 future ma API call yaha garna sakxau
    // console.log("Guide saved:", !saved);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-5">
          <img
            src={Niroj}
            alt="Guide"
            className="w-30 h-30 rounded-xl object-cover"
          />

          <div className="flex-1">
            {/* Name + Verified + Save */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-semibold">Niroj Shrestha</h1>

                <span className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-medium border border-green-200">
                  <ShieldCheck size={15} /> Verified Guide
                </span>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className={`flex items-center gap-1 px-3 py-1.5
                  border rounded-full text-sm transition
                  ${
                    saved
                      ? "border-red-300 text-red-500 bg-red-50"
                      : "border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-300"
                  }`}
              >
                <Heart size={16} className={saved ? "fill-red-500" : ""} />
                {saved ? "Saved" : "Save"}
              </button>
            </div>

            <p className="text-gray-600 mt-1 flex items-center gap-1">
              <MapPin size={16} className="text-gray-500" /> Lalitpur, Nepal
            </p>

            <div className="flex items-center gap-5 text-sm text-gray-700 mt-2">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span>4.9 (4 reviews)</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock size={16} className="text-gray-600" />
                <span>Responds in 1 hour</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-1">
              Member since 2019 — 340 tours completed
            </p>
          </div>
        </div>
      </div>

      {/* Second Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-2">About Niroj Shrestha</h2>

        <p className="text-gray-700 leading-relaxed">
          Passionate local guide with 8+ years of experience showing travelers
          the hidden gems of Barcelona. Expert in cultural experiences, history,
          food tours, and architecture.
        </p>

        <h3 className="mt-6 font-semibold flex items-center gap-2 text-lg">
          <Languages size={18} /> Languages
        </h3>

        <div className="flex gap-3 mt-3 flex-wrap">
          {["Nepali", "English", "Japanese", "Hindi"].map((lang) => (
            <span
              key={lang}
              className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700"
            >
              {lang}
            </span>
          ))}
        </div>

        <h3 className="mt-6 font-semibold flex items-center gap-2 text-lg">
          <MapPinned size={18} /> Specialties
        </h3>

        <div className="flex gap-3 mt-3 flex-wrap">
          {[
            { label: "Cultural Experience", icon: Landmark },
            { label: "City Tour", icon: MapPinned },
            { label: "Food Tours", icon: Utensils },
            { label: "History", icon: Landmark },
            { label: "Architecture", icon: Building },
          ].map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="px-3 py-1 bg-green-50 border border-green-200 text-green-700 rounded-full text-sm flex items-center gap-2"
            >
              <Icon size={16} /> {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
