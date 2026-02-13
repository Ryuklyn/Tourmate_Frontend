import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Phone, Mail } from "lucide-react";
import { getBookingDetails } from "../../services/booking";
import { handleEsewaPayment } from "../../services/payment";

export default function BookingDetails() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleWhatsappCall = (phone) => {
    if (!phone) return;

    window.open(`https://web.whatsapp.com/send?phone=${phone}`, "_blank");
  };

  const handlePaymentClick = async (totalPrice, bookingId) => {
    await handleEsewaPayment(totalPrice, bookingId);
  };
  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const res = await getBookingDetails(bookingId);
        if (res.success) {
          setBooking(res.data);
        } else {
          console.error(res.error);
        }
      } catch (err) {
        console.error("Failed to fetch booking details", err);
      }
      setLoading(false);
    };
    fetchBooking();
  }, [bookingId]);

  if (loading) return <p className="text-center py-10">Loading booking...</p>;
  if (!booking) return <p className="text-center py-10">Booking not found</p>;

  const tour = booking.tour;

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
          src={tour?.tourPic ? `data:image/jpeg;base64,${tour.tourPic}` : "/placeholder.jpg"}
          alt={tour?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-6">
          <div>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              {booking.status}
            </span>
            <h1 className="text-white text-3xl font-bold mt-3">
              {booking.tourName}
            </h1>
            <p className="text-gray-200 text-sm max-w-2xl mt-1">
              {tour?.description}
            </p>
            <div className="mt-2 text-sm text-gray-200">
              ⭐ {booking.averageRating} · {booking.reviewCount} reviews
            </div>
          </div>
        </div>
      </div>

      {/* Booking + Guide Row */}
      <div className="flex gap-6 mb-6">
        {/* Booking Info */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Booking Information</h2>
          <div className="grid grid-cols-2 gap-y-4 text-gray-700">
            <div className="flex items-center gap-2">
              <Calendar size={18} /> {booking.startDate}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} /> {booking.tour.duration}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} /> {tour?.location}
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} /> {booking.travellers} Guests
            </div>
          </div>
          {/* <div className="mt-4">
            <p className="text-lg font-semibold">Total Amount</p>
            <p className="text-2xl font-bold">Rs. {booking.totalPrice}</p>
            <span className="text-green-500 font-medium">
              Payment {booking.paymentStatus}
            </span>
          </div>
          <button
            onClick={() => handlePaymentClick(booking.totalPrice, booking.id)}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
            disabled={booking.paymentStatus === "PAID"}
          >
            {booking.paymentStatus === "PAID" ? "Paid" : "Pay"}
          </button> */}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              {/* Left side: Total Amount */}
              <div>
                <p className="text-lg font-semibold">Total Amount</p>
                <p className="text-2xl font-bold">Rs. {booking.totalPrice}</p>
                <span className="text-green-500 font-medium">
                  Payment {booking.paymentStatus}
                </span>
              </div>

              {/* Right side: Pay button */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePaymentClick(booking.totalPrice, booking.id)}
                  className={`px-4 py-2 text-sm rounded-lg text-white ${booking.paymentStatus === "PAID"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                    }`}
                  disabled={booking.paymentStatus === "PAID"}
                >
                  {booking.paymentStatus === "PAID" ? "Paid" : "Pay"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Guide Info */}
        <div className="w-80 bg-white p-6 rounded-2xl shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={booking.guide?.profilePic ? `data:image/jpeg;base64,${booking.guide.profilePic}` : "/placeholder.jpg"}
              className="w-16 h-16 rounded-full object-cover"
              alt={booking.guideName}
            />
            <div>
              <h2 className="text-lg font-semibold">{booking.guideName}</h2>
              <p className="text-gray-500 text-sm">Guide</p>
            </div>
          </div>
          <p className="flex items-center gap-2 text-gray-700 mb-1">
            <Phone size={16} /> {booking.guide?.phoneNumber || "N/A"}
          </p>
          <p className="flex items-center gap-2 text-gray-700 mb-4">
            <Mail size={16} /> {booking.guide?.email || "N/A"}
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl w-full"
            onClick={() => handleWhatsappCall(booking.guide?.phoneNumber)}>
            Call Guide
          </button>
        </div>
      </div>

      {/* Itinerary */}
      {tour?.itineraries?.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Tour Itinerary</h2>
          {tour.itineraries.map((item, i) => (
            <div key={i} className="flex gap-4 mb-4 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-blue-700">
                  {item.time} — {item.title}
                </p>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Included / Not Included / Important Info */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6 grid grid-cols-2 gap-6">
        {tour?.included?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Included</h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              {tour.included.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}
        {tour?.notIncluded?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Not Included</h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              {tour.notIncluded.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Important Info */}
      {tour?.importantInformation?.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-3">Important Information</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            {tour.importantInformation.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
          <hr className="border-t border-gray-300 my-4" />
          <h3 className="text-lg font-semibold mb-1">Cancellation Policy</h3>
          <p className="text-gray-700 text-sm">
            Free cancellation up to 24 hours before the tour.
          </p>
        </div>
      )}
    </div>
  );
}
