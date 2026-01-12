import React, { useState } from "react";
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
import ViewTourModal from "../../components/Guidedashboard/TourPackages/ViewTourModal";

export default function GuideTourPackage() {
  /* ================= STATE ================= */
  const [showCreate, setShowCreate] = useState(false);
  const [editTour, setEditTour] = useState(null);
  const [deleteTour, setDeleteTour] = useState(null);
  const [viewTourData, setViewTourData] = useState(null);

  const viewTour = (tour) => {
    setViewTourData(tour);
  };

  /* ================= STATS ================= */
  const stats = [
    { label: "Total Tours", value: 5, icon: MapPin, color: "text-emerald-600" },
    { label: "Active Tours", value: 4, icon: Users, color: "text-green-600" },
    { label: "Total Bookings", value: 74, icon: Users, color: "text-blue-600" },
    {
      label: "Total Revenue",
      value: "$2,150",
      icon: DollarSign,
      color: "text-orange-500",
    },
  ];

  /* ================= TOUR DATA ================= */
  const tours = [
    {
      title: "Kathmandu Heritage Tour",
      location: "Kathmandu, Nepal",
      duration: "6 hours",
      max: 10,
      price: "$120",
      bookings: 18,
      status: "Active",
      image: Patan,
      description: "Explore UNESCO heritage sites of Kathmandu valley.",

      itinerary: [
        {
          time: "09:00 AM",
          title: "Swayambhunath Stupa",
          desc: "Visit the iconic Monkey Temple with panoramic city views.",
        },
        {
          time: "11:00 AM",
          title: "Kathmandu Durbar Square",
          desc: "Explore ancient palaces and temples.",
        },
        {
          time: "02:00 PM",
          title: "Patan Durbar Square",
          desc: "Discover Newari architecture and culture.",
        },
      ],

      included: [
        "Professional licensed guide",
        "Entrance fees",
        "Hotel pickup & drop-off",
      ],

      excluded: ["Meals", "Personal expenses"],

      info: [
        "Comfortable walking shoes recommended",
        "Tour involves moderate walking",
      ],
    },

    {
      title: "Everest Base Camp Trek (12 Days)",
      location: "Solukhumbu, Nepal",
      duration: "12 days",
      max: 12,
      price: "$1450",
      bookings: 22,
      status: "Active",
      image: Everest,
      description: "Adventure trek to the base of Mount Everest.",

      itinerary: [
        {
          time: "Day 1",
          title: "Flight to Lukla & Trek to Phakding",
          desc: "Scenic mountain flight and short trek.",
        },
        {
          time: "Day 5",
          title: "Acclimatization at Namche Bazaar",
          desc: "Rest and explore Sherpa culture.",
        },
        {
          time: "Day 9",
          title: "Everest Base Camp",
          desc: "Reach the base of the world's highest peak.",
        },
      ],

      included: [
        "Experienced trekking guide",
        "Porters",
        "Accommodation during trek",
        "Domestic flights",
      ],

      excluded: [
        "International flights",
        "Personal trekking gear",
        "Travel insurance",
      ],

      info: [
        "High altitude trek – good fitness required",
        "Weather may affect itinerary",
      ],
    },

    {
      title: "Pokhara Adventure & Lakeside Tour",
      location: "Pokhara, Nepal",
      duration: "8 hours",
      max: 8,
      price: "$150",
      bookings: 14,
      status: "Active",
      image: Pokhara,
      description: "Lakeside walk, boating and adventure activities.",

      itinerary: [
        {
          time: "08:00 AM",
          title: "Sarangkot Sunrise",
          desc: "Sunrise view over Annapurna range.",
        },
        {
          time: "10:00 AM",
          title: "Phewa Lake Boating",
          desc: "Relaxing boat ride on the lake.",
        },
        {
          time: "01:00 PM",
          title: "Lakeside Walk",
          desc: "Explore cafes and shops.",
        },
      ],

      included: ["Local guide", "Boat ride ticket"],

      excluded: ["Meals", "Adventure activity fees"],

      info: ["Weather dependent activities"],
    },

    {
      title: "Chitwan Jungle Safari",
      location: "Chitwan, Nepal",
      duration: "2 days",
      max: 15,
      price: "$250",
      bookings: 10,
      status: "Draft",
      image: Chitwan,
      description: "Wildlife safari in Chitwan National Park.",

      itinerary: [
        {
          time: "Day 1",
          title: "Elephant Safari",
          desc: "Explore jungle wildlife.",
        },
        {
          time: "Day 2",
          title: "Canoeing & Bird Watching",
          desc: "Observe rare bird species.",
        },
      ],

      included: ["National park entry fee", "Jungle guide"],

      excluded: ["Alcoholic drinks", "Personal expenses"],

      info: ["Wildlife sightings not guaranteed"],
    },

    {
      title: "Lumbini Buddhist Pilgrimage Tour",
      location: "Lumbini, Nepal",
      duration: "1 day",
      max: 20,
      price: "$180",
      bookings: 10,
      status: "Active",
      image: Lumbini,
      description: "Visit the birthplace of Lord Buddha.",

      itinerary: [
        {
          time: "09:00 AM",
          title: "Maya Devi Temple",
          desc: "Sacred birthplace of Lord Buddha.",
        },
        {
          time: "12:00 PM",
          title: "Monastic Zone",
          desc: "Visit international monasteries.",
        },
      ],

      included: ["Local guide", "Entrance fees"],

      excluded: ["Meals", "Personal donations"],

      info: ["Respect dress code at religious sites"],
    },
  ];

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
      </div>

      {/* ================= TOUR CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tours.map((tour, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <div className="relative">
              <img
                src={tour.image}
                alt={tour.title}
                className="h-48 w-full object-cover"
              />
              <span
                className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full text-white ${
                  tour.status === "Active" ? "bg-emerald-500" : "bg-gray-500"
                }`}
              >
                {tour.status}
              </span>
            </div>

            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-lg">{tour.title}</h3>

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
                  <Users className="w-4 h-4" /> Max {tour.max}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div>
                  <p className="text-emerald-600 font-semibold">{tour.price}</p>
                  <p className="text-xs text-gray-500">
                    {tour.bookings} bookings
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
      {showCreate && <CreateTourModal onClose={() => setShowCreate(false)} />}

      {editTour && (
        <EditTourModal tour={editTour} onClose={() => setEditTour(null)} />
      )}

      {deleteTour && <DeleteTourModal onClose={() => setDeleteTour(null)} />}
      {viewTourData && (
        <ViewTourModal
          tour={viewTourData}
          onClose={() => setViewTourData(null)}
        />
      )}
    </div>
  );
}
