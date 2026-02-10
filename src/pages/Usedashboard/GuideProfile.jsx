import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GuideHeader from "../Usedashboard/GuideDetailComp/GuideHeader";
import BookingSidebar from "../Usedashboard/GuideDetailComp/BookingSidebar";
import TourPackages from "../Usedashboard/GuideDetailComp/TourPackage";
import Reviews from "./GuideDetailComp/Reviews";

import Mustang from "../../assets/img/Mustang.jpg";
import { getGuideById } from "../../services/guideData";

export default function GuideProfile() {
  const { guideId } = useParams();

  const [guide, setGuide] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [activeTour, setActiveTour] = useState(null);

  const clearSelectedTour = () => {
    setSelectedTour(null);
    setActiveTour(null);
  };

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const res = await getGuideById(guideId);
        setGuide(res.data);
      } catch (error) {
        console.error("Failed to fetch guide:", error);
      }
    };

    fetchGuide();
  }, [guideId]);

  if (!guide) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Background */}
      <div
        className="w-full h-[350px] bg-cover bg-center"
        style={{ backgroundImage: `url(${Mustang})` }}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section */}
          <div className="flex-1">
            <GuideHeader guide={guide} />

            <TourPackages
              guideId={guideId}
              activeTour={activeTour}
              setActiveTour={setActiveTour}
              selectedTour={selectedTour}
              setSelectedTour={setSelectedTour}
            />

            <Reviews guideId={guideId} />
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/3">
            <BookingSidebar
              guide={guide}
              selectedTour={selectedTour}
              clearSelectedTour={clearSelectedTour}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
