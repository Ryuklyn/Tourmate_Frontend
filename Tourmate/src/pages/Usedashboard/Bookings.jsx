import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getMyTourBookings, cancelTourBooking } from "../../services/booking";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Tabs mapped to backend BookingStatus
const TABS = {
  REQUESTED: "PENDING",
  UPCOMING: "APPROVED",
  PAST: "COMPLETED",
  CANCELLED: "CANCELLED",
};
const handleWhatsappCall = (phone) => {
  if (!phone) return;

  window.open(`https://web.whatsapp.com/send?phone=${phone}`, "_blank");
};

export default function Bookings() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(TABS.UPCOMING);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleViewDetails = (bookingId) => {
    navigate(`/dashboard/bookingsdetails/${bookingId}`);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelTourBooking(bookingId);
      setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
      toast.success("Booking cancelled successfully!");
    } catch (err) {
      console.error(err);}
  };

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const res = await getMyTourBookings({ status: activeTab });
      if (res.success) {
        setBookings(res.data);
      }
      setLoading(false);
    };

    fetchBookings();
  }, [activeTab]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-1">My Bookings</h1>
      <p className="text-gray-500 mb-6">
        Track and manage all your tour experiences
      </p>

      {/* Tabs */}
      <div className="flex items-center bg-gray-100 p-1 rounded-full w-max mb-6">
        {Object.entries(TABS).map(([label, value]) => (
          <button
            key={value}
            onClick={() => setActiveTab(value)}
            className={`px-4 py-2 rounded-full font-medium transition
              ${
                activeTab === value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-white"
              }`}
          >
            {label.charAt(0) + label.slice(1).toLowerCase()}{" "}
            {activeTab === value && `(${bookings.length})`}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500 py-10">Loading bookings...</p>
      )}

      {/* Empty */}
      {!loading && bookings.length === 0 && (
        <p className="text-center text-gray-500 py-10">No bookings found.</p>
      )}

      {/* Booking Cards */}
      <div className="space-y-6">
        {bookings.map((b) => (
          <div
            key={b.bookingId}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex h-[280px]"
          >
            {/* LEFT IMAGE */}
            <div className="relative w-[45%] h-full shrink-0">
              <img
                src={
                  b.tour?.tourPic
                    ? `data:image/jpeg;base64,${b.tour.tourPic}`
                    : "/placeholder.jpg"
                }
                alt={b.tourName}
                className="w-full h-full object-cover"
              />

              {/* Status Badge */}
              <span className="absolute top-4 left-4 bg-black text-white text-xs px-4 py-1 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full" />
                {b.status}
              </span>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 p-8 flex flex-col justify-between overflow-hidden">
              {/* Top */}
              <div>
                <h2 className="text-2xl font-semibold leading-snug mb-3 line-clamp-2">
                  {b.tourName}
                </h2>

                <div className="flex items-center gap-3 text-sm text-gray-600 mb-5">
                  <img
                    src={
                      b.guide?.profilePic
                        ? `data:image/jpeg;base64,${b.guide.profilePic}`
                        : "/placeholder.jpg"
                    }
                    alt={b.guideName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="font-medium">{b.guideName}</span>
                  <span className="text-green-500 font-medium">
                    {b.paymentStatus}
                  </span>

                  <span className="text-orange-500 font-medium">
                    ⭐ {b.averageRating}
                  </span>
                  <span>· {b.reviewCount} reviews</span>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {b.startDate}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {b.tour?.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    {b.travellers} Guests
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between pt-4">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    Rs. {b.totalPrice}
                  </p>
                  <p className="text-xs uppercase text-gray-400 tracking-wide">
                    Total
                  </p>
                </div>

                <div className="flex gap-3">
                  <button className="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition flex items-center gap-2"
                  onClick={() => handleWhatsappCall(b.guide?.phoneNumber)}>
                    <Phone size={16} />
                    Call
                  </button>

                  {b.status === "PENDING" && (
                    <button
                      onClick={() => handleCancelBooking(b.bookingId)}
                      className="px-5 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-50 transition font-medium"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    onClick={() => handleViewDetails(b.bookingId)}
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
