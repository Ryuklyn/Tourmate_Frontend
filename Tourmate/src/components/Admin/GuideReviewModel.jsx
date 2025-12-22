import { useState } from "react";
import {
  X,
  User,
  CreditCard,
  BadgeCheck,
  Banknote,
  ZoomIn,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  Calendar,
  ImageIcon,
  ShieldAlert,
  DollarSign,
  FileText,
  Building2,
  Info,
} from "lucide-react";
import RejectApplicationModal from "./RejectApplicationModal";
import { decideGuide } from "../../services/admin";

export default function GuideReviewModal({ guide, onClose, onDecision }) {
  const [activeTab, setActiveTab] = useState("personal");
  const [zoomImage, setZoomImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const handleDecision = async (action, reason = "") => {
    const res = await decideGuide(guide.guideId, action, reason);

    if (res.success) {
      alert(`Guide ${action}d successfully`);
      onDecision?.(guide.guideId, action); // 🔥 notify parent
      onClose();
    } else {
      alert("Failed to process guide decision: " + res.error);
    }
  };
  const tabs = [
    { key: "personal", label: "Personal", icon: <User size={18} /> },
    { key: "identity", label: "Identity", icon: <CreditCard size={18} /> },
    { key: "skills", label: "Skills", icon: <BadgeCheck size={18} /> },
    { key: "bank", label: "Bank", icon: <Banknote size={18} /> },
  ];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl w-[900px] shadow-lg relative">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-500 hover:text-gray-800"
          >
            <X size={22} />
          </button>

          <h2 className="text-2xl font-semibold mb-1">
            Guide Application Review
          </h2>
          <p className="text-gray-600 mb-6">
            Complete application details for {guide.fullName}
          </p>

          {/* Tabs */}
          <div className="inline-flex gap-30 bg-gray-100 p-2 rounded-lg mb-6 w-full">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${activeTab === tab.key
                  ? "bg-[#0faf94] text-white shadow"
                  : "text-gray-600 hover:text-gray-800"
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* FIXED HEIGHT CONTENT */}
          <div className="min-h-[300px] max-h-[300px] overflow-y-auto pr-2">
            {/* PERSONAL */}
            {activeTab === "personal" && (
              <div>
                {/* Header */}
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <User className="text-orange-500" />
                  Personal Details
                </h3>

                <div className="grid grid-cols-[220px_1fr] gap-10">
                  {/* LEFT: Profile Section */}
                  <div className="flex flex-col items-center">
                    {!imageLoaded && (
                      <div className="w-48 h-48 rounded-full bg-gray-200 animate-pulse" />
                    )}

                    <img
                      src={`data:image/jpeg;base64,${guide.profilePic}`}
                      alt="Profile"
                      onLoad={() => setImageLoaded(true)}
                      onClick={() => setZoomImage(`data:image/jpeg;base64,${guide.profilePic}`)}
                      className={`w-48 h-48 rounded-full object-cover cursor-zoom-in shadow ${imageLoaded ? "block" : "hidden"
                        }`}
                    />
                  </div>

                  {/* RIGHT: Info Section */}
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    {/* Full Name */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <User size={16} />
                        Full Name
                      </div>
                      <p className="font-semibold text-gray-900">
                        {guide.fullName}
                      </p>
                    </div>

                    {/* Email */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Mail size={16} />
                        Email Address
                      </div>
                      <p className="font-semibold text-gray-900">
                        {guide.email}
                      </p>
                    </div>

                    {/* Phone */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Phone size={16} />
                        Phone Number
                      </div>
                      <p className="font-semibold text-gray-900">
                        {guide.phoneNumber}
                      </p>
                    </div>

                    {/* Location */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin size={16} />
                        Location
                      </div>
                      <p className="font-semibold text-gray-900">
                        {guide.location}
                      </p>
                    </div>

                    {/* Languages */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                        <Globe size={16} />
                        Languages Spoken
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {guide.languages.map((lang, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                        <Briefcase size={16} />
                        Experience Level
                      </div>
                      <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
                        {guide.experience}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* IDENTITY */}
            {activeTab === "identity" && (
              <div>
                {/* Header */}
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <CreditCard className="text-orange-500" />
                  Identity Verification
                </h3>

                {/* Main Content */}
                <div className="grid grid-cols-2 gap-10 items-start">
                  {/* LEFT: Identity Info */}
                  <div className="space-y-6">
                    {/* ID Number */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                        <CreditCard size={16} />
                        Government ID Number
                      </div>
                      <p className="font-semibold text-gray-900">
                        {guide.governmentNumber}
                      </p>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                        <Calendar size={16} />
                        Date of Birth
                      </div>
                      <p className="font-semibold text-gray-900">
                        {guide.dob}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT: ID Image */}
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <ImageIcon size={16} />
                      Government ID Photo
                    </div>

                    {!imageLoaded && (
                      <div className="w-full h-56 rounded-xl bg-gray-200 animate-pulse" />
                    )}

                    <div
                      className="relative rounded-xl overflow-hidden shadow cursor-zoom-in"
                      onClick={() => setZoomImage(`data:image/jpeg;base64,${guide.governmentPic}`)}
                    >
                      <img
                        src={`data:image/jpeg;base64,${guide.governmentPic}`}
                        alt="Government ID"
                        onLoad={() => setImageLoaded(true)}
                        className={`w-full object-cover ${imageLoaded ? "block" : "hidden"
                          }`}
                      />

                      <ZoomIn
                        size={18}
                        className="absolute bottom-3 right-3 text-white bg-black/60 rounded p-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Warning Banner */}
                <div className="mt-6 flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 px-4 py-3 text-orange-600 text-sm font-medium">
                  <ShieldAlert size={16} />
                  Please verify the ID photo matches the applicant&apos;s
                  profile picture
                </div>
              </div>
            )}

            {/* SKILLS */}
            {activeTab === "skills" && (
              <div>
                {/* Header */}
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Briefcase className="text-orange-500" />
                  Skills & Expertise
                </h3>

                {/* Top Section */}
                <div className="grid grid-cols-2 gap-10 items-start">
                  {/* Left: Specializations */}
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <MapPin size={16} />
                      Tour Specializations
                    </div>

                    {/* <div className="flex gap-6 flex-wrap font-medium text-gray-900 bg-gray-400/10 px-3 py-1 rounded-full">
                      {guide.skills.specializations.map((s, i) => (
                        <span key={i}>{s}</span>
                      ))}
                    </div> */}
                    <div className="flex gap-2 flex-wrap">
                      {guide.categories.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Hourly Rate */}
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <DollarSign size={16} />
                      Hourly Rate
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-orange-500">
                        {guide.price}
                      </span>
                      <span className="text-gray-500">per hour</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <hr className="my-6 border-gray-200" />

                {/* Bio */}
                <div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <FileText size={16} />
                    Professional Bio
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-gray-700 leading-relaxed">
                    {guide.bio}
                  </div>
                </div>
              </div>
            )}

            {/* BANK */}
            {activeTab === "bank" && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6">
                {/* Header */}
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                  <Banknote className="w-5 h-5 text-orange-500" />
                  Bank Details
                </h3>

                {/* Bank Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Bank Name */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Building2 className="w-4 h-4" />
                      <span>Bank Name</span>
                    </div>
                    <p className="text-base font-semibold text-gray-900">
                      {guide.bankName}
                    </p>
                  </div>

                  {/* Account Number */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <CreditCard className="w-4 h-4" />
                      <span>Bank Account Number</span>
                    </div>
                    <p className="text-base font-mono tracking-wide text-gray-900">
                      {guide.accountNumber}
                    </p>
                  </div>
                </div>

                {/* Info Note */}
                <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg px-4 py-3 text-sm">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>
                    Bank details will be used for guide payments upon approval
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Close
            </button>
            <button
              onClick={() => setShowRejectModal(true)}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Reject
            </button>

            {showRejectModal && (
              <RejectApplicationModal
                onClose={() => setShowRejectModal(false)}
                onReject={(reason) => {
                  handleDecision("reject", reason);
                  setShowRejectModal(false);
                }}
              />
            )}

            <button
              onClick={() => handleDecision("approve")}
              className="px-4 py-2 rounded-lg bg-[#0faf94] text-white hover:bg-green-700"
            >
              Approve
            </button>
          </div>
        </div>
      </div>

      {/* IMAGE ZOOM MODAL */}
      {zoomImage && (
        <div
          className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center"
          onClick={() => setZoomImage(null)}
        >
          <img
            src={zoomImage}
            alt="Zoom"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-xl"
          />
        </div>
      )}
    </>
  );
}
