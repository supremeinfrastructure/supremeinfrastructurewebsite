"use client";
import { useState, useEffect } from "react";
import {
  Archive, Columns4, Component, DoorOpen, CircleSlash2, PaintBucket, CookingPotIcon, House, Wallpaper, Bath, Frame, InspectionPanel, BedSingle, Fence, LampCeiling, Dumbbell,
  Lightbulb, Sofa, ChefHat, Bed, ChevronUp, Badge, PanelsTopLeft, Shield, ShowerHead,Lamp,
} from 'lucide-react';
import { projects } from "../../../../data/residencialprojects";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProjectNotFound from "@/components/ProjectNotFoundResidencial";
import { motion } from "framer-motion";

const getProjectBySlug = (slug) => {
  return projects.find((project) => project.slug === slug);
};

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [fullViewImage, setFullViewImage] = useState(null);

  if (!project) {
    return <ProjectNotFound />;
  }

  const openFullView = (image) => {
    setFullViewImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeFullView = () => {
    setFullViewImage(null);
    document.body.style.overflow = "auto";
  };

  const highlightsIcon = {
    Archive, Columns4, Component, DoorOpen, CircleSlash2, PaintBucket, Fence, LampCeiling, Lightbulb, Dumbbell,
    CookingPotIcon, House, Wallpaper, Bath, Frame, InspectionPanel, BedSingle, Sofa, ChefHat, Bed, ChevronUp, Badge, PanelsTopLeft, Shield, ShowerHead,Lamp
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white">
      <div className="w-full">
        {/* Hero */}
        <section className="py-12 px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <h1 className="text-3xl md:text-5xl font-extrabold text-orange-800 mb-4 mt-12">
                {project.title}
              </h1>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {project.fullDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 cursor-pointer"
              onClick={() => openFullView(project.image)}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={720}
                height={480}
                priority
                className="rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 md:mt-24"
              />
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        {(project.galleryImages || project.videos) && (
          <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6 lg:px-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-800 mb-10">
              Gallery
            </h2>

            {/* Videos */}
            {project.videos?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {project.videos.map((video, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
                  >
                    <video className="w-full h-full object-cover" controls poster={video.thumbnail}>
                      <source src={video.url} type="video/mp4" />
                    </video>
                    <p className="mt-2 text-center text-gray-600">{video.title}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Images */}
            {project.galleryImages && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.galleryImages.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square overflow-hidden rounded-xl shadow-md cursor-pointer"
                    onClick={() => openFullView(img.image)}
                  >
                    <Image
                      src={img.image}
                      alt={img.alt}
                      fill
                      className="object-cover hover:scale-110 transition duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Highlights */}
        {project.highlights && (
          <section className="bg-white py-16 px-6 lg:px-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-800 mb-12">
              Project Highlights
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {project.highlights.map((item, i) => {
                const Icon = highlightsIcon[item.icon];
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition"
                  >
                    {Icon && <Icon className="w-10 h-10 mb-3 text-amber-600" />}
                    <p className="text-sm font-medium text-gray-700">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* Config */}
        <section className="bg-gradient-to-r from-orange-50 to-amber-100 py-16 px-6 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-800 mb-10">
            Configuration
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white/90 backdrop-blur-md shadow-lg rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-amber-700 text-white text-sm md:text-base">
                  <th className="py-3 px-4">Approx Area</th>
                  <th className="py-3 px-4">Project Duration</th>
                  <th className="py-3 px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {project.configuration.map((cfg, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-amber-50 transition">
                    <td className="py-3 px-4 text-center">{cfg.flat}</td>
                    <td className="py-3 px-4 text-center">{cfg.carpet}</td>
                    <td className="py-3 px-4 text-center">
                      <Link
                        href="/contact"
                        className="inline-block bg-gradient-to-r from-amber-700 to-amber-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition"
                      >
                        Get Quote
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modal */}
        {fullViewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={closeFullView}
          >
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] p-6">
              <Image
                src={fullViewImage}
                alt="Full view"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
              <button
                className="absolute top-4 right-6 text-white text-4xl hover:text-red-500 transition"
                onClick={closeFullView}
              >
                &times;
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
