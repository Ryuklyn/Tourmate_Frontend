// import { useState } from "react";
// import { Star } from "lucide-react";
// import ReviewsSection from "../../../components/GuideDetais/ReviewSection";

// export default function Reviews() {
//   const [reviews, setReviews] = useState([
//     {
//       name: "Jennifer M.",
//       date: "2024-02-15",
//       img: "https://randomuser.me/api/portraits/women/44.jpg",
//       rating: 5,
//       text: "Maria was absolutely fantastic! Her knowledge of Barcelona's history is incredible.",
//     },
//     {
//       name: "David K.",
//       date: "2024-02-10",
//       img: "https://randomuser.me/api/portraits/men/46.jpg",
//       rating: 5,
//       text: "Best tour we've ever taken! Maria's passion for her city really shows.",
//     },
//   ]);

//   const addReview = (newReview) => {
//     setReviews((prev) => [newReview, ...prev]);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mt-6 overflow-auto">
//       <h2 className="text-2xl font-semibold mb-4">
//         Reviews ({reviews.length})
//       </h2>

//       {/* Reviews List */}
//       {reviews.map((rev, i) => (
//         <div key={i} className="pb-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <img
//                 src={rev.img}
//                 className="w-12 h-12 rounded-full object-cover"
//                 alt={rev.name}
//               />
//               <div>
//                 <p className="font-semibold">{rev.name}</p>
//                 <div className="flex text-yellow-500">
//                   {Array.from({ length: rev.rating }).map((_, idx) => (
//                     <Star key={idx} size={16} fill="currentColor" />
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <p className="text-gray-500 text-sm">{rev.date}</p>
//           </div>

//           <p className="text-gray-700 mt-3">{rev.text}</p>

//           {i < reviews.length - 1 && <hr className="mt-6 border-gray-200" />}
//         </div>
//       ))}

//       {/* Add Review Section */}

//       <ReviewsSection onAddReview={addReview} />
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import ReviewsSection from "../../../components/GuideDetais/ReviewSection";
import { getGuideReviews } from "../../../services/review";

export default function Reviews({ guideId }) {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await getGuideReviews(guideId);
      console.log(res);
      if (res.success) {
        setReviews(res.reviews);
        setAvgRating(res.averageRating);
        setTotalReviews(res.totalReviews);
      }
    };
    fetchReviews();
  }, [guideId]);

  const addReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
    setTotalReviews((prev) => prev + 1);
    setAvgRating((prev) => (prev * reviews.length + newReview.rating) / (reviews.length + 1));
  };

  if (!reviews.length) return <div className="p-4 text-center">No reviews yet.</div>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6 overflow-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Reviews ({totalReviews}) - Avg: {avgRating.toFixed(1)}
      </h2>

      {reviews.map((rev, i) => (
        <div key={rev.id} className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={rev.reviewerProfilePic ? `data:image/jpeg;base64,${rev.reviewerProfilePic}` : "/default-avatar.png"}
                className="w-12 h-12 rounded-full object-cover"
                alt={rev.reviewerName}
              />
              <div>
                <p className="font-semibold">{rev.reviewerName}</p>
                <div className="flex text-yellow-500">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm">{rev.createdAt}</p>
          </div>
          <p className="text-gray-700 mt-3">{rev.reviewText}</p>
          {i < reviews.length - 1 && <hr className="mt-6 border-gray-200" />}
        </div>
      ))}

    <ReviewsSection guideId={guideId} onAddReview={addReview} />

    </div>
  );
}
