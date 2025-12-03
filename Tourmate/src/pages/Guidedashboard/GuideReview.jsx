import React, { useState } from "react";
import { Star, MessageCircle, ThumbsUp } from "lucide-react";

const reviewsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    tour: "Historic Downtown Walking Tour",
    rating: 5,
    comment:
      "Alex was an amazing guide! Very knowledgeable and engaging. The tour exceeded our expectations. Highly recommend!",
    date: "Dec 10, 2025",
    helpful: 12,
    response: "",
    userResponse: "",
  },
  {
    id: 2,
    name: "Michael Chen",
    tour: "Food & Culture Experience",
    rating: 5,
    comment:
      "One of the best food tours we’ve ever taken. Alex’s passion for local cuisine really shines through. Every stop was incredible!",
    date: "Dec 8, 2025",
    helpful: 8,
    response:
      "Thank you so much, Michael! It was a pleasure showing you around. Hope to see you again!",
  },
  {
    id: 3,
    name: "Emma Wilson",
    tour: "Sunset Harbor Cruise",
    rating: 4,
    comment:
      "Beautiful experience! The sunset was stunning. Only minor issue was the tour ran a bit late, but overall fantastic.",
    date: "Dec 5, 2025",
    helpful: 5,
    response: "",
  },
];

const GuideReview = () => {
  const [reviews, setReviews] = useState(reviewsData);

  const handleResponse = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, response: r.userResponse, userResponse: "" } : r
      )
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
      <p className="text-gray-500 mt-1">Feedback from your tour guests</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="p-5 border border-gray-300 rounded-xl shadow-sm bg-white">
          <p className="text-sm text-gray-500">Average Rating</p>
          <h2 className="text-3xl font-bold mt-1">
            4.9 <span className="text-lg font-medium text-gray-600">/5.0</span>
          </h2>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
        </div>

        <div className="p-5 border border-gray-300 rounded-xl shadow-sm bg-white">
          <p className="text-sm text-gray-500">Total Reviews</p>
          <h2 className="text-3xl font-bold mt-1">142</h2>
          <p className="text-gray-600 text-sm">From all tours</p>
        </div>

        <div className="p-5 border border-gray-300 rounded-xl shadow-sm bg-white">
          <p className="text-sm text-gray-500">Response Rate</p>
          <h2 className="text-3xl font-bold mt-1">95%</h2>
          <p className="text-gray-600 text-sm">Within 24 hours</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="mt-6 space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.tour}</p>

                <div className="flex gap-1 mt-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>

            {/* Comment */}
            <p className="text-gray-700 mt-3">{review.comment}</p>

            {/* Existing Response */}
            {review.response && (
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                <p className="flex items-center gap-2 font-medium">
                  <MessageCircle className="w-4 h-4 text-blue-600" /> Your
                  Response
                </p>
                <p className="mt-1 text-sm">{review.response}</p>
              </div>
            )}

            {/* Add Response Input */}
            {!review.response && (
              <div className="mt-4">
                <textarea
                  value={review.userResponse}
                  onChange={(e) =>
                    setReviews((prev) =>
                      prev.map((r) =>
                        r.id === review.id
                          ? { ...r, userResponse: e.target.value }
                          : r
                      )
                    )
                  }
                  placeholder="Write your response..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <button
                  onClick={() => handleResponse(review.id)}
                  className="mt-2 px-4 py-2 bg-[#0faf94] hover:bg-[#0e8c7d] text-white rounded-lg font-medium"
                >
                  Send Response
                </button>
              </div>
            )}

            {/* Helpful */}
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
              <ThumbsUp className="w-4 h-4" /> {review.helpful} found this
              helpful
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideReview;
