import React from "react";
import GuideCard from "./GuideCard";

const GuideList = ({ guides, onToggleFavourite }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {guides.length > 0 ? (
        guides.map((guide) => (
          <GuideCard
            key={guide.guideId}
            guide={guide}
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

export default GuideList;
