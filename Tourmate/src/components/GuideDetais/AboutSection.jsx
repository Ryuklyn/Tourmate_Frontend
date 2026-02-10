import React from "react";

const AboutSection = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-24">
      <h3 className="text-lg font-semibold mb-3">About Maria Santos</h3>
      <p className="text-gray-600 mb-4">
        Passionate local guide with 8+ years of experience showing travelers the
        hidden gems of Barcelona. Born and raised in the Gothic Quarter, I know
        every stone and story of this magical city. I specialize in cultural
        experiences that go beyond typical tourist attractions.
      </p>

      <h4 className="font-semibold mb-2">Experience & Qualifications</h4>
      <p className="text-gray-600 mb-4">
        With 8 years of guiding experience, I’ve led 340+ tours for travelers
        worldwide. Fluent in four languages with deep local insights in art,
        history, and gastronomy.
      </p>

      <div className="flex flex-wrap gap-4">
        <div>
          <h5 className="font-medium mb-1">Languages</h5>
          <div className="flex gap-2 flex-wrap">
            {["Spanish", "English", "French", "Catalan"].map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h5 className="font-medium mb-1">Specialties</h5>
          <div className="flex gap-2 flex-wrap">
            {[
              "Cultural Experience",
              "City Tour",
              "Food Tours",
              "History",
              "Architecture",
            ].map((spec) => (
              <span
                key={spec}
                className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
