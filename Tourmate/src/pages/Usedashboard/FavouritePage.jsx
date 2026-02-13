

import React, { useEffect, useState } from "react";
import { MapPin, Heart, Star, Calendar, DollarSign } from "lucide-react";

import Everest from "../../assets/img/Everest.jpg";
import Pokhara from "../../assets/img/Pokhara.jpg";
import Chitwan from "../../assets/img/Chitwan.jpg";
import Lumbini from "../../assets/img/Lumbini.jpg";
import Patan from "../../assets/img/Patan.jpg";
import {
  getFavouritedGuides,
  toggleFavouriteGuide,
} from "../../services/guideData";
import { useNavigate } from "react-router-dom";
import { getFavouritedTours, toggleFavouriteTour } from "../../services/tour/tourData";

export default function FavoritesPage() {
  const [guides, setGuides] = useState([]);
  const [tours, setTours] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavouritesGuides = async () => {
      const res = await getFavouritedGuides();
      if (res.success) {
        // Keep the full favourite object
        const onlyGuides = res.data.filter(item => item.type === "GUIDE");
        setGuides(onlyGuides);
      }
    };
    const fetchFavouritesTours = async () => {
      const res = await getFavouritedTours();
      if (res.success) {
        // Keep the full favourite object
        const onlyTours = res.data.filter(item => item.type === "TOUR");
        setTours(onlyTours);
      }
    };
    fetchFavouritesTours();
    fetchFavouritesGuides();
  }, []);
  const handleViewProfile = (guideId) => {
    navigate(`/dashboard/guideprofile/${guideId}`);
  };
  const handleUnfavouriteGuide = async (guideId) => {
    // Optimistically update UI

    // Call API
    const res = await toggleFavouriteGuide(guideId);
    if (res.success) {
      setGuides(prev => prev.filter(fav => fav.guide.guideId !== guideId));
    }

    if (!res.success) {
      // Rollback if API fails
      const retry = await getFavouritedGuides();
      if (retry.success) setGuides(retry.data.filter(item => item.type === "GUIDE"));
    }
  };

  const handleUnfavouriteTour = async (tourId) => {

    // Call API
    const res = await toggleFavouriteTour(tourId);
    if (res.success) {
      setTours(prev => prev.filter(fav => fav.tour.id !== tourId));
    }

    if (!res.success) {
      // Rollback if API fails
      const retry = await getFavouritedTours();
      if (retry.success) setTours(retry.data.filter(item => item.type === "TOUR"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-2">Favourite Guides</h1>
      <p className="text-gray-600 mb-4">Your saved guides are ready anytime</p>

      {guides.length === 0 ? (
        <p className="text-gray-500">No favourite guides yet.</p>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4">
          {guides.map((fav) => {
            const g = fav.guide; // actual guide object
            const imageSrc = g.profilePic
              ? `data:image/jpeg;base64,${g.profilePic}`
              : "/default-avatar.png";

            return (
              <div key={g.guideId} className="bg-white rounded-2xl shadow p-4 min-w-[330px] relative">
                <button
                  onClick={() => handleUnfavouriteGuide(g.guideId)}
                  className="absolute top-3 right-3 p-2 rounded-full hover:scale-110 transition z-10"
                >
                  <Heart className="text-red-500 fill-red-500" size={20} />
                </button>

                <div className="w-full h-60 rounded-xl overflow-hidden">
                  <img src={imageSrc} alt={g.fullName} className="w-full h-full object-cover" />
                </div>

                <div className="mt-4">
                  <h2 className="text-lg font-semibold">{g.fullName}</h2>

                  <p className="text-gray-500 text-sm flex items-center mt-1">
                    <MapPin size={14} className="mr-1" /> {g.location ?? "Not specified"}
                  </p>

                  <p className="text-sm mt-2">
                    <span className="font-semibold">Languages:</span>{" "}
                    {g.languages && g.languages.length > 0 ? g.languages.join(", ") : "Not specified"}
                  </p>

                  <div className="flex items-center gap-1 text-sm mt-2">
                    <Star className="text-yellow-500 fill-yellow-500" size={16} />
                    {fav.averageRating > 0 ? fav.averageRating.toFixed(1) : "0"} ({fav.totalReviews} reviews)
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button className="w-full py-2 bg-blue-600 text-white rounded-lg"  >Book Now</button>
                    <button onClick={() => handleViewProfile(g.guideId)} className="w-full py-2 border border-gray-300 rounded-lg" >Profile</button>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      )}

      {/* Favorite Tour Packages Section */}
      <h1 className="text-2xl font-bold mt-10 mb-2">Favourite Tour Packages</h1>
      <p className="text-gray-600 mb-4">
        Hand-picked packages for your next adventure
      </p>

      {tours.length === 0 ? (
        <p className="text-gray-500">No favourite tours yet.</p>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4">
          {tours.map((item) => {
            const tour = item.tour;

            return (
              <div
                key={item.id}
                className="relative bg-white rounded-2xl shadow p-4 min-w-[300px]"
              >
                <button
                  onClick={() => handleUnfavouriteTour(tour.id)}
                  className="absolute top-3 right-3 p-2 rounded-full hover:scale-110 transition z-10"
                >
                  <Heart className="text-red-500 fill-red-500" size={20} />
                </button>
                <div className="w-full h-56 rounded-lg overflow-hidden">

                  <img
                    src={
                      tour.tourPic
                        ? `data:image/jpeg;base64,${tour.tourPic}`
                        : "/default-avatar.png"
                    }
                    alt={tour.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-lg font-semibold mt-3">{tour.name}</h2>
                <button
                  onClick={() => handleUnfavouriteTour(tour.id)}
                  className="absolute top-3 right-3 p-2 rounded-full hover:scale-110 transition z-10"
                >
                  <Heart className="text-red-500 fill-red-500" size={20} />
                </button>
                {/* Duration */}
                <p className="flex items-center text-gray-600 text-sm mt-1">
                  <Calendar size={16} className="mr-1" />
                  {tour.duration}
                </p>

                {/* Price */}
                <p className="flex items-center text-blue-600 font-bold mt-3 text-lg">
                  <span className="text-green-600 font-semibold text-sm mr-1">
                    Rs.
                  </span>
                  {tour.price}
                </p>

                <button onClick={() => navigate(`/dashboard/tourdetails/${tour.id}`)} className="w-full py-2 bg-blue-600 text-white rounded-lg mt-4">
                  View Package
                </button>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
