import React from "react";
import { X, MapPin, Clock, Users, Check, XCircle, Info } from "lucide-react";

const ViewTourModal = ({ tour, onClose }) => {
  if (!tour) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl relative overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">Tour Details</h2>
            <p className="text-gray-500 text-sm">
              View complete information about this tour package.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full border border-gray-400 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[80vh] overflow-y-auto p-6 space-y-6">
          {/* Image */}
          <div className="relative">
            <img
              src={tour.tourPic && `data:image/jpeg;base64,${tour.tourPic}`}
              alt={tour.title}
              className="w-full h-64 object-cover rounded-xl"
            />

            <span
              className={`absolute top-4 right-4 px-3 py-1 text-sm rounded-full text-white ${
                tour.status === "Active" ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              {tour.status}
            </span>
          </div>

          {/* Title & Meta */}
          <div>
            <h3 className="text-2xl font-bold mb-2">{tour.title}</h3>

            <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {tour.location}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {tour.duration}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Max {tour.maxGuests} guests
              </span>
              <span className="flex items-center gap-2">
              Price  <span className="text-green-600 font-semibold">  {tour.price}</span>
              </span>
              
            </div>

            <p className="mt-4 text-gray-600">{tour.description}</p>
          </div>

          {/* Itinerary */}
          {tour.itineraries?.length > 0 && (
            <div className="border border-gray-200 rounded-xl p-5">
              <h4 className="font-semibold mb-4">Tour Itinerary</h4>

              <div className="space-y-4">
                {tour.itineraries.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-green-600">
                        {item.time} — {item.title}
                      </p>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Included / Not Included */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Included */}
            <div className="border border-gray-200 rounded-xl p-5">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Included
              </h4>

              <ul className="space-y-2 text-gray-600">
                {tour.included?.map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-green-500">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Included */}
            <div className="border border-gray-200 rounded-xl p-5">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                Not Included
              </h4>

              <ul className="space-y-2 text-gray-600">
                {tour.notIncluded?.map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-red-500">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Important Info */}
          {tour.info?.length > 0 && (
            <div className="border border-gray-200 rounded-xl p-5">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-orange-500" />
                Important Information
              </h4>

              <ul className="space-y-2 text-gray-600">
                {tour.importantInformation.map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-orange-500">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTourModal;
