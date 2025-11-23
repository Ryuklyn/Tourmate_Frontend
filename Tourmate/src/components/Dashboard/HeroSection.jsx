import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WorldMap from "../../assets/img/Map.jpg";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleFindGuide = () => {
    navigate("/find-guide");
  };

  const handleBecomeGuide = () => {
    navigate("/signup");
  };

  return (
    <div className="relative bg-linear-to-br from-blue-50 to-blue-100 py-20 px-4">
      <div className="absolute inset-0">
        {/* <div
          className="w-full h-full"
          style={{
            backgroundImage: "url(" + Map + ")",
            backgroundSize: "100px 100px",
          }}
        ></div> */}
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${WorldMap})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            height: "100%",
          }}
        ></div>
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Find your perfect <span className="text-blue-500">local guide</span>
        </h2>
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          anywhere in the world
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with verified local experts who will transform your travel
          experience into unforgettable adventures
        </p>

        <div className="bg-white rounded-lg shadow-lg p-2 max-w-2xl mx-auto flex items-center mb-6">
          <MapPin className="w-5 h-5 text-gray-400 ml-3" />
          <input
            type="text"
            placeholder="Search by location, language, or guide name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 outline-none text-gray-700"
          />
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
            Search
          </button>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleFindGuide}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
          >
            Find a Guide
          </button>
          <button
            onClick={handleBecomeGuide}
            className="bg-white text-gray-700 px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50"
          >
            Become a Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
