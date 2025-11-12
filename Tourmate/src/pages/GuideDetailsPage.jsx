import React from "react";
import Navbar from "../components/Dashboard/Navigation";
import GuideHeader from ".././components/GuideDetais/GuideHeader";
import AboutSection from "../components/GuideDetais/AboutSection";
import TourPackages from "../components/GuideDetais/TourPackages";
import ReviewsSection from "../components/GuideDetais/ReviewSection";

const GuideDetailsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <Navbar />
      <GuideHeader />
      <div className="max-w-6xl mx-auto px-4">
        <AboutSection />
        <TourPackages />
        <ReviewsSection />
      </div>
    </div>
  );
};

export default GuideDetailsPage;
