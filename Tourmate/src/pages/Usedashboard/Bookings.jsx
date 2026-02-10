import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  ArrowRight,
} from "lucide-react";
import NirojSirImg from "../../assets/img/NirojSir.jpg";
import Patan from "../../assets/img/Patan.jpg";
import Paris from "../../assets/img/Paris.jpg";
import Tokyo from "../../assets/img/Tokyo.jpg";
import { useNavigate } from "react-router-dom";

export default function Bookings() {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/dashboard/bookingsdetails`);
  };
  const bookings = [
    {
      id: 1,
      status: "Upcoming",
      title: "Kathmandu Heritage Walking Tour",
      guide: "Niroj Shrestha",
      location: "Lalitpur, Nepal",
      languages: "English, Nepali, Japanese",
      rating: 4.9,
      reviews: 127,
      image: Patan,
      guideAvatar: NirojSirImg,
      date: "Dec 18, 2025",
      time: "9:00 AM",
      guests: "2 Guests",
      category: "Heritage Walk",
      meetingPoint: "Patan Durbar Square Gate",
      total: "$80",
    },
    {
      id: 2,
      status: "Upcoming",
      title: "Paris Art & Culture Tour",
      guide: "Nora Kamber",
      location: "Paris, France",
      languages: "English, French, German",
      rating: 5.0,
      reviews: 203,
      image: Paris,
      guideAvatar:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop",
      date: "Jan 8, 2026",
      time: "10:00 AM",
      guests: "4 Guests",
      category: "Art & Culture",
      meetingPoint: "Louvre Museum Entrance",
      total: "$150",
    },
    {
      id: 3,
      status: "Upcoming",
      title: "Tokyo Food & Street Tour",
      guide: "Kate Brown",
      location: "Tokyo, Japan",
      languages: "English, Japanese",
      rating: 4.8,
      reviews: 156,
      image: Tokyo,
      guideAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      date: "Feb 12, 2026",
      time: "6:00 PM",
      guests: "3 Guests",
      category: "Food & Culture",
      meetingPoint: "Shibuya Crossing Exit 7",
      total: "$120",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-1">My Bookings</h1>
      <p className="text-gray-500 mb-6">
        Track and manage all your tour experiences
      </p>

      {/* Tabs */}
      <div className="flex items-center bg-gray-100 p-1 rounded-full w-max mb-6">
        <button className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium shadow-sm">
          Upcoming ({bookings.length})
        </button>

        <button className="px-4 py-2 rounded-full text-gray-700 hover:bg-white transition font-medium">
          Past (0)
        </button>

        <button className="px-4 py-2 rounded-full text-gray-700 hover:bg-white transition font-medium">
          Cancelled (0)
        </button>
      </div>

      <div className="space-y-6">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex h-[280px]"
          >
            {/* LEFT IMAGE (FIXED SIZE) */}
            <div className="relative w-[45%] h-full shrink-0">
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-full object-cover"
              />

              {/* Status Badge */}
              <span className="absolute top-4 left-4 bg-black text-white text-xs px-4 py-1 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full" />
                {b.status.toUpperCase()}
              </span>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 p-8 flex flex-col justify-between overflow-hidden">
              {/* Top Content */}
              <div>
                <h2 className="text-2xl font-semibold leading-snug mb-3 line-clamp-2">
                  {b.title}
                </h2>

                <div className="flex items-center gap-3 text-sm text-gray-600 mb-5">
                  <img
                    src={b.guideAvatar}
                    alt={b.guide}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>{b.guide}</span>
                  <span className="text-orange-500 font-medium">
                    ⭐ {b.rating}
                  </span>
                  <span>· {b.reviews} reviews</span>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {b.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {b.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {b.meetingPoint}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    {b.guests} guests
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between pt-4">
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {b.total}
                  </p>
                  <p className="text-xs uppercase text-gray-400 tracking-wide">
                    Total
                  </p>
                </div>

                <div className="flex gap-3">
                  <button className="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition flex items-center gap-2">
                    <Phone size={16} />
                    Call
                  </button>

                  <button
                    onClick={() => handleViewDetails(b.id)}
                    className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-900 transition flex items-center gap-2"
                  >
                    Details <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
