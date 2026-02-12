// GuideApproval.jsx
import { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  Briefcase,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
import GuideReviewModal from "../../components/Admin/GuideReviewModel";
import RejectApplicationModal from "../../components/Admin/RejectApplicationModal";
import { decideGuide, getPendingGuideRequest } from "../../services/admin/guideRegistration";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GuideApproval() {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [guides, setGuides] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectGuide, setRejectGuide] = useState(null);

  // Fetch pending guides
  useEffect(() => {
    async function fetchPending() {
      try {
        const res = await getPendingGuideRequest();
        if (res.success && res.data && Array.isArray(res.data.data)) {
          setGuides(res.data.data);
        } else {
          setGuides([]);
        }
      } catch (err) {
        toast.error("Failed to fetch pending guides.");
        console.error(err);
      }
    }
    fetchPending();
  }, []);

  // Handle approve/reject decisions
  const handleDecision = async (guideId, action, reason = "") => {
    try {
      if (action.toLowerCase() === "reject" && !reason.trim()) {
        toast.error("Please provide a reason for rejection.");
        return;
      }

      const res = await decideGuide(guideId, action, reason);

      if (res?.success) {
        toast.success(`Guide ${action}d successfully`);
        setGuides(prev => prev.filter(g => g.guideId !== guideId));
        if (selectedGuide?.guideId === guideId) setSelectedGuide(null);
        if (rejectGuide?.guideId === guideId) setRejectGuide(null);
        setShowRejectModal(false);
      } else {
        toast.error(`Failed to process guide decision: ${res?.data || "Unknown error"}`);
      }
    } catch (err) {
      toast.error("An error occurred while processing the decision.");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">Guide Approvals</h1>
      <p className="text-gray-600 mb-6">Review and approve new guide applications</p>

      <div className="grid grid-cols-3 gap-6">
        {guides.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center p-10 bg-white rounded-xl border border-gray-200 shadow-sm">
            <MapPin size={40} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-500">
              No pending guide applications
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              All guides have been reviewed or no applications submitted yet.
            </p>
          </div>
        ) : (
          guides.map((guide) => (
            <div
              key={guide.guideId}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`data:image/jpeg;base64,${guide.profilePic}`}
                  alt={guide.fullName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold text-lg">{guide.fullName}</h2>
                  <p className="text-gray-500 text-sm">{guide.email}</p>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <MapPin size={14} /> {guide.location}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <Calendar size={16} /> Applied:
                  <span className="font-medium">
                    {guide.createdAt
                      ? new Date(guide.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                      : "N/A"}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Briefcase size={16} /> Experience:
                  <span className="font-medium">{guide.experience}</span>
                </p>
                <p className="flex items-center gap-2 text-xs text-green-700 font-semibold">
                  Rate: <span className="font-medium">Rs. {guide.price}</span>
                </p>
              </div>

              {/* Specializations */}
              <div className="mt-4">
                <h4 className="font-medium text-gray-400">Specializations:</h4>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {guide.categories.map((s, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification Status */}
              <div className="mt-4">
                <h4 className="font-medium text-gray-400">Verification Status:</h4>
                <div className="flex flex-wrap gap-2 mt-2 text-sm">
                  {guide.governmentPic && (
                    <div className="flex items-center gap-2 text-[#0faf94] bg-green-200 px-3 py-1 rounded-full font-medium">
                      <CheckCircle size={16} />
                      <span className="font-medium">Image Verified</span>
                    </div>
                  )}
                  {guide.governmentNumber && (
                    <div className="flex items-center gap-2 text-[#0faf94] bg-green-200 px-3 py-1 rounded-full font-medium">
                      <CheckCircle size={16} />
                      <span className="font-medium">ID Verified</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center pt-4 mt-4 border-t border-gray-200 gap-1.5 justify-center">
                <button
                  onClick={() => setSelectedGuide(guide)}
                  className="flex items-center gap-1 text-orange-500 font-medium text-xs hover:bg-orange-50 px-2 py-1 rounded-md border border-orange-200 whitespace-nowrap"
                >
                  <Eye size={14} /> Review
                </button>

                <button
                  onClick={() => handleDecision(guide.guideId, "approve")}
                  className="flex items-center gap-1 text-[#0faf94] font-medium text-xs hover:bg-green-50 px-2 py-1 rounded-md border border-green-200 whitespace-nowrap"
                >
                  <CheckCircle size={14} /> Approve
                </button>

                <button
                  onClick={() => {
                    setRejectGuide(guide);
                    setShowRejectModal(true);
                  }}
                  className="flex items-center gap-1 text-red-600 font-medium text-xs hover:bg-red-50 px-2 py-1 rounded-md border border-red-200 whitespace-nowrap"
                >
                  <XCircle size={14} /> Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Review Modal */}
      {selectedGuide && (
        <GuideReviewModal
          guide={selectedGuide}
          onClose={() => setSelectedGuide(null)}
          onDecision={handleDecision}
        />
      )}

      {/* Reject Modal */}
      {showRejectModal && rejectGuide && (
        <RejectApplicationModal
          onClose={() => setShowRejectModal(false)}
          onReject={(reason) =>
            handleDecision(rejectGuide.guideId, "reject", reason)
          }
        />
      )}
    </div>
  );
}
