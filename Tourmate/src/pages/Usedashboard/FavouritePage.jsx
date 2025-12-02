import React from "react";
import { MapPin, Heart, Star, Calendar, DollarSign } from "lucide-react";
import NirojSirImg from "../../assets/img/NirojSir.jpg";

import Everest from "../../assets/img/Everest.jpg";
import Pokhara from "../../assets/img/Pokhara.jpg";
import Chitwan from "../../assets/img/Chitwan.jpg";
import Lumbini from "../../assets/img/Lumbini.jpg";
import Patan from "../../assets/img/Patan.jpg";

export default function FavoritesPage() {
  const guides = [
    {
      name: "Niroj Shrestha",
      location: "Lalitpur, Nepal",
      languages: "English, Nepali, Japanese",
      rating: 4.9,
      reviews: 127,
      image: NirojSirImg,
    },
    {
      name: "Nora Kamber",
      location: "Paris, France",
      languages: "English, French, German",
      rating: 5.0,
      reviews: 203,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    },
    {
      name: "Kate Brown",
      location: "Tokyo, Japan",
      languages: "English, Japanese",
      rating: 4.8,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop",
    },
    {
      name: "Mike Johnson",
      location: "Barcelona, Spain",
      languages: "English, Spanish, Catalan",
      rating: 4.9,
      reviews: 189,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    },
  ];

  const packages = [
    {
      name: "Everest Base Camp Trek",
      days: "12 Days",
      price: "$899",
      image: Everest,
    },
    {
      name: "Pokhara Lakeside Tour",
      days: "3 Days",
      price: "$199",
      image: Pokhara,
    },
    {
      name: "Chitwan Jungle Safari",
      days: "2 Days",
      price: "$149",
      image: Chitwan,
    },
    {
      name: "Patan Heritage Walk",
      days: "3 Days",
      price: "$199",
      image: Patan,
    },
    {
      name: "Lumbini Pilgrimage Tour",
      days: "2 Days",
      price: "$149",
      image: Lumbini,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Favorite Guides Section */}
      <h1 className="text-2xl font-bold mb-2">Favourite Guides</h1>
      <p className="text-gray-600 mb-4">Your saved guides are ready anytime</p>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {guides.map((g, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-4 min-w-[330px] relative"
          >
            <button className="absolute top-3 right-3 p-2 rounded-full hover:scale-110 transition z-10">
              <Heart className="text-red-500 fill-red-500" size={20} />
            </button>

            <div className="w-full h-60 rounded-xl overflow-hidden">
              <img
                src={g.image}
                alt={g.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold">{g.name}</h2>

              {/* Location */}
              <p className="text-gray-500 text-sm flex items-center mt-1">
                <MapPin size={14} className="mr-1" /> {g.location}
              </p>

              {/* Languages */}
              <p className="text-sm mt-2">
                <span className="font-semibold">Languages:</span> {g.languages}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 text-gray-700 text-sm mt-2">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                {g.rating} ({g.reviews})
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg">
                  Book Now
                </button>
                <button className="w-full py-2 border border-gray-300 rounded-lg">
                  Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Favorite Tour Packages Section */}
      <h1 className="text-2xl font-bold mt-10 mb-2">Favourite Tour Packages</h1>
      <p className="text-gray-600 mb-4">
        Hand-picked packages for your next adventure
      </p>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {packages.map((p, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-4 min-w-[300px]"
          >
            <div className="w-full h-56 rounded-lg overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-lg font-semibold mt-3">{p.name}</h2>

            {/* Days */}
            <p className="flex items-center text-gray-600 text-sm mt-1">
              <Calendar size={16} className="mr-1" /> {p.days}
            </p>

            {/* Price */}
            <p className="flex items-center text-blue-600 font-bold mt-3 text-lg">
              <DollarSign size={18} className="mr-1" />
              {p.price}
            </p>

            <button className="w-full py-2 bg-blue-600 text-white rounded-lg mt-4">
              View Package
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
