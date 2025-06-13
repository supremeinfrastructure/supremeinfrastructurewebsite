"use client";
import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
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

// Constants moved outside component to prevent recreation
const HIGHLIGHTS_ICON_MAP = {
  History, House, Banknote, Sprout, Timer, Wallpaper,
  GraduationCap, Utensils, Dumbbell, LampCeiling, CookingPot,
  BrickWall, Moon, DoorOpen
};

const GRID_CLASSES = {
  gallery: 'grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 md:mt-16 w-full',
  highlights: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 w-full',
  videos: 'grid grid-cols-1 md:grid-cols-2 gap-6'
};

const COMMON_STYLES = {
  sectionTitle: 'text-3xl md:text-4xl lg:text-5xl font-xl mb-8 text-center text-amber-800 md:my-6',
  divider: 'w-36 h-1 bg-gradient-to-r bg-amber-700 hover:bg-amber-700 mx-auto mb-8',
  button: 'bg-gradient-to-r from-amber-700 to-yellow-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'
};

// Optimized project finder with caching
const projectCache = new Map();
const getProjectBySlug = (slug) => {
  if (!slug) return null;
  
  if (projectCache.has(slug)) {
    return projectCache.get(slug);
  }
  
  const project = guestprojects.find((project) => project.slug === slug);
  if (project) {
    projectCache.set(slug, project);
  }
  
  return project;
};

// Optimized Video Component with error handling and lazy loading
const VideoPlayer = React.memo(({ video, index }) => {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  if (hasError) {
    return (
      <div className='relative aspect-video w-full rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center'>
        <p className='text-gray-500'>Video unavailable</p>
      </div>
    );
  }

  return (
    <div ref={videoRef} className='relative aspect-video w-full rounded-lg overflow-hidden'>
      {isInView && (
        <video
          className='w-full h-full object-cover'
          loop
          muted
          playsInline
          controls
          poster={video.thumbnail}
          preload="metadata"
          onError={handleError}
        >
          <source src={video.url} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      )}
      {video.title && (
        <p className='mt-2 text-center text-gray-700'>{video.title}</p>
      )}
    </div>
  );
});
VideoPlayer.displayName = 'VideoPlayer';

// Optimized Gallery Image with lazy loading and error handling
const GalleryImage = React.memo(({ galleryImage, index, onImageClick }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = useCallback(() => {
    if (!hasError) {
      onImageClick(galleryImage.image);
    }
  }, [galleryImage.image, onImageClick, hasError]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <div
      className={`relative aspect-video w-full rounded-lg overflow-hidden transition-all duration-300 ${
        hasError ? 'bg-gray-200 cursor-default' : 'cursor-pointer hover:scale-105'
      }`}
      onClick={handleClick}
    >
      {hasError ? (
        <div className='flex items-center justify-center h-full'>
          <p className='text-gray-500 text-sm'>Image unavailable</p>
        </div>
      ) : (
        <>
          {!isLoaded && (
            <div className='absolute inset-0 bg-gray-200 animate-pulse' />
          )}
          <Image
            src={galleryImage.image}
            alt={galleryImage.alt || `Gallery image ${index + 1}`}
            fill
            loading="lazy"
            sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
            className={`object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
          />
        </>
      )}
    </div>
  );
});
GalleryImage.displayName = 'GalleryImage';

// Optimized Highlight Item with dynamic icon loading
const HighlightItem = React.memo(({ item, index }) => {
  const IconComponent = HIGHLIGHTS_ICON_MAP[item.icon];

  return (
    <div className="lg:my-8 flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
      {IconComponent ? (
        <IconComponent className="w-8 h-8 mb-4 text-cyan-600" />
      ) : (
        <div className="w-8 h-8 mb-4 bg-gray-300 rounded" />
      )}
      <p className="text-sm font-medium text-gray-900">{item.description}</p>
    </div>
  );
});
HighlightItem.displayName = 'HighlightItem';

// Optimized Configuration Row
const ConfigurationRow = React.memo(({ config, index }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
    <td className="py-3 px-4 md:text-center">{config.flat}</td>
    <td className="py-3 px-4 md:text-center">{config.carpet}</td>
    <td className="py-3 px-4 md:text-center">
      <Link 
        href="/contact" 
        className={COMMON_STYLES.button}
        prefetch={false}
      >
        Get Quote
      </Link>
    </td>
  </tr>
));
ConfigurationRow.displayName = 'ConfigurationRow';

// Optimized Modal Component
const ImageModal = React.memo(({ image, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className='fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50'
      onClick={handleBackdropClick}
    >
      <div className='relative w-full h-full max-w-5xl max-h-5xl p-4'>
        <Image
          src={image}
          alt='Full view'
          fill
          priority
          style={{ objectFit: "contain" }}
          sizes="100vw"
        />
        <button
          className='absolute top-4 right-4 text-white text-4xl hover:text-red-600 transition-colors md:text-6xl z-10'
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
    </div>
  );
});
ImageModal.displayName = 'ImageModal';

// Main Component
export default function ProjectPage() {
  const { slug } = useParams();
  const [fullViewImage, setFullViewImage] = useState(null);
  
  // Memoize project to prevent unnecessary recalculations
  const project = useMemo(() => getProjectBySlug(slug), [slug]);

  // Optimized callbacks with dependency arrays
  const openFullView = useCallback((image) => {
    setFullViewImage(image);
  }, []);

  const closeFullView = useCallback(() => {
    setFullViewImage(null);
  }, []);

  // Memoized rendered lists with null checks
  const videoList = useMemo(() => {
    if (!project?.videos?.length) return null;
    
    return project.videos.map((video, index) => (
      <VideoPlayer key={`video-${index}`} video={video} index={index} />
    ));
  }, [project?.videos]);

  const galleryImagesList = useMemo(() => {
    if (!project?.galleryImages?.length) return null;
    
    return project.galleryImages.map((galleryImage, index) => (
      <GalleryImage
        key={`gallery-${index}`}
        galleryImage={galleryImage}
        index={index}
        onImageClick={openFullView}
      />
    ));
  }, [project?.galleryImages, openFullView]);

  const highlightsList = useMemo(() => {
    if (!project?.highlights?.length) return null;
    
    return project.highlights.map((item, index) => (
      <HighlightItem key={`highlight-${index}`} item={item} index={index} />
    ));
  }, [project?.highlights]);

  const configurationRows = useMemo(() => {
    if (!project?.configuration?.length) return null;
    
    return project.configuration.map((config, index) => (
      <ConfigurationRow key={`config-${index}`} config={config} index={index} />
    ));
  }, [project?.configuration]);

  // Early return for performance
  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <div className="bg-gradient-to-b from-white-100 to-white min-h-screen md:mt-36">
      <div className="w-full">
        {/* Hero Section */}
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
        {(galleryImagesList || videoList) && (
          <section className='bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 w-full'>
            <h2 className={COMMON_STYLES.sectionTitle}>Gallery</h2>
            <div className={COMMON_STYLES.divider}></div>

            {videoList && (
              <div className='mb-12'>
                <div className={GRID_CLASSES.videos}>
                  {videoList}
                </div>
              </div>
            )}

            {galleryImagesList && (
              <div className={GRID_CLASSES.gallery}>
                {galleryImagesList}
              </div>
            )}
          </section>
        )}

        {/* Project Highlights */}
        {highlightsList && (
          <div className="bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 w-full">
            <h2 className={COMMON_STYLES.sectionTitle}>
              Project Highlights
            </h2>
            <div className={COMMON_STYLES.divider}></div>
            <div className={GRID_CLASSES.highlights}>
              {highlightsList}
            </div>
          </div>
        )}

        {/* Configuration Section */}
        {configurationRows && (
          <section className='bg-white py-12 px-4 sm:px-6 lg:px-8 w-full'>
            <h2 className={COMMON_STYLES.sectionTitle}>
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
        )}

        {/* Modal */}
        {fullViewImage && (
          <ImageModal image={fullViewImage} onClose={closeFullView} />
        )}
      </div>
    </div>
  );
}