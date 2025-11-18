import React from "react";
import { Star } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      name: "Jennifer M.",
      date: "2024-02-15",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      text: "Maria was absolutely fantastic! Her knowledge of Barcelona's history is incredible, and she showed us places we never would have found on our own. The tapas were delicious too!",
    },
    {
      name: "David K.",
      date: "2024-02-10",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
      rating: 5,
      text: "Best tour we've ever taken! Maria's passion for her city really shows. The Gothic Quarter came alive with all the stories and history she shared.",
    },
    {
      name: "Sarah L.",
      date: "2024-02-05",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4,
      text: "Great tour with lots of interesting historical facts. The tapas stop was a nice touch. Would definitely recommend!",
    },
    {
      name: "Michael R.",
      date: "2024-01-28",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      text: "Maria is an exceptional guide. Her English is perfect and she has such deep knowledge of Barcelona. Highly recommended!",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">
        Reviews ({reviews.length})
      </h2>

      {reviews.map((rev, i) => (
        <div key={i} className="pb-6">
          {/* Profile Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={rev.img}
                className="w-12 h-12 rounded-full object-cover"
                alt={rev.name}
              />
              <div>
                <p className="font-semibold">{rev.name}</p>

                {/* Rating */}
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-sm">{rev.date}</p>
          </div>

          {/* Review Text */}
          <p className="text-gray-700 mt-3">{rev.text}</p>

          {/* Divider */}
          {i < reviews.length - 1 && <hr className="mt-6 border-gray-200" />}
        </div>
      ))}
    </div>
  );
}
