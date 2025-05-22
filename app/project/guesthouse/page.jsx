'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { titleVariants } from '../../../utils/animation';
import { guestprojects } from '../../../data/guesthousedata';
import Link from 'next/link';
import Image from 'next/image';

// Animation variants - moved outside component to prevent re-creation
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const hoverVariant = {
  scale: 1.02,
  transition: { duration: 0.2 }
};

const suggestionVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 }
};

// Memoized ProjectCard component
const ProjectCard = React.memo(({ project }) => (
  <Link href={`/project/guesthouse/${project.slug}`} className="block">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInUpVariant}
      whileHover={hoverVariant}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-amber-600/20 hover:border-amber-600 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={project.image}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
          alt={project.title}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Button Container */}
        <div onClick={(e) => e.preventDefault()} className="mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-700 to-yellow-600 text-white rounded-lg hover:from-amber-800 hover:to-yellow-700 transition-all duration-300 text-sm sm:text-base font-medium shadow-sm hover:shadow-md"
          >
            Read More
            <span className="ml-2">→</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  </Link>
));

ProjectCard.displayName = 'ProjectCard';

// Memoized HeroSection component
const HeroSection = React.memo(() => (
  <div className="relative h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] flex items-center justify-center">
    <Image
      src="/images/home/guestHouse.jpg"
      alt="Guest House Projects Background"
      fill
      priority
      className="object-cover"
      sizes="100vw"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    />
    <div className="absolute inset-0 bg-black/60"></div>
    <motion.h1
      initial="offscreen"
      whileInView="onscreen"
      variants={titleVariants}
      className="container relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-wider text-center px-4"
    >
      Guest House Projects
    </motion.h1>
  </div>
));

HeroSection.displayName = 'HeroSection';

// Memoized SearchIcon component
const SearchIcon = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 absolute left-5 text-amber-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
));

SearchIcon.displayName = 'SearchIcon';

// Memoized ClearIcon component
const ClearIcon = React.memo(() => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
));

ClearIcon.displayName = 'ClearIcon';

// Memoized InfoIcon component
const InfoIcon = React.memo(() => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5 text-amber-500 mr-2" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
));

InfoIcon.displayName = 'InfoIcon';

// Utility function to debounce search
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Main component
const GuestProject = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Memoized suggestions generation
  const suggestions = useMemo(() => {
    const keywords = new Set();
    guestprojects.forEach(project => {
      // Extract meaningful keywords from title
      const words = project.title
        .toLowerCase()
        .split(/[\s,.-]+/)
        .filter(word => word.length > 3 && word.length < 15);
      
      words.forEach(word => keywords.add(word));
      
      // Also add project categories or types if available
      if (project.category) {
        keywords.add(project.category.toLowerCase());
      }
      if (project.location) {
        keywords.add(project.location.toLowerCase());
      }
      if (project.type) {
        keywords.add(project.type.toLowerCase());
      }
    });
    
    return Array.from(keywords).slice(0, 8); // Up to 8 suggestions
  }, []);

  // Memoized filtered projects with improved search
  const filteredProjects = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return guestprojects;
    
    const searchLower = debouncedSearchTerm.toLowerCase();
    return guestprojects.filter(project => {
      const titleMatch = project.title.toLowerCase().includes(searchLower);
      const descriptionMatch = project.description?.toLowerCase().includes(searchLower);
      const categoryMatch = project.category?.toLowerCase().includes(searchLower);
      const locationMatch = project.location?.toLowerCase().includes(searchLower);
      const typeMatch = project.type?.toLowerCase().includes(searchLower);
      
      return titleMatch || descriptionMatch || categoryMatch || locationMatch || typeMatch;
    });
  }, [debouncedSearchTerm]);

  const noResults = debouncedSearchTerm.trim() && filteredProjects.length === 0;

  // Memoized callbacks
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const handleSuggestionClick = useCallback((suggestion) => {
    setSearchTerm(suggestion);
  }, []);

  // Prevent unnecessary re-renders during search
  const handleSuggestionKeyDown = useCallback((e, suggestion) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSuggestionClick(suggestion);
    }
  }, [handleSuggestionClick]);

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Enhanced Search Bar Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 mb-6 relative z-20">
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-lg p-2">
            <div className="flex items-center">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search guest house projects by name, location, or features..."
                className="w-full p-3 pl-12 border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200"
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search guest house projects"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-5 text-gray-400 hover:text-amber-600 transition-colors duration-200 p-1 rounded-full hover:bg-amber-50"
                  aria-label="Clear search"
                  type="button"
                >
                  <ClearIcon />
                </button>
              )}
            </div>

            {/* Enhanced No Results with Better Suggestions */}
            <AnimatePresence>
              {noResults && (
                <motion.div
                  {...suggestionVariants}
                  className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-amber-200 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <InfoIcon />
                      <p className="text-gray-700 font-medium">
                        No results found for "{debouncedSearchTerm}"
                      </p>
                    </div>

                    <p className="text-gray-600 text-sm mb-3">Try searching for:</p>

                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion, index) => (
                        <motion.button
                          key={`${suggestion}-${index}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSuggestionClick(suggestion)}
                          onKeyDown={(e) => handleSuggestionKeyDown(e, suggestion)}
                          className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm hover:bg-amber-200 focus:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors duration-200 capitalize"
                          type="button"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>

                    <p className="text-gray-500 text-xs mt-3">
                      Search by location, property name, features, or accommodation type
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Projects Grid Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12 lg:py-16">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            variants={titleVariants}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center mb-8 sm:mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              Discover Our Featured Projects
            </h2>
          </motion.div>

          {/* Loading State */}
          {searchTerm && searchTerm !== debouncedSearchTerm ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600"></div>
            </div>
          ) : (
            <>
              {/* Results Count */}
              {debouncedSearchTerm && (
                <div className="mb-8 text-center">
                  <p className="text-gray-600">
                    {filteredProjects.length > 0 
                      ? `Found ${filteredProjects.length} project${filteredProjects.length === 1 ? '' : 's'}`
                      : 'No projects found'
                    }
                  </p>
                </div>
              )}

              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                debouncedSearchTerm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="max-w-md mx-auto">
                      <svg 
                        className="h-20 w-20 text-gray-300 mx-auto mb-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No Guest House Projects Found
                      </h3>
                      <p className="text-gray-600 mb-2">
                        No guest house projects found matching your search.
                      </p>
                      <p className="text-gray-500 text-sm">
                        Try adjusting your search terms or browse all projects.
                      </p>
                    </div>
                  </motion.div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default GuestProject;