import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  Heart,
  MapPin,
  Languages,
  MapPinned,
  Star,
  Clock,
} from "lucide-react";
import { toggleFavouriteGuide } from "../../../services/guideData";

export default function GuideHeader({ guide }) {
  const imageSrc = guide.profilePic
    ? `data:image/jpeg;base64,${guide.profilePic}`
    : "/default-avatar.png";
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setSaved(guide?.favorited ?? false);
  }, [guide]);
  const handleSave = async () => {

    const res = await toggleFavouriteGuide(guide.guideId);
    if (res.success) {
      setSaved(!saved);
    }
    // 👉 future ma API call yaha garna sakxau
    // console.log("Guide saved:", !saved);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-5">
          <img
            src={imageSrc}
            alt={guide.fullName}
            className="w-32 h-32 rounded-xl object-cover"
          />

          <div className="flex-1">
            {/* Name + Verified + Save */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-semibold">{guide.fullName}</h1>

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
              <MapPin size={16} /> {guide.location}
            </p>

            <div className="flex items-center gap-5 text-sm mt-2">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span>{guide.averageRating}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>Fast response</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-2">
          About {guide.fullName}
        </h2>

        <p className="text-gray-700">{guide.bio}</p>

        {/* Languages */}
        <h3 className="mt-6 font-semibold flex items-center gap-2 text-lg">
          <Languages size={18} /> Languages
        </h3>

        <div className="flex gap-3 mt-3 flex-wrap">
          {guide.languages.map((lang) => (
            <span
              key={lang}
              className="px-3 py-1 bg-gray-50 border rounded-full text-sm"
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Specialties */}
        <h3 className="mt-6 font-semibold flex items-center gap-2 text-lg">
          <MapPinned size={18} /> Specialties
        </h3>

        <div className="flex gap-3 mt-3 flex-wrap">
          {guide.categories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-green-50 border border-green-200 text-green-700 rounded-full text-sm"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
