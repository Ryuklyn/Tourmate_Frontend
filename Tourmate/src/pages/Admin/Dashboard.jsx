import StatCard from "../../components/Admin/StatCard";
import RevenueChart from "../../components/Admin/RevenueChart";
import RecentBookings from "../../components/Admin/RecentBookings";
import TopGuides from "../../components/Admin/TopGuides";

import { Users, Map, Bookmark, DollarSign } from "lucide-react";
import { getAdminDashboard } from "../../services/admin/dashboard";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState();
  const fetchDashboard = async () => {
    try {
      const res = await getAdminDashboard();
      if (res?.success) {
        setDashboard(res.data);
      }
    } catch (err) {
      console.error("Failed to load dashboard", err);
    }
  };
  
  useEffect(() => {
    fetchDashboard();
  }, [])
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
          value={dashboard?.totalTravelers?.toLocaleString() ?? "—"}
          percentage={
            dashboard?.travelersChange != null
              ? `${dashboard.travelersChange.toFixed(1)}%`
              : "—"
          }
        />

        <StatCard
          icon={<Map />}
          title="Active Guides"
          value={dashboard?.activeGuides?.toLocaleString() ?? "—"}
          percentage={
            dashboard?.guidesChange != null
              ? `${dashboard.guidesChange.toFixed(1)}%`
              : "—"
          }
        />

        <StatCard
          icon={<Bookmark />}
          title="Total Bookings"
          value={dashboard?.totalBookings?.toLocaleString() ?? "—"}
          percentage={
            dashboard?.bookingsChange != null
              ? `${dashboard.bookingsChange.toFixed(1)}%`
              : "—"
          }
        />

        <StatCard
          icon={<DollarSign />}
          title="Revenue"
          value={
            dashboard?.revenue != null
              ? `$${dashboard.revenue.toLocaleString()}`
              : "—"
          }
          percentage={
            dashboard?.revenueChange != null
              ? `${dashboard.revenueChange.toFixed(1)}%`
              : "—"
          }
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
