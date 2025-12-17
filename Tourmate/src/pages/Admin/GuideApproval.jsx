// GuideApproval.jsx
import { useState } from "react";
import {
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
import GuideReviewModal from "../../components/Admin/GuideReviewModel";
import NirojSirImg from "../../assets/img/NirojSir.jpg";
import Citizen from "../../assets/img/citizen.jpg";

export default function GuideApproval() {
  const [selectedGuide, setSelectedGuide] = useState(null);

  const guides = [
    {
      id: 1,
      name: "Niroj Shrestha",
      email: "niroj.shrestha@gmail.com",
      location: "Kathmandu, Nepal",
      appliedDate: "Dec 1, 2024",
      experience: "20+ years",
      rate: "$45/hour",
      specializations: ["Historical Tours", "Food Tours"],
      profilePic: NirojSirImg,

      verification: {
        image: true,
        id: true,
      },

      // Modal Full Details
      personal: {
        fullName: "Niroj Shrestha",
        email: "niroj.shrestha@gmail.com",
        phone: "+977 980 123 4567",
        location: "Kathmandu, Nepal",
        languages: ["Nepali", "English", "Hindi"],
        experienceLevel: "20+ years",
      },
      identity: {
        idPhoto: Citizen,
        idNumber: "A7892345",
        dob: "Jan 12, 1994",
      },
      skills: {
        specializations: ["Historical Tours", "Food Tours"],
        hourlyRate: "$45",
        bio: "I am a passionate tour guide with expertise in cultural and historical tours.",
      },
      bank: {
        bankName: "Siddhartha Bank",
        accountNumber: "ES00 1234 5678 9000",
      },
    },

    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      location: "Madrid, Spain",
      appliedDate: "Dec 1, 2024",
      experience: "5+ years",
      rate: "$45/hour",
      specializations: ["Historical Tours", "Food Tours"],
      profilePic: "/img/maria.jpg",

      verification: {
        image: true,
        id: true,
      },

      // Modal Full Details
      personal: {
        fullName: "Maria Garcia",
        email: "maria.garcia@email.com",
        phone: "+34 612 345 678",
        location: "Madrid, Spain",
        languages: ["Spanish", "English", "French"],
        experienceLevel: "5+ years",
      },
      identity: {
        idPhoto: "/img/maria-id.jpg",
        idNumber: "A7892345",
        dob: "Jan 12, 1994",
      },
      skills: {
        specializations: ["Historical Tours", "Food Tours"],
        hourlyRate: "$45/hour",
        bio: "I am a passionate tour guide with expertise in cultural and historical tours.",
      },
      bank: {
        bankName: "Santander Bank",
        accountNumber: "ES00 1234 5678 9000",
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">Guide Approvals</h1>
      <p className="text-gray-600 mb-6">
        Review and approve new guide applications
      </p>

      <div className="grid grid-cols-3 gap-6">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={guide.profilePic}
                alt={guide.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-lg">{guide.name}</h2>
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
                <span className="font-medium">{guide.appliedDate}</span>
              </p>
              <p className="flex items-center gap-2">
                <Briefcase size={16} /> Experience:
                <span className="font-medium">{guide.experience}</span>
              </p>
              <p className="flex items-center gap-2">
                <DollarSign size={16} /> Rate:
                <span className="font-medium">{guide.rate}</span>
              </p>
            </div>

            {/* Specializations */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-400">Specializations:</h4>
              <div className="flex gap-2 mt-2 flex-wrap">
                {guide.specializations.map((s, idx) => (
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
              <h4 className="font-medium text-gray-400">
                Verification Status:
              </h4>
              <div className="flex flex-wrap gap-2 mt-2 text-sm">
                {guide.verification.image && (
                  <div className="flex items-center gap-2 text-[#0faf94] bg-green-200 px-3 py-1 rounded-full font-medium">
                    <CheckCircle size={16} />
                    <span className="font-medium">Image Verified</span>
                  </div>
                )}
                {guide.verification.id && (
                  <div className="flex items-center gap-2 text-[#0faf94] bg-green-200 px-3 py-1 rounded-full font-medium">
                    <CheckCircle size={16} />
                    <span className="font-medium">ID Verified</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center pt-4 mt-4 border-t border-gray-200 gap-1.5 justify-center">
              {/* Review */}
              <button
                onClick={() => setSelectedGuide(guide)}
                className="flex items-center gap-1
             text-orange-500 font-medium text-xs
             hover:bg-orange-50
             px-2 py-1
             rounded-md border border-orange-200
             whitespace-nowrap"
              >
                <Eye size={14} />
                Review
              </button>

              <button
                className="flex items-center gap-1
             text-[#0faf94] font-medium text-xs
             hover:bg-green-50
             px-2 py-1
             rounded-md border border-green-200
             whitespace-nowrap"
              >
                <CheckCircle size={14} />
                Approve
              </button>

              <button
                className="flex items-center gap-1
             text-red-600 font-medium text-xs
             hover:bg-red-50
             px-2 py-1
             rounded-md border border-red-200
             whitespace-nowrap"
              >
                <XCircle size={14} />
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedGuide && (
        <GuideReviewModal
          guide={selectedGuide}
          onClose={() => setSelectedGuide(null)}
        />
      )}
    </div>
  );
}
