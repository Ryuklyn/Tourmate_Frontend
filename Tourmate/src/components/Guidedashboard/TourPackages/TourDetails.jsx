import React from "react";
import {
  MapPin,
  Star,
  Clock,
  Users,
  Languages,
  Package,
  Check,
  X,
  Calendar,
  Heart,
} from "lucide-react";

// demo purpose – normally use params or API
import Patan from "../../../assets/img/Patan.jpg";

const tours = [
  {
    title: "Kathmandu Heritage Tour",
    location: "Kathmandu, Nepal",
    duration: "6 hours",
    max: 10,
    price: "$120",
    image: Patan,
    description: "Explore UNESCO heritage sites of Kathmandu valley.",
    itinerary: [
      {
        time: "09:00 AM",
        title: "Swayambhunath Stupa",
        desc: "Visit Monkey Temple.",
      },
      {
        time: "11:00 AM",
        title: "Kathmandu Durbar Square",
        desc: "Ancient palaces.",
      },
      {
        time: "02:00 PM",
        title: "Patan Durbar Square",
        desc: "Newari culture.",
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
      "Moderate walking involved",
    ],
  },
];

const TourDetails = () => {
  const tour = tours[0];

  return (
    <div className="w-full">
      {/* HERO */}
      <div className="relative h-[420px]">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-10 left-10 text-white max-w-3xl">
          <div className="flex gap-2 mb-3">
            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
              Verified
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              Cultural
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-3">{tour.title}</h1>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin size={16} /> {tour.location}
            </div>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400" /> 4.9 (234 reviews)
            </div>
          </div>
        </div>
        {/* HEART BUTTON */}
        <button
          type="button"
          className="absolute bottom-10 right-10 z-20
            w-12 h-12
            bg-white rounded-full! shadow-md
            flex items-center justify-center"
        >
          <Heart size={18} className="text-gray-900 shrink-0" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">
          {/* OVERVIEW */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-600">{tour.description}</p>
          </section>
          <hr className="text-gray-200" />

          {/* QUICK INFO */}
          <section>
            <h2 className="text-2xl font-semibold mb-5">Quick Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard
                icon={<Clock />}
                label="Duration"
                value={tour.duration}
              />
              <InfoCard
                icon={<Users />}
                label="Group Size"
                value={`Max ${tour.max} people`}
              />
              <InfoCard
                icon={<Languages />}
                label="Languages"
                value="English"
              />
              <InfoCard
                icon={<Package />}
                label="Package Type"
                value="All Inclusive"
              />
            </div>
          </section>
          <hr className="text-gray-200" />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* INCLUDED */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
              <ul className="space-y-2">
                {tour.included.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <Check className="text-green-500" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* EXCLUDED */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">What's Excluded</h2>
              <ul className="space-y-2">
                {tour.excluded.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <X className="text-red-500" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <hr className="text-gray-200" />

          {/* ITINERARY */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Itinerary</h2>
            <div className="space-y-6">
              {tour.itinerary.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="text-sm text-gray-500">{step.time}</p>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT – BOOK CARD */}
        <div className="sticky top-24 h-fit">
          <div className="bg-white rounded-2xl shadow p-6 space-y-6">
            <div>
              <p className="text-sm text-gray-500">Price per package</p>
              <h3 className="text-3xl font-bold text-blue-600">{tour.price}</h3>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Book Now
            </button>

            <button className="w-full border py-3 rounded-lg font-semibold">
              Contact Us
            </button>

            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Calendar size={16} />
              Free cancellation up to 24 hours before departure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// const InfoCard = ({ icon, label, value }) => (
//   <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
//     <div className="text-blue-600">{icon}</div>
//     <div>
//       <p className="text-sm text-gray-500">{label}</p>
//       <p className="font-semibold">{value}</p>
//     </div>
//   </div>
// );

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 bg-blue-100 p-4 rounded-xl">
    <div className="text-blue-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default TourDetails;
