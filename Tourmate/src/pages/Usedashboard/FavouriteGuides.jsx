import React from "react";
import { MapPin, Heart } from "lucide-react";
import NirojSirImg from "../../assets/img/NirojSir.jpg";

export default function FavoriteGuides() {
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
        My Favorite Guides
      </h1>
      <p className="text-gray-600 mb-6">
        Your saved guides are always ready for your next adventure
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {guides.map((g, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-4 flex flex-col relative"
          >
            <button className="absolute top-3 right-3 p-2 rounded-full hover:scale-110 transition z-10">
              <Heart className="text-red-500 fill-red-500" size={20} />
            </button>

            {/* Avatar Card */}
            <div className="w-full h-72 rounded-xl flex items-center justify-center">
              <img
                src={g.image}
                alt={g.name}
                className="w-full h-full rounded-xl object-cover shadow"
              />
            </div>

            {/* Details */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold">{g.name}</h2>
              <p className="text-gray-500 text-sm mt-1 flex items-center">
                <MapPin size={14} className="mr-1" /> {g.location}
              </p>

              <div className="text-sm text-gray-700 mt-3">
                <span className="font-semibold">Languages:</span> {g.languages}
              </div>

              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>
                  ⭐ {g.rating} ({g.reviews})
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-5">
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
