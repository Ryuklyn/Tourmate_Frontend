import { useState } from "react";
import { postTourReview } from "../../../services/review";
import { getUserData } from "../../../services/user";

export default function TourReviewsSection({ tourId, onAddReview }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim() || rating === 0) return;

    setLoading(true);

    const reviewPayload = {
      rating,
      review: comment.trim(),
    };

    const res = await postTourReview(tourId, reviewPayload);

    setLoading(false);

    if (res.success) {
      onAddReview(res.data.review);
      setRating(0);
      setComment("");
    } else {
      alert(res.error.message || "Failed to add review.");
    }
  };

  return (
    <div className="mt-10 border border-gray-200 p-4 pt-6 rounded-xl">
      <h4 className="font-semibold mb-3 text-gray-800">Add your review</h4>
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          >
            ★
          </button>
        ))}
        <span className="text-sm text-gray-600">{rating}/5</span>
      </div>

      <textarea
        rows="3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}
