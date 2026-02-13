
// }

import React, { useEffect, useState } from "react";
import {
  Eye,
  Plus,
  MapPin,
  Clock,
  Users,
  Pencil,
  Trash2,
  DollarSign,
} from "lucide-react";

import Patan from "../../assets/img/Patan.jpg";
import Everest from "../../assets/img/Everest.jpg";
import Pokhara from "../../assets/img/Pokhara.jpg";
import Chitwan from "../../assets/img/Chitwan.jpg";
import Lumbini from "../../assets/img/Lumbini.jpg";

import CreateTourModal from "../../components/Guidedashboard/TourPackages/CreateTourModal";
import EditTourModal from "../../components/Guidedashboard/TourPackages/EditTourModal";
import DeleteTourModal from "../../components/Guidedashboard/TourPackages/DeleteTourModal";
import { deleteTourById, getToursByGuide } from "../../services/tour/tourData";
import ViewTourModal from "../../components/Guidedashboard/TourPackages/ViewTourModal";

export default function GuideTourPackage() {
  /* ================= STATE ================= */
  const [showCreate, setShowCreate] = useState(false);
  const [editTour, setEditTour] = useState(null);
  const [deleteTour, setDeleteTour] = useState(null);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewTourData, setViewTourData] = useState(null);

  const viewTour = (tour) => {
    setViewTourData(tour);
  };

  /* ================= STATS ================= */
  const stats = [
    { label: "Total Tours", value: 5, icon: MapPin, color: "text-emerald-600" },
    { label: "Active Tours", value: 4, icon: Users, color: "text-green-600" },
    { label: "Total Bookings", value: 74, icon: Users, color: "text-blue-600" },

  ];
  useEffect(() => {
    const fetchTours = async () => {
      const res = await getToursByGuide();
      if (res.success) setTours(res.data);
      setLoading(false);
    };
    fetchTours();
  }, []);
  const handleTourCreated = (newTour) => {
    setTours(prev => [newTour, ...prev]); // add to top
  };
 
  if (loading) return <p>Loading tours...</p>;
  /* ================= TOUR DATA ================= */
  
  return (
    <div className="p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tour Packages</h1>
          <p className="text-gray-500 text-sm">
            Create and manage your tour experiences
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-[#0FAF94] hover:bg-emerald-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Create New Tour
        </button>
      </div>

      {/* ================= STATS ================= */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4"
          >
            <div className={`p-2 rounded-lg bg-gray-50 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-semibold">{s.value}</p>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          </div>
        ))}
      </div> */}

      {/* ================= TOUR CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tours.map((tour, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <div className="relative">
              <img
                src={`data:image/jpeg;base64,${tour.tourPic}`}
                alt={tour.name}
                className="h-48 w-full object-cover"
              />
              <span
                className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full text-white ${tour.status === "Active" ? "bg-emerald-500" : "bg-gray-500"
                  }`}
              >
                {tour.status}
              </span>
            </div>

            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-lg">{tour.name}</h3>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {tour.location}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {tour.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> Max Gueste: {tour.maxGuests}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div>
                  <p className="text-emerald-600 font-semibold">Rs .{tour.price}</p>
                  <p className="text-xs text-gray-500">
                    per person
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => viewTour(tour)}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-blue-50 text-blue-600"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditTour(tour)}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeleteTour(tour)}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-red-50 text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODALS ================= */}
      {showCreate && (
        <CreateTourModal
          onClose={() => setShowCreate(false)}
          onTourCreated={handleTourCreated}
        />
      )}

      {editTour && (
        <EditTourModal
          tour={editTour}
          onClose={() => setEditTour(null)}
          onUpdated={(updated) =>
            setTours(prev => prev.map(t => t.id === updated.id ? updated : t))
          }
        />
      )}


      {deleteTour && (
        <DeleteTourModal
          tour={deleteTour}
          onClose={() => setDeleteTour(null)}
          onDeleted={(deletedId) => setTours(prev => prev.filter(t => t.id !== deletedId))}
        />
      )}

      {viewTourData && (
        <ViewTourModal
          tour={viewTourData}
          onClose={() => setViewTourData(null)}
        />
      )}
    </div>
  );
}

