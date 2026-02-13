import React from "react";
import GuideCard from "./GuideCard";
import NirojSirImg from "../../assets/img/NirojSir.jpg";
import { useNavigate } from "react-router-dom";
//not used
const GuidesSection = () => {
  const navigate = useNavigate();
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
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h3 className="text-3xl font-bold text-center text-gray-900 mb-2">
        Meet Our Top-Rated Guides
      </h3>
      <p className="text-center text-gray-600 mb-12">
        Trusted experts ready to show you the world
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {guides.map((guide, idx) => (
          <GuideCard key={idx} guide={guide} />
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <button onClick={() => navigate("/dashboard/findguide")} className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50">
          Load More
        </button>
        <button onClick={() => navigate("/dashboard/findguide")} className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600">
          Explore All Guides
        </button>
      </div>
    </div>
  );
};

export default GuidesSection;
