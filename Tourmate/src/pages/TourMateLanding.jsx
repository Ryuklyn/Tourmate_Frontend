import React from "react";
import Navigation from "../components/Dashboard/Navigation";
import HeroSection from "../components/Dashboard/HeroSection";
import GuidesSection from "../components/Dashboard/GuideSection";
import HowItWorksSection from "../components/Dashboard/HowItWorksSection";
import CTASection from "../components/Dashboard/CTASection";
import Footer from "../components/Dashboard/Footer";
import "../../src/App.css";
const TourMateLanding = () => {
  return (
    <div className="bg-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <GuidesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default TourMateLanding;
