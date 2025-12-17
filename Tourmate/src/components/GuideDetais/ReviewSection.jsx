import { useState } from "react";

export default function ReviewsSection({ onAddReview }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim() || rating === 0) return;

    onAddReview({
      name: "Anonymous User",
      rating,
      text: comment.trim(),
      date: new Date().toISOString().split("T")[0],
      img: "https://randomuser.me/api/portraits/lego/1.jpg",
    });

    setRating(0);
    setComment("");
  };

  return (
    <div className="mt-10 border border-gray-200 p-4 pt-6 rounded-xl">
      <h4 className="font-semibold mb-3 text-gray-800">Add your review</h4>

      {/* Stars */}
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-2xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
        <span className="text-sm text-gray-600">{rating}/5</span>
      </div>

      {/* <input
        type="range"
        min="0"
        max="5"
        value={rating}
        onChange={(e) => setRating(+e.target.value)}
        className="w-full mb-4 accent-yellow-400"
      /> */}

      <textarea
        rows="3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Submit Review
      </button>
    </div>
  );
}
