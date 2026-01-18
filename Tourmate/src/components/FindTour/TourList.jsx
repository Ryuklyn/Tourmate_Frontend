import React from "react";
import TourCard from "./TourCard";

import Patan from "../../assets/img/Patan.jpg";
import Everest from "../../assets/img/Everest.jpg";
import Pokhara from "../../assets/img/Pokhara.jpg";
import Chitwan from "../../assets/img/Chitwan.jpg";
import Lumbini from "../../assets/img/Lumbini.jpg";

const TourList = ({tours, onToggleFavourite}) => {
  return (

     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
