import React from "react";
import GuideCard from "./GuideCard";
import NirojSirImg from "../../assets/img/NirojSir.jpg";

const guides = [
  {
    name: "Niroj Shrestha",
    location: "Lalitpur, Nepal",
    image: NirojSirImg,
    price: 45,
    rating: 4.9,
    reviews: 127,
    response: "1 hour",
    description: "Passionate local guide with 20+ years of experience.",
    tags: ["Cultural Experience", "City Tour"],
  },
  {
    name: "Nora Kamber",
    location: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    price: 60,
    rating: 4.8,
    reviews: 89,
    response: "2 hours",
    description:
      "Paris native specializing in photography and authentic tours.",
    tags: ["Adventure", "Cultural Experience"],
  },
  {
    name: "Kate Brown",
    location: "Tokyo, Japan",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop",
    price: 60,
    rating: 5.0,
    reviews: 89,
    response: "1.5 hours",
    description:
      "Tokyo native specializing in photography and authentic tours.",
    tags: ["Adventure", "Cultural Experience"],
  },
  {
    name: "Mike Johnson",
    location: "Barcelona, Spain",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    price: 60,
    rating: 4.6,
    reviews: 89,
    response: "2 hours",
    description:
      "Barcelona native specializing in photography and authentic tours.",
    tags: ["Adventure", "Cultural Experience"],
  },
  // ... add others similarly
];

const GuideList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {guides.map((guide, i) => (
        <GuideCard key={i} guide={guide} />
      ))}
    </div>
  );
};

export default GuideList;
