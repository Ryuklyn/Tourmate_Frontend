import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Clock, Users } from "lucide-react";
import api from "../../utils/axiosInterceptor";
import { fetchBookings } from "../../services/booking";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GuideBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    upcoming: 0,
    requested: 0,
    past: 0,
    cancelled: 0,
  });

  const statusMap = {
    upcoming: "APPROVED",
    requested: "PENDING",
    past: "COMPLETED",
    cancelled: "CANCELLED,DENIED",
  };
  const statusLabel = {
    APPROVED: "Confirmed",
    PENDING: "Pending",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    DENIED: "Denied",
  };

  // Load counts
  const loadCounts = async () => {
    try {
      const res = await api.get("/guides/tour/bookings/count");
      setCounts(res.data.data);
    } catch (err) {
      console.error("Failed to load booking counts", err);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  // Load bookings for the active tab
  const refreshBookings = async () => {
    try {
      const res = await fetchBookings({
        status: statusMap[activeTab],
        page: 0,
        size: 10,
      });
      if (res?.success) setBookings(res.data.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  useEffect(() => {
    refreshBookings();
  }, [activeTab]);

  // Action handlers
  const handleComplete = async (id) => {
    try {
      await api.put(`/guides/tour/bookings/${id}/complete`);
      toast.success("Booking marked as completed ✅");
      refreshBookings();
      loadCounts();
    } catch (error) {
      toast.error("Failed to complete booking ❌");
    }
  };
  
  const handleReject = async (id) => {
    try {
      await api.put(`/guides/tour/bookings/${id}/reject`);
      toast.success("Booking rejected successfully");
      refreshBookings();
      loadCounts();
    } catch (error) {
      toast.error("Failed to reject booking");
    }
  };
  
  const handleAccept = async (id) => {
    try {
      await api.put(`/guides/tour/bookings/${id}/accept`);
      toast.success("Booking accepted successfully 🎉");
      refreshBookings();
      loadCounts();
    } catch (error) {
      toast.error("Failed to accept booking");
    }
  };
  
  const handleCancel = async (id) => {
    try {
      await api.put(`/guides/tour/bookings/${id}/cancel`);
      toast.success("Booking cancelled successfully");
      refreshBookings();
      loadCounts();
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
      <p className="text-gray-500 mt-1">Manage your tour bookings and schedule</p>

      {/* Search Bar */}
      {/* <div className="mt-5 relative max-w-full">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search bookings by tourist name or tour..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div> */}

      {/* Tabs */}
      <div className="w-full flex justify-left mt-6">
        <div className="bg-gray-200 px-2 py-2 rounded-lg flex space-x-4 pb-2">
          {[
            { key: "upcoming", label: `Upcoming (${counts.upcoming})` },
            { key: "requested", label: `Requested (${counts.requested})` },
            { key: "past", label: `Past Tours (${counts.past})` },
            { key: "cancelled", label: `Cancelled (${counts.cancelled})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 text-sm font-medium transition ${activeTab === tab.key
                  ? "text-white bg-[#0faf94] rounded-full shadow-sm"
                  : "text-black hover:text-gray-800"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Booking List */}
      <div className="mt-4 space-y-4">
        {bookings.length === 0 && (
          <p className="text-gray-500">No bookings in this category.</p>
        )}

        {bookings.map((item) => (
          <div
            key={item.bookingId}
            className="flex items-center justify-between bg-white border border-gray-300 shadow-sm rounded-xl p-5 hover:shadow-md transition"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {item.tourName}
              </h2>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${item.status === "APPROVED"
                    ? "bg-green-100 text-[#0faf94]"
                    : item.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-600"
                      : item.status === "COMPLETED"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-red-100 text-red-600"
                  }`}
              >
                {statusLabel[item.status]}
              </span>

              <div className="flex items-center gap-6 text-sm text-gray-500 mt-2">
                <p className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> {item.travellers} guests
                </p>
                <p className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {item.tour.location}
                </p>
                <p className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {item.tour.duration}
                </p>
                <p className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {item.startDate}
                </p>
                <p className="flex items-center gap-1">
                <p className="text-xs text-green-500  font-semibold">Rs {item.totalPrice}</p>
                </p>
              </div>

              <p className="text-sm text-gray-700 mt-1">👤 {item.user.firstName} {item.user.lastName}</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => navigate(`/dashboard/bookingsdetails/${item.bookingId}`)} className="px-4 py-2 border-2 border-[#0faf94] rounded-lg text-gray-600 hover:bg-gray-100">
                View Details
              </button>

              {item.status === "APPROVED" && (
                <>
                  <button
                    onClick={() => handleCancel(item.bookingId)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleComplete(item.bookingId)}
                    className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                  >
                    Complete
                  </button>
                </>
              )}

              {item.status === "PENDING" && (
                <>
                  <button
                    onClick={() => handleAccept(item.bookingId)}
                    className="px-4 py-2 bg-[#0faf94] text-white rounded-lg hover:opacity-90"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(item.bookingId)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  >
                    Deny
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideBookings;