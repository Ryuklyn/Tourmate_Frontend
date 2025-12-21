import React from "react";
import { MapPin, Clock, CheckCircle, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toggleFavourite } from "../../services/guideData";

// const GuideCard = ({ guide }) => {
//   const navigate = useNavigate();

//   const handleViewProfile = () => {
//     navigate("/dashboard/guideprofile");
//   };

//   return (
//     <div className="bg-white shadow-md rounded-2xl overflow-hidden transition hover:shadow-lg duration-300">
//       {/* Image Section */}
//       <div className="relative">
//         <img
//           src={guide.image}
//           alt={guide.name}
//           className="w-full h-48 object-cover"
//         />

//         {/* Verified Badge */}
//         <div className="absolute top-3 left-3 flex items-center bg-white text-green-600 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
//           <CheckCircle size={14} className="mr-1" />
//           Verified
//         </div>

//         {/* Rating Badge */}
//         <div className="absolute top-3 right-3 flex items-center bg-white text-yellow-500 text-sm font-semibold px-2 py-1 rounded-full shadow-sm">
//           ⭐ <span className="ml-1 text-gray-700">{guide.rating}</span>
//         </div>
//       </div>

//       {/* Info Section */}
//       <div className="p-4">
//         <h3 className="font-semibold text-lg text-gray-900">{guide.name}</h3>

//         {/* Location */}
//         <div className="flex items-center text-gray-500 text-sm mt-1">
//           <MapPin size={14} className="mr-1 text-blue-500" />
//           {guide.location}
//         </div>

//         {/* Description */}
//         <p className="text-gray-600 text-sm mt-2 line-clamp-2">
//           {guide.description}
//         </p>

//         {/* Price and Reviews */}
//         <div className="flex justify-between items-center mt-3">
//           <p className="text-blue-600 font-bold text-lg">${guide.price}</p>
//           <p className="text-gray-500 text-sm">{guide.reviews} reviews</p>
//         </div>

//         {/* Response Time */}
//         <div className="flex items-center text-sm text-gray-500 mt-1">
//           <Clock size={14} className="mr-1 text-blue-500" />
//           Responds in {guide.response}
//         </div>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mt-3">
//           {guide.tags.map((tag, i) => (
//             <span
//               key={i}
//               className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Buttons */}
//         <div className="flex items-center gap-2 mt-4">
//           <button
//             onClick={handleViewProfile}
//             className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition"
//           >
//             View Profile
//           </button>
//           <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition">
//             <Heart size={18} className="text-blue-600" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


const GuideCard = ({ guide, onToggleFavourite }) => {
  const navigate = useNavigate();
  const imageSrc = guide.profilePic
    ? `data:image/jpeg;base64,${guide.profilePic}`
    : "/default-avatar.png";
  const handleViewProfile = () => {
    navigate(`/dashboard/guideprofile/${guide.guideId}`);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg">
      <div className="relative">
        <img src={imageSrc} className="w-full h-48 object-cover" />

        <div className="absolute top-3 left-3 bg-white text-green-600 text-xs px-2 py-1 rounded-full">
          <CheckCircle size={14} className="inline mr-1" />
          Verified
        </div>
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center bg-white text-yellow-500 text-sm font-semibold px-2 py-1 rounded-full shadow-sm">
          ⭐ <span className="ml-1 text-gray-700">{guide.averageRating}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{guide.fullName}</h3>
        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <MapPin size={14} className="mr-1 text-blue-500" />
          {guide.location}
        </div>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {guide.bio}
        </p>

        <div className="flex justify-between items-center mt-3">
          <p className="text-blue-600 font-bold text-lg">
            ${guide.price}
          </p>
        </div>

        {/* Categories → Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {guide.categories.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleViewProfile}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
          >
            View Profile
          </button>

          <button
            className="p-2 rounded-lg bg-blue-50"
            onClick={() => onToggleFavourite(guide.guideId)}
          >
            <Heart
              size={18}
              className={
                guide.favorited
                  ? "text-red-500 fill-red-500"
                  : "text-blue-600"
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default GuideCard;