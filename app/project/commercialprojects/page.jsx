'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { titleVariants } from '../../../utils/animation';
import { projects } from '../../../data/commercialprojects';
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
  <Link href={`/project/commercialprojects/${project.slug}`} className="block">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInUpVariant}
      whileHover={hoverVariant}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-amber-600/20 hover:border-amber-600 cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority={false}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>
      <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3">
            {project.description}
          </p>
        </div>
        <div onClick={(e) => e.preventDefault()} className="mt-auto block">
          <span className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 text-xs sm:text-sm md:text-base inline-block text-center font-medium shadow-sm hover:shadow-md active:scale-98">
            Read More<span className="ml-2">→</span>
          </span>
        </div>
      </div>
    </motion.div>
  </Link>
));

ProjectCard.displayName = 'ProjectCard';

// Memoized HeroSection component
const HeroSection = React.memo(() => (
  <div className="relative w-full">
    <div className="absolute inset-0">
      <Image
        src="/images/projects/commercialBackgroundWallpaper.jpeg"
        alt="Commercial Projects Background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
    </div>
    <div className="relative min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center px-4">
      <motion.h1
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={titleVariants}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-wider text-center max-w-4xl mx-auto"
      >
        Commercial Projects
      </motion.h1>
    </div>
  </div>
));

HeroSection.displayName = 'HeroSection';

// Memoized SearchIcon component
const SearchIcon = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 absolute left-3 text-amber-600"
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
const CommercialProject = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Memoized suggestions generation
  const suggestions = useMemo(() => {
    const keywords = new Set();
    projects.forEach(project => {
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
    });
    
    return Array.from(keywords).slice(0, 8); // Increase to 8 suggestions
  }, []);

  // Memoized filtered projects with improved search
  const filteredProjects = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return projects;
    
    const searchLower = debouncedSearchTerm.toLowerCase();
    return projects.filter(project => {
      const titleMatch = project.title.toLowerCase().includes(searchLower);
      const descriptionMatch = project.description?.toLowerCase().includes(searchLower);
      const categoryMatch = project.category?.toLowerCase().includes(searchLower);
      const locationMatch = project.location?.toLowerCase().includes(searchLower);
      
      return titleMatch || descriptionMatch || categoryMatch || locationMatch;
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
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Search Box with Better UX */}
        <div className="flex justify-center mt-12 mb-6">
          <div className="relative w-full max-w-lg">
            <div className="flex items-center">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search projects by name, city, or category..."
                className="w-full p-3 pl-10 border border-amber-500/30 rounded-3xl shadow focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search projects"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 text-gray-400 hover:text-amber-600 transition-colors duration-200 p-1 rounded-full hover:bg-amber-50"
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
                      Search by project name, city, category, or description
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results Section with Loading State */}
        <div className="py-8 lg:py-16">
          {searchTerm && searchTerm !== debouncedSearchTerm ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            </div>
          ) : (
            <>
              {/* Results Count */}
              {debouncedSearchTerm && (
                <div className="mb-6 text-center">
                  <p className="text-gray-600">
                    {filteredProjects.length > 0 
                      ? `Found ${filteredProjects.length} project${filteredProjects.length === 1 ? '' : 's'}`
                      : 'No projects found'
                    }
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6 md:py-8">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))
                ) : (
                  debouncedSearchTerm && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-600 text-center col-span-full py-12"
                    >
                      <div className="max-w-md mx-auto">
                        <svg className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.5-2.709" />
                        </svg>
                        <p className="text-lg font-medium mb-2">No projects found</p>
                        <p className="text-sm text-gray-500">
                          Try adjusting your search terms or browse all projects
                        </p>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommercialProject;