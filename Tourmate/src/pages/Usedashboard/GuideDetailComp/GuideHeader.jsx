// import React from "react";
// import {
//   ShieldCheck,
//   MapPin,
//   Languages,
//   MapPinned,
//   Utensils,
//   Landmark,
//   Building,
//   Star,
//   Clock,
// } from "lucide-react";
// import Niroj from "../../../assets/img/NirojSir.jpg";

// export default function GuideHeader() {
//   return (
//     <div className="flex flex-col gap-6">
//       {/* Top Card: Guide Basic Info */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <div className="flex items-center gap-5">
//           <img
//             src={Niroj}
//             alt="Guide"
//             className="w-30 h-30 rounded-xl object-cover"
//           />

//           <div>
//             <h1 className="text-3xl font-semibold flex items-center gap-2">
//               Niroj Shrestha
//               <span className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-medium border border-green-200">
//                 <ShieldCheck size={15} /> Verified Guide
//               </span>
//             </h1>

//             <p className="text-gray-600 mt-1 flex items-center gap-1">
//               <MapPin size={16} className="text-gray-500" /> Lalitpur, Nepal
//             </p>

//             <div className="flex items-center gap-5 text-sm text-gray-700 mt-2">
//               <div className="flex items-center gap-1">
//                 <Star size={16} className="text-yellow-500 fill-yellow-500" />
//                 <span>4.9 (4 reviews)</span>
//               </div>

//               <div className="flex items-center gap-1">
//                 <Clock size={16} className="text-gray-600" />
//                 <span>Responds in 1 hour</span>
//               </div>
//             </div>

//             <p className="text-sm text-gray-600 mt-1">
//               Member since 2019 — 340 tours completed
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Second Card: About, Languages, Specialties */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-2xl font-semibold mb-2">About Niroj Shrestha</h2>

//         <p className="text-gray-700 leading-relaxed">
//           Passionate local guide with 8+ years of experience showing travelers
//           the hidden gems of Barcelona. Expert in cultural experiences, history,
//           food tours, and architecture.
//         </p>

//         <h3 className="mt-6 font-semibold flex items-center gap-2 text-lg">
//           <Languages size={18} /> Languages
//         </h3>

//         <div className="flex gap-3 mt-3 flex-wrap">
//           {["Nepali", "English", "Japanese", "Hindi"].map((lang) => (
//             <span
//               key={lang}
//               className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700"
//             >
//               {lang}
//             </span>
//           ))}
//         </div>

//         <h3 className="mt-6 font-semibold flex items-center gap-2 text-lg">
//           <MapPinned size={18} /> Specialties
//         </h3>

//         <div className="flex gap-3 mt-3 flex-wrap">
//           {[
//             { label: "Cultural Experience", icon: Landmark },
//             { label: "City Tour", icon: MapPinned },
//             { label: "Food Tours", icon: Utensils },
//             { label: "History", icon: Landmark },
//             { label: "Architecture", icon: Building },
//           ].map(({ label, icon: Icon }) => (
//             <span
//               key={label}
//               className="px-3 py-1 bg-green-50 border border-green-200 text-green-700 rounded-full text-sm flex items-center gap-2"
//             >
//               <Icon size={16} /> {label}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import {
  ShieldCheck,
  MapPin,
  Languages,
  MapPinned,
  Star,
  Clock,
} from "lucide-react";

export default function GuideHeader({ guide }) {
  const imageSrc = guide.profilePic
    ? `data:image/jpeg;base64,${guide.profilePic}`
    : "/default-avatar.png";

  return (
    <div className="flex flex-col gap-6">
      {/* Top Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-5">
          <img
            src={imageSrc}
            alt="Guide"
            className="w-32 h-32 rounded-xl object-cover"
          />

          <div>
            <h1 className="text-3xl font-semibold flex items-center gap-2">
              {guide.fullName}
              <span className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs border">
                <ShieldCheck size={15} /> Verified
              </span>
            </h1>

            <p className="text-gray-600 mt-1 flex items-center gap-1">
              <MapPin size={16} /> Nepal
            </p>

            <div className="flex items-center gap-5 text-sm mt-2">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span>4.9</span>
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
