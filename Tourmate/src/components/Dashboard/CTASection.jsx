import React from "react";

const CTASection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-16 px-4 text-white text-center">
      <h3 className="text-4xl font-bold mb-4">
        Ready to Start Your Adventure?
      </h3>
      <p className="mb-8 text-blue-100 max-w-2xl mx-auto">
        Join thousands of travelers and local experts on a journey to authentic
        experiences and lasting memories
      </p>
      <div className="flex justify-center space-x-4">
        <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100">
          Find Your Guide
        </button>
        <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700">
          Become a Guide
        </button>
      </div>
    </div>
  );
};

export default CTASection;
