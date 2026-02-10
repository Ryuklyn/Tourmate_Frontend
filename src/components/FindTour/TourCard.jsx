import React from "react";
import { MapPin, Clock, CheckCircle, Heart, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { displayName } from "../../services/enumFormatter";

const TourCard = ({ tour, onToggleFavourite }) => {
  const navigate = useNavigate();
  const imageSrc = tour.tourPic
    ? `data:image/jpeg;base64,${tour.tourPic}`
    : "/default-avatar.png";
  const handleViewPackage = () => {
    navigate(`/dashboard/tourdetails/${tour.id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      {/* Image */}
      <div className="relative">
        <img
          src={imageSrc}
          alt={tour.name}
          className="w-full h-56 object-cover"
        />

        {tour.status === "Active" && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            <CheckCircle size={14} />
            Verified
          </div>
        )}

        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow text-sm font-semibold">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-gray-800">{tour.averageRating}</span>
        </div>
        
        <button
          type="button"
          className="absolute bottom-3 right-3 z-20
          w-12 h-12
          bg-white rounded-full! shadow-md
          flex items-center justify-center"
          onClick={() => onToggleFavourite(tour.id)}
        >
          <Heart size={18} className={
                tour.favorited
                  ? "text-red-500 fill-red-500 shrink-0"
                  : "text-gray-900 shrink-0"
              } />
        </button>
      </div>
      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">{tour.name}</h3>

        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin size={14} className="mr-1 text-blue-500" />
          {tour.location}
        </div>

        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
          {tour.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-blue-500" />
            {tour.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} className="text-blue-500" />
            {tour.bookings} reviews
          </div>
        </div>

        {/* Tags */}

                {/* Categories → Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tour.categories.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium"
            >
              {displayName(tag)}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-6">
          <div>
            <p className="text-blue-600 text-2xl font-bold">{tour.price}</p>
            <p className="text-xs text-gray-500">per package</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewPackage(tour);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
          >
            View Package
          </button>

        </div>
      </div>
    </div>
  );
};

export default TourCard;
