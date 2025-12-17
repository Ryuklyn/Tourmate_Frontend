import StatCard from "../../components/Admin/StatCard";
import RevenueChart from "../../components/Admin/RevenueChart";
import RecentBookings from "../../components/Admin/RecentBookings";
import TopGuides from "../../components/Admin/TopGuides";

import { Users, Map, Bookmark, DollarSign } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Welcome back! Here’s what’s happening today.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users />}
          title="Total Travelers"
          value="12,847"
          percentage="+12.5%"
        />
        <StatCard
          icon={<Map />}
          title="Active Guides"
          value="486"
          percentage="+8.2%"
        />
        <StatCard
          icon={<Bookmark />}
          title="Total Bookings"
          value="3,254"
          percentage="-2.4%"
        />
        <StatCard
          icon={<DollarSign />}
          title="Revenue"
          value="$284,500"
          percentage="+18.7%"
        />
      </div>

      <div className="space-y-6">
        {/* Row 1 - Full Width Chart */}
        <div>
          <RevenueChart />
        </div>

        {/* Row 2 - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <RecentBookings />
          </div>

          {/* Right Column */}
          <div>
            <TopGuides />
          </div>
        </div>
      </div>
    </div>
  );
}
