import React from "react";
import GuideHeader from "../Usedashboard/GuideDetailComp/GuideHeader";
import BookingSidebar from "../Usedashboard/GuideDetailComp/BookingSidebar";
import TourPackages from "../Usedashboard/GuideDetailComp/TourPackage";
import Mustang from "../../assets/img/Mustang.jpg";
import Reviews from "./GuideDetailComp/Reviews";

export default function GuideProfile() {
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
            <GuideHeader />
            <TourPackages />
            <Reviews />
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
