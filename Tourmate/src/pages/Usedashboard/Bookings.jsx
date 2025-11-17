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
      image: NirojSirImg,
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
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop",
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
      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 rounded-full bg-blue-600 text-white">
          Upcoming ({bookings.length})
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-700">
          Past (0)
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-700">
          Cancelled (0)
        </button>
      </div>

      {/* Booking Cards */}
      <div className="space-y-6">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white shadow-lg rounded-2xl flex overflow-hidden border border-gray-100"
          >
            {/* Image Section */}
            <div className="relative w-72 h-auto">
              <img
                src={b.image}
                alt={b.title}
                className="w-full rounded-t-2xl object-cover"
              />

              {/* Status Badge */}
              <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                {b.status}
              </span>

              {/* Category badge */}
              <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                {b.category}
              </span>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6">
              {/* Title */}
              <h2 className="text-xl font-semibold">{b.title}</h2>

              <p className="text-gray-600 mb-4">
                👤 {b.guide} · ⭐ {b.rating} ({b.reviews} reviews)
              </p>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar size={18} /> {b.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} /> {b.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} /> {b.meetingPoint}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} /> {b.guests}
                </div>
              </div>

              <hr className="my-4" />

              {/* Bottom Section */}
              <div className="flex items-center justify-between mt-4">
                {/* Total Amount (Stacked) */}
                <div>
                  <p className="text-lg font-semibold">Total Amount</p>
                  <p className="text-xl font-bold">{b.total}</p>
                </div>

                {/* Buttons Right Aligned */}
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition">
                    <Phone size={18} /> Call Guide
                  </button>

                  <button
                    onClick={() => handleViewDetails()}
                    className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                  >
                    View Details <ArrowRight size={18} />
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
