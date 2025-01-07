"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { motion } from "framer-motion";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className='w-full h-full py-12 md:py-12 mt-22 md:mt-12 bg-gradient-to-b from-white to-gray-100'>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 font-sans mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center"
        >
          Our Services
          <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-32 sm:w-40 md:w-48 h-1 bg-orange-700 mx-auto mb-6 sm:mb-8"
        ></motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-12 md:mb-16 max-w-2xl lg:max-w-3xl leading-relaxed md:text-center lg:ml-52"
        >
          Experience our comprehensive range of innovative solutions tailored to elevate your projects.
        </motion.p>
      </div>
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    category: "INTERIOR DESIGN",
    title: "Efficient space utilization with cutting-edge design concepts.",
    src: "/images/services/interior.jpeg",
  },
  {
    category: "CIVIL CONSTRUCTION",
    title: "State-of-the-art technology for economical and safe building construction.",
    src: "/images/services/civil.jpg",
  },
  {
    category: "ARCHITECTURAL DESIGN",
    title: "Market-driven, budget-friendly designs aligned with the latest trends.",
    src: "/images/services/architecture.jpg",
  },
  {
    category: "CABLE TRENCH",
    title: "Advanced underground cabling solutions for efficient infrastructure.",
    src: "/images/services/cabletrench.jpg",
  },
  {
    category: "INDUSTRIAL BUILDING",
    title: "Specialized structures for EV & Solar businesses, partnering with leading corporates.",
    src: "/images/services/industrial-building.jpg",
  },
  {
    category: "HORTICULTURE DESIGN",
    title: "Urban Forest themes, including projects like Urban Jungle for Panvel Municipal Corporation.",
    src: "/images/services/horticulture-design.jpg",
  },
  {
    category: "GARDEN MAINTENANCE",
    title: "Expert development and maintenance of gardens, parks, and ornamental spaces.",
    src: "/images/services/garden-maintenance.jpg",
  },
  {
    category: "BUILDING DESIGN",
    title: "Sustainable, technology-driven designs adaptable to any environment.",
    src: "/images/services/building-design.jpg",
  },
];