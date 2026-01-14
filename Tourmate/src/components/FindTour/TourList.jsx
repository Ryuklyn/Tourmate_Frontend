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
    duration: "6 hours",
    price: "$120",
    bookings: 18,
    status: "Active",
    image: Patan,
    description: "Explore UNESCO heritage sites of Kathmandu valley.",
  },
  {
    title: "Everest Base Camp Trek (12 Days)",
    location: "Solukhumbu, Nepal",
    duration: "12 days",
    price: "$1450",
    bookings: 22,
    status: "Active",
    image: Everest,
    description: "Adventure trek to the base of Mount Everest.",
  },
  {
    title: "Pokhara Adventure & Lakeside Tour",
    location: "Pokhara, Nepal",
    duration: "8 hours",
    price: "$150",
    bookings: 14,
    status: "Active",
    image: Pokhara,
    description: "Lakeside walk, boating and adventure activities.",
  },
  {
    title: "Chitwan Jungle Safari",
    location: "Chitwan, Nepal",
    duration: "2 days",
    price: "$250",
    bookings: 10,
    status: "Draft",
    image: Chitwan,
    description: "Wildlife safari in Chitwan National Park.",
  },
  //   {
  //     title: "Lumbini Buddhist Pilgrimage Tour",
  //     location: "Lumbini, Nepal",
  //     duration: "1 day",
  //     price: "$180",
  //     bookings: 10,
  //     status: "Active",
  //     image: Lumbini,
  //     description: "Visit the birthplace of Lord Buddha.",
  //   },
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
