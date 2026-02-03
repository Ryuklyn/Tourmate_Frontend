import React from "react";
import TourCard from "./TourCard";

import Patan from "../../assets/img/Patan.jpg";
import Everest from "../../assets/img/Everest.jpg";
import Pokhara from "../../assets/img/Pokhara.jpg";
import Chitwan from "../../assets/img/Chitwan.jpg";
import Lumbini from "../../assets/img/Lumbini.jpg";

/* ================= TOUR DATA ================= */
const tours = [
  {
    title: "Kathmandu Heritage Tour",
    location: "Kathmandu, Nepal",
    hours: 6,
    price: 120,
    bookings: 18,
    status: "Active",
    image: Patan,
    description: "Explore UNESCO heritage sites of Kathmandu valley.",
  },
  {
    title: "Everest Base Camp Trek (12 Days)",
    location: "Solukhumbu, Nepal",
    hours: 12,
    price: 1450,
    bookings: 22,
    status: "Active",
    image: Everest,
    description: "Adventure trek to the base of Mount Everest.",
  },
  {
    title: "Pokhara Adventure & Lakeside Tour",
    location: "Pokhara, Nepal",
    hours: 8,
    price: 150,
    bookings: 14,
    status: "Active",
    image: Pokhara,
    description: "Lakeside walk, boating and adventure activities.",
  },
  {
    title: "Chitwan Jungle Safari",
    location: "Chitwan, Nepal",
    hours: 16,
    price: 250,
    bookings: 10,
    status: "Draft",
    image: Chitwan,
    description: "Wildlife safari in Chitwan National Park.",
  },
];

const TourList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tours.map((tour, i) => (
        <TourCard key={i} tour={tour} />
      ))}
    </div>
  );
};

export default TourList;
