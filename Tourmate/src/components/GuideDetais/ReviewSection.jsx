import React from "react";

const reviews = [
  {
    name: "Jessica M.",
    comment:
      "Maria was absolutely fantastic! Her knowledge of Barcelona’s history is incredible.",
  },
  {
    name: "David R.",
    comment:
      "Best tour we’ve ever taken! Maria’s passion for her city really shows.",
  },
  {
    name: "Sarah L.",
    comment:
      "Great tour with lots of interesting historical facts. Highly recommended!",
  },
  {
    name: "Michael T.",
    comment:
      "Maria is an exceptional guide. Her English is perfect and she knows all the hidden gems.",
  },
];

const ReviewsSection = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6 mb-10">
      <h3 className="text-lg font-semibold mb-4">Reviews ({reviews.length})</h3>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.name} className="border-b pb-3">
            <p className="font-medium text-gray-800">{r.name}</p>
            <p className="text-gray-600 text-sm mt-1">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
