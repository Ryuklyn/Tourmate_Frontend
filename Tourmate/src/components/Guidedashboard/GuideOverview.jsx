import React, { useEffect, useState } from "react";
import StatCard from "../Guidedashboard/StatCard";
import BookingItem from "../Guidedashboard/BookingItem";

import { Map, DollarSign, Users, Star, Clock } from "lucide-react";
import { getGuideDashboard } from "../../services/guide/dashboard";
import { fetchBookings } from "../../services/booking";
import api from "../../utils/axiosInterceptor";
import formatDateTime from "../../utils/dateUtil";

export default function GuideOverview() {
  const [dashboard, setDashboard] = useState({});
  const [bookings, setBookings] = useState([]);
  const getInitials = (firstName = "", lastName = "") =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const handleReject = async (id) => {
    await api.put(`/guides/tour/bookings/${id}/reject`);
    fetchBookingsRequests();
    loadCounts();
  };

  const handleAccept = async (id) => {
    await api.put(`/guides/tour/bookings/${id}/accept`);
    fetchBookingsRequests();
    loadCounts();
  };
  const fetchDashboard = async () => {
    const res = await getGuideDashboard();
    if (res.success) {
      setDashboard(res.data);
    }
  };
  const fetchBookingsRequests = async () => {
    const res = await fetchBookings({
      status: "PENDING",
      page: 0,
      size: 10,
    });
    if (res?.success) setBookings(res.data.data);
    console.log(res.data.data);
  };
  useEffect(() => {
    fetchBookingsRequests();
    fetchDashboard();
  }, []);
  return (
    <div className="pb-10">
      {/* HEADER */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A]">Guide Dashboard</h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage your tours, track earnings, and connect with travelers.
        </p>
      </header>

      {/* TOP STATS */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <StatCard
          title="Active Tours"
          value={dashboard.activeTours}
          subtitle="This month"
          icon={<Map className="w-6 h-6 text-[#0faf94]" />}
        />

        <StatCard
          title="Monthly Earnings"
          value={`Rs. ${dashboard.monthlyEarnings}`}
          
          extra={(() => {
            const change = dashboard.earningsChangePercent;
            const isPositive = change > 0;
            const isNegative = change < 0;

            return (
              <span
                className={`text-sm font-medium ${isPositive
                  ? "text-[#0faf94]"
                  : isNegative
                    ? "text-red-500"
                    : "text-gray-400"
                  }`}
              >
                {isPositive && "▲ "}
                {isNegative && "▼ "}
                {Math.abs(change).toFixed(1)}% from last month
              </span>
            );
          })()}
        />


        <StatCard
          title="Total Travelers"
          value={dashboard.totalTravelers}
          subtitle="All time"
          icon={<Users className="w-6 h-6 text-[#0faf94]" />}
        />

        <StatCard
          title="Rating"
          value={dashboard.rating}
          subtitle={`From ${dashboard.totalReviews} reviews`}
          icon={<Star className="w-6 h-6 text-[#0faf94]" />}
        />
      </section>

      {/* PENDING BOOKINGS */}
      <section>
        <div className="bg-white rounded-xl p-5 border border-[#E2E8F0]">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-4">
            <Clock size={20} className="text-[#0faf94]" />
            <h3 className="text-lg font-semibold text-[#0F172A]">
              Pending Booking Requests
            </h3>
          </div>

          {/* Booking Items */}
          <div className="space-y-4">
            {bookings.length === 0 && (
              <p className="text-sm text-gray-400">No pending booking requests</p>
            )}

            {bookings.map((booking) => (
              <BookingItem
                key={booking.bookingId}
                initials={getInitials(
                  booking.user.firstName,
                  booking.user.lastName
                )}
                name={`${booking.user.firstName} ${booking.user.lastName}`}
                tour={booking.tourName}
                datePrice={`${formatDateTime(booking.startDate)} • Rs ${booking.totalPrice}`}
                onAccept={() => handleAccept(booking.bookingId)}
                onReject={() => handleReject(booking.bookingId)}
              />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
