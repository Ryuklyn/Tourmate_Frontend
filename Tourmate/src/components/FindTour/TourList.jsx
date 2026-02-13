import React from "react";
import TourCard from "./TourCard";

const TourList = ({tours, onToggleFavourite}) => {
  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
      {tours.length > 0 ? (
        tours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            onToggleFavourite={onToggleFavourite}
          />
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center mt-6">
          No guides found matching your filters.
        </p>
      )}
    </div>
  );
};

export default TourList;
