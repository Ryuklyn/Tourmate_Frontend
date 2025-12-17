import React, { useEffect, useState } from "react";
import GuideHeader from "../Usedashboard/GuideDetailComp/GuideHeader";
import BookingSidebar from "../Usedashboard/GuideDetailComp/BookingSidebar";
import TourPackages from "../Usedashboard/GuideDetailComp/TourPackage";
import Mustang from "../../assets/img/Mustang.jpg";
import Reviews from "./GuideDetailComp/Reviews";
import ReviewsSection from "../../components/GuideDetais/ReviewSection";
import { useParams } from "react-router-dom";
import { getApprovedGuides, getGuideById } from "../../services/guideData";

export default function GuideProfile() {

  const { guideId } = useParams();
  const [guide, setGuide] = useState(null);
  const fetchGuide = async () => {
    try {
      const res = await getGuideById(guideId);  
      setGuide(res.data);
    } catch (error) {
      console.error("Failed to fetch guide:", error);
    }
  };
  

  useEffect(() => {
    fetchGuide();
  }, [guideId]);

  if (!guide){
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Background */}
      <div
        className="w-full h-[350px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${Mustang})`,
        }}
      ></div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section */}
          <div className="flex-1">
            <GuideHeader guide={guide} />
            <TourPackages guideId = {guideId}/>
            <Reviews guideId={ guideId}/>
          </div>

          {/* Right Section (Booking) */}
          <div className="w-full lg:w-1/3">
            <BookingSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
