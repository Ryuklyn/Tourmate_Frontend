import React, { useEffect, useState } from "react";
import { MessageCircle, ThumbsUp, Star, StarHalf, Star as StarOutline } from "lucide-react";
import { commentOnGuideReview, commentOnTourReview, getReviewGuides, getReviewTours } from "../../services/review";
import formatDateTime from "../../utils/dateUtil";


const GuideReview = () => {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewType, setReviewType] = useState("TOUR");
  useEffect(() => {
    const fetchReviews = async () => {
      const res =
        reviewType === "TOUR"
          ? await getReviewTours()
          : await getReviewGuides();

      if (res.success) {
        setReviews(res.reviews);
        setAvgRating(res.averageRating);
        setTotalReviews(res.totalReviews);
      }
    };

    fetchReviews();
  }, [reviewType]);
  const handleResponse = async (reviewId) => {
    const review = reviews.find((r) => r.id === reviewId);
    if (!review.userResponse?.trim()) return;

    const res =
      reviewType === "TOUR"
        ? await commentOnTourReview(reviewId, review.userResponse)
        : await commentOnGuideReview(reviewId, review.userResponse);

    if (res.success) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? { ...r, guideComment: review.userResponse, userResponse: "" }
            : r
        )
      );
    }
  };
  const RatingStars = ({ avgRating }) => {
    const fullStars = Math.floor(avgRating);
    const hasHalfStar = avgRating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex gap-1 mt-2">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ))}

        {/* Half star */}
        {hasHalfStar && <StarHalf className="w-5 h-5 text-yellow-400 fill-yellow-400" />}

        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOutline key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
      <p className="text-gray-500 mt-1">Feedback from your tour guests</p>
      {/* {Swtiching between guide and tour review} */}




      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setReviewType("TOUR")}
          className={`px-4 py-2 rounded-lg font-medium ${reviewType === "TOUR"
            ? "bg-[#0faf94] text-white"
            : "bg-gray-100 text-gray-700"
            }`}
        >
          Tour Reviews
        </button>

        <button
          onClick={() => setReviewType("GUIDE")}
          className={`px-4 py-2 rounded-lg font-medium ${reviewType === "GUIDE"
            ? "bg-[#0faf94] text-white"
            : "bg-gray-100 text-gray-700"
            }`}
        >
          Guide Reviews
        </button>
      </div>






      {/* {Swtiching between guide and tour review} */}
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="p-5 border border-gray-300 rounded-xl shadow-sm bg-white">
          <p className="text-sm text-gray-500">Average Rating</p>
          <h2 className="text-3xl font-bold mt-1">
            {avgRating} <span className="text-lg font-medium text-gray-600">/5.0</span>
          </h2>
          <RatingStars avgRating={avgRating} />
        </div>

        <div className="p-5 border border-gray-300 rounded-xl shadow-sm bg-white">
          <p className="text-sm text-gray-500">Total Reviews</p>
          <h2 className="text-3xl font-bold mt-1">{totalReviews}</h2>
          {reviewType === "TOUR" && (<p className="text-gray-600 text-sm">From all tours</p>)}
          {reviewType === "GUIDE" && (<p className="text-gray-600 text-sm">From all guides</p>)}

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
                <h3 className="font-semibold text-lg">{review.reviewerName}</h3>
                {reviewType === "TOUR" && review.tour && (
                  <p className="text-sm text-gray-500">{review.tour.name}</p>
                )}

                <div className="flex gap-1 mt-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500">{formatDateTime(review.createdAt)}</p>
            </div>

            {/* Comment */}
            <p className="text-gray-700 mt-3">{review.reviewText}</p>

            {/* Existing Response */}
            {review.guideComment && (

              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                <p className="flex items-center gap-2 font-medium">
                  <MessageCircle className="w-4 h-4 text-blue-600" /> Your Response
                  <p className="text-sm text-gray-500">{formatDateTime(review.createdAt)}</p>
                </p>
                <p className="mt-1 text-sm">{review.guideComment}</p>

              </div>
              

              
            )}

            {/* Add Response Input */}
            {!review.guideComment && (
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
