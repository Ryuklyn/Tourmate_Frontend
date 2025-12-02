import React from "react";
import StatCard from "../Guidedashboard/StatCard";
import BookingItem from "../Guidedashboard/BookingItem";

import { Map, DollarSign, Users, Star, Clock } from "lucide-react";

export default function GuideOverview() {
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
          value="8"
          subtitle="This month"
          icon={<Map className="w-6 h-6 text-green-600" />}
        />

        <StatCard
          title="Monthly Earnings"
          value="$3,240"
          icon={<DollarSign className="w-6 h-6 text-blue-600" />}
          extra={
            <span className="text-green-600 text-sm">
              ▲ +12% from last month
            </span>
          }
        />

        <StatCard
          title="Total Travelers"
          value="156"
          subtitle="All time"
          icon={<Users className="w-6 h-6 text-purple-600" />}
        />

        <StatCard
          title="Rating"
          value="4.9"
          subtitle="From 89 reviews"
          icon={<Star className="w-6 h-6 text-yellow-500" />}
        />
      </section>

      {/* PENDING BOOKINGS */}
      <section>
        <div className="bg-white rounded-xl p-5 border border-[#E2E8F0]">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-4">
            <Clock size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold text-[#0F172A]">
              Pending Booking Requests
            </h3>
          </div>

          {/* Booking Items */}
          <div className="space-y-4">
            <BookingItem
              initials="SJ"
              name="Sarah Johnson"
              tour="City Walking Tour"
              datePrice="Jan 18, 2025 • $120"
            />
            <BookingItem
              initials="MC"
              name="Michael Chen"
              tour="Food & Culture Tour"
              datePrice="Jan 22, 2025 • $150"
            />
            <BookingItem
              initials="EW"
              name="Emma Williams"
              tour="Museum Tour"
              datePrice="Jan 25, 2025 • $90"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
