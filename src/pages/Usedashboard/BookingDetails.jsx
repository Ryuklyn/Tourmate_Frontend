import React from "react";
import { Calendar, Clock, MapPin, Users, Phone, Mail } from "lucide-react";
import NirojSirImg from "../../assets/img/NirojSir.jpg";
import Patan from "../../assets/img/Patan.jpg";
import { useNavigate } from "react-router-dom";

export default function BookingDetails() {
  const navigate = useNavigate();
  const booking = {
    id: 1,
    status: "Upcoming Tour",
    title: "Kathmandu Heritage Walking Tour",
    image: Patan,
    description:
      "Explore the ancient wonders of Patan with an expert local historian. This immersive walking tour takes you through centuries of cultural heritage and iconic landmarks in Lalitpur.",
    date: "Dec 18, 2025",
    time: "9:00 AM",
    duration: "3 hours",
    meetingPoint: "Patan Durbar Square Gate",
    guests: "2 Guests",
    total: "$80",
    guide: {
      name: "Niroj Shrestha",
      expertise: "Ancient History",
      phone: "+977 9801234567",
      email: "nirojshrestha@example.com",
      image: NirojSirImg,
    },
    itinerary: [
      {
        time: "09:00 AM",
        place: "Patan Durbar Square",
        detail: "Meet at main entrance, tour briefing",
      },
      {
        time: "10:00 AM",
        place: "Golden Temple",
        detail: "Explore ancient monastery architecture",
      },
      {
        time: "11:00 AM",
        place: "Kumbeshwar Temple",
        detail: "Visit iconic temples and courtyards",
      },
      {
        time: "12:00 PM",
        place: "End of Tour",
        detail: "Conclude near Mangalbazar",
      },
    ],
    included: [
      "Professional licensed guide",
      "Entry fees to listed monuments",
      "Group headsets for more than 5 people",
      "Bottled water",
    ],
    notIncluded: ["Food and drinks", "Hotel pickup and drop-off", "Gratuities"],
    requirements: [
      "Comfortable walking shoes required",
      "Moderate physical fitness needed",
      "Valid ID required for all participants",
      "Children must be accompanied by an adult",
    ],
    cancellation:
      "Free cancellation up to 24 hours before the tour. No refund for cancellations made less than 24 hours before the start time.",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/bookings")}
        className="text-blue-600 text-sm mb-4"
      >
        ← Back to Bookings
      </button>

      {/* Header Image */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6">
        <img
          src={booking.image}
          alt={booking.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-6">
          <div>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              {booking.status}
            </span>
            <h1 className="text-white text-3xl font-bold mt-3">
              {booking.title}
            </h1>
            <p className="text-gray-200 text-sm max-w-2xl mt-1">
              {booking.description}
            </p>
          </div>
        </div>
      </div>

      {/* Booking + Guide in One Row */}
      <div className="flex gap-6 mb-6">
        {/* Booking Info */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Booking Information</h2>
          <div className="grid grid-cols-2 gap-y-4 text-gray-700">
            <div className="flex items-center gap-2">
              <Calendar size={18} /> {booking.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} /> {booking.time} · {booking.duration}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} /> {booking.meetingPoint}
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} /> {booking.guests}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">Total Amount</p>
            <p className="text-2xl font-bold">{booking.total}</p>
          </div>
        </div>

        {/* Guide Info */}
        <div className="w-80 bg-white p-6 rounded-2xl shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={booking.guide.image}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{booking.guide.name}</h2>
              <p className="text-gray-500 text-sm">{booking.guide.expertise}</p>
            </div>
          </div>
          <p className="flex items-center gap-2 text-gray-700 mb-1">
            <Phone size={16} /> {booking.guide.phone}
          </p>
          <p className="flex items-center gap-2 text-gray-700 mb-4">
            <Mail size={16} /> {booking.guide.email}
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl w-full">
            Call Guide
          </button>
        </div>
      </div>

      {/* Itinerary with Icons */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Tour Itinerary</h2>
        {booking.itinerary.map((item, i) => (
          <div key={i} className="flex gap-4 mb-4 items-start">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {i + 1}
            </div>
            <div>
              <p className="font-semibold text-blue-700">
                {item.time} — {item.place}
              </p>
              <p className="text-gray-600 text-sm">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Included / Not Included */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6 grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Included</h2>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            {booking.included.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">Not Included</h2>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            {booking.notIncluded.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Important Info */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-3">Important Information</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          {booking.requirements.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
        <hr className="border-t border-gray-300 my-4" />

        <h3 className="text-lg font-semibold mb-1">Cancellation Policy</h3>
        <p className="text-gray-700 text-sm">{booking.cancellation}</p>
      </div>
    </div>
  );
}
