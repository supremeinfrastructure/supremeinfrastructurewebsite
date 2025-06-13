"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  History, House, Banknote, Sprout, Timer, Wallpaper,
  GraduationCap, Utensils, Dumbbell, LampCeiling, CookingPot,
  BrickWall, Moon, DoorOpen
} from 'lucide-react';
import { guestprojects } from "../../../../data/guesthousedata";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProjectNotFound from "@/components/ProjectNotFoundGuestHouse";

// Memoized icon mapping to prevent recreation on every render
const highlightsIcon = {
  History,
  House,
  Banknote,
  Sprout,
  Timer,
  Wallpaper,
  GraduationCap,
  Utensils,
  Dumbbell,
  LampCeiling,
  CookingPot,
  BrickWall,
  Moon,
  DoorOpen
};

// Memoized function to get project by slug - moved outside component for better performance
const getProjectBySlug = (slug) => {
  return guestprojects.find((project) => project.slug === slug);
};

// Memoized Video Component with display name for better debugging
const VideoPlayer = React.memo(({ video, index }) => (
  <div className='relative aspect-video w-full rounded-lg overflow-hidden'>
    <video
      className='w-full h-full object-cover'
      loop
      muted
      playsInline
      controls
      poster={video.thumbnail}
      preload="metadata"
    >
      <source src={video.url} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
    {video.title && (
      <p className='mt-2 text-center text-gray-700'>{video.title}</p>
    )}
  </div>
));
VideoPlayer.displayName = 'VideoPlayer';

// Memoized Gallery Image Component with display name
const GalleryImage = React.memo(({ galleryImage, index, onImageClick }) => {
  const handleClick = useCallback(() => {
    onImageClick(galleryImage.image);
  }, [galleryImage.image, onImageClick]);

  return (
    <div
      className='relative aspect-video w-full cursor-pointer rounded-lg overflow-hidden'
      onClick={handleClick}
    >
      <Image
        src={galleryImage.image}
        alt={galleryImage.alt || `Gallery image ${index + 1}`}
        fill
        loading="lazy"
        sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
        className='object-cover transition duration-300 ease-in-out hover:scale-105'
      />
    </div>
  );
});
GalleryImage.displayName = 'GalleryImage';

// Memoized Highlight Item Component with display name
const HighlightItem = React.memo(({ item, index }) => {
  const IconComponent = useMemo(() => highlightsIcon[item.icon], [item.icon]);

  return (
    <div
      className="lg:my-8 flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
    >
      {IconComponent && <IconComponent className="w-8 h-8 mb-4 text-cyan-600" />}
      <p className="text-sm font-medium text-gray-900">{item.description}</p>
    </div>
  );
});
HighlightItem.displayName = 'HighlightItem';

// Memoized Configuration Row Component with display name
const ConfigurationRow = React.memo(({ config, index }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-100">
    <td className="py-3 px-4 md:text-center">{config.flat}</td>
    <td className="py-3 px-4 md:text-center">{config.carpet}</td>
    <td className="py-3 px-4 md:text-center">
      <Link href="/contact" className="bg-gradient-to-r from-amber-700 to-yellow-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
        Get Quote
      </Link>
    </td>
  </tr>
));
ConfigurationRow.displayName = 'ConfigurationRow';

export default function ProjectPage() {
  const { slug } = useParams();
  const [fullViewImage, setFullViewImage] = useState(null);

  // Memoize project to prevent unnecessary recalculations
  const project = useMemo(() => getProjectBySlug(slug), [slug]);

  // Memoized callbacks
  const openFullView = useCallback((image) => {
    setFullViewImage(image);
  }, []);

  const closeFullView = useCallback(() => {
    setFullViewImage(null);
  }, []);

  // Memoized event handler for escape key
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && fullViewImage) {
      closeFullView();
    }
  }, [fullViewImage, closeFullView]);

  // Handle escape key for modal - optimized with memoized handler
  useEffect(() => {
    if (fullViewImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [fullViewImage, handleEscape]);

  // Memoized video list to prevent recreation
  const videoList = useMemo(() => {
    if (!project?.videos?.length) return null;
    
    return project.videos.map((video, index) => (
      <VideoPlayer key={index} video={video} index={index} />
    ));
  }, [project?.videos]);

  // Memoized gallery images list
  const galleryImagesList = useMemo(() => {
    if (!project?.galleryImages) return null;
    
    return project.galleryImages.map((galleryImage, index) => (
      <GalleryImage
        key={index}
        galleryImage={galleryImage}
        index={index}
        onImageClick={openFullView}
      />
    ));
  }, [project?.galleryImages, openFullView]);

  // Memoized highlights list
  const highlightsList = useMemo(() => {
    if (!project?.highlights) return null;
    
    return project.highlights.map((item, index) => (
      <HighlightItem key={index} item={item} index={index} />
    ));
  }, [project?.highlights]);

  // Memoized configuration rows
  const configurationRows = useMemo(() => {
    if (!project?.configuration) return null;
    
    return project.configuration.map((config, index) => (
      <ConfigurationRow key={index} config={config} index={index} />
    ));
  }, [project?.configuration]);

  // Early return for better performance
  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <div className="bg-gradient-to-b from-white-100 to-white min-h-screen md:mt-36">
      <div className="w-full">
        <section className='py-8 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col lg:flex-row items-start mx-auto w-full'>
            <div className='lg:w-1/2 lg:pr-6 text-center'>
              <h1 className='text-2xl md:text-5xl font-bold mb-4 text-amber-800 text-center lg:text-center md:my-8 md:ml-24'>
                {project.title}
              </h1>
              <p className='mb-4 text-sm md:text-base text-black lg:text-center lg:ml-24'>
                {project.fullDescription}
              </p>
            </div>
            <div className='lg:w-2/2 mt-4 lg:mt-0 lg:ml-36'>
              <div
                className='cursor-pointer transition-transform duration-300 hover:scale-105'
                onClick={() => openFullView(project.image)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className='w-full h-auto object-cover rounded-lg'
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {(project.galleryImages || project.videos) && (
          <section className='bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 w-full'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-xl mb-8 text-center text-amber-800 md:my-6'>Gallery</h2>
            <div className='w-36 h-1 bg-gradient-to-r bg-amber-700 hover:bg-amber-700 mx-auto mb-8'></div>

            {/* Videos */}
            {videoList && (
              <div className='mb-12'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {videoList}
                </div>
              </div>
            )}

            {/* Images */}
            {galleryImagesList && (
              <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 md:mt-16 w-full'>
                {galleryImagesList}
              </div>
            )}
          </section>
        )}

        {project.highlights && (
          <div className="bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 w-full">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-xl mb-8 text-center text-amber-800 md:my-6">
              Project Highlights
            </h2>
            <div className="w-36 h-1 bg-gradient-to-r bg-amber-700 hover:bg-amber-700 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 w-full">
              {highlightsList}
            </div>
          </div>
        )}

        {/* Configuration Section */}
        <section className='bg-white py-12 px-4 sm:px-6 lg:px-8 w-full'>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-xl mb-8 text-center text-amber-800 md:my-6">
            Configuration
          </h2>
          <div className="w-36 h-1 bg-gradient-to-r bg-amber-700 hover:bg-cyan-600 mx-auto mb-8"></div>

          <div className="overflow-x-auto mb-12">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-navy-700 text-black md:text-center">
                  <th className="py-3 px-4 text-left md:text-center">Approx Area</th>
                  <th className="py-3 px-4 text-left md:text-center">Project duration</th>
                  <th className="py-3 px-4 text-left md:text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                {configurationRows}
              </tbody>
            </table>
          </div>
        </section>

        {/* Full View Modal */}
        {fullViewImage && (
          <div
            className='fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50'
            onClick={closeFullView}
          >
            <div className='relative w-full h-full max-w-5xl max-h-5xl p-4'>
              <Image
                src={fullViewImage}
                alt='Full view'
                fill={true}
                loading='eager'
                style={{ objectFit: "contain" }}
                sizes="100vw"
              />
              <button
                className='absolute top-4 right-4 text-white text-4xl hover:text-red-600 transition-colors md:text-6xl'
                onClick={closeFullView}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}