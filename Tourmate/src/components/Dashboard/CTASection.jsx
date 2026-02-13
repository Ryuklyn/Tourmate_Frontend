import React from "react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  const handleFindGuide = () => {
    console.log("Navigating to Find Guide page");
    navigate("/find-guide");
  };

  const handleBecomeGuide = () => {
    console.log("Navigating to Signup page");
    navigate("/signup");
  };

  return (
    <section id="support">
      <div className="bg-linear-to-r from-blue-500 to-blue-600 py-16 px-4 text-white text-center">
        <h3 className="text-4xl font-bold mb-4">
          Ready to Start Your Adventure?
        </h3>
        <p className="mb-8 text-blue-100 max-w-2xl mx-auto">
          Join thousands of travelers and local experts on a journey to authentic
          experiences and lasting memories.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleFindGuide}
            className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Find Your Guide
          </button>
          <button
            onClick={handleBecomeGuide}
            className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Become a Guide
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
