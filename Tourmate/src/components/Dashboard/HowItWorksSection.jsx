import React from "react";
import { Search, Calendar, Compass } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      number: 1,
      title: "Browse & Discover",
      description:
        "Search through our network of verified local guides across the globe",
    },
    {
      icon: Calendar,
      number: 2,
      title: "Book & Connect",
      description:
        "Choose your preferred date and connect with your perfect guide",
    },
    {
      icon: Compass,
      number: 3,
      title: "Explore & Enjoy",
      description: "Experience authentic adventures with locals who know best",
    },
  ];

  return (
    <section id="how-it-works">
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-2">
          How Tour Mate Works
        </h3>
        <p className="text-center text-gray-600 mb-12">
          Three simple steps to start your perfect travel experience
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {step.number}
              </div>
              <step.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="font-bold text-xl text-gray-900 mb-2">
                {step.title}
              </h4>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default HowItWorksSection;
