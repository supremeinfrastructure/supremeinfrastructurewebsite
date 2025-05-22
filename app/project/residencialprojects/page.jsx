'use client'
import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { titleVariants } from '../../../utils/animation';
import { projects } from '../../../data/residencialprojects';
import Link from 'next/link';
import Image from 'next/image';

// Optimized animation variants
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

const cardHoverVariant = {
  scale: 1.02,
  y: -2,
  transition: { 
    duration: 0.2,
    ease: "easeOut"
  }
};

// Memoized ProjectCard component
const ProjectCard = memo(({ project }) => (
  <Link 
    href={`/project/residencialprojects/${project.slug}`} 
    className="block group"
    aria-label={`View ${project.title} project details`}
  >
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "50px" }}
      variants={fadeInUpVariant}
      whileHover={cardHoverVariant}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-amber-100 hover:border-amber-300 cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={project.image}
          alt={`${project.title} - Residential project showcase`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          key="background"
          priority={false}
          quality={85}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAhEQACAQIEBwAAAAAAAAAAAAABAgADBAUREiEiMWFxkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyBKhPPNbhgGkm0oBgBmDUPTUZN4ZBABUkiJWEE3qU9JMUaaSKKHVUAINtCQxe/wNamH0qVK8K5VbK9BSVMi6rPQFuoJAaOeQFuKxN/Fc//2Q=="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between">
        <div className="flex-grow">
          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 line-clamp-2 text-gray-900 group-hover:text-amber-700 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>
        
        <div className="mt-auto">
          <span className="inline-flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-xs sm:text-sm md:text-base font-semibold shadow-sm hover:shadow-md active:scale-95 group-hover:shadow-lg">
            View Project
            <svg 
              className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </motion.article>
  </Link>
));

ProjectCard.displayName = 'ProjectCard';

// Enhanced Hero Section with better background
const HeroSection = memo(() => (
  <section className="relative w-full overflow-hidden">
    {/* Background with enhanced overlay */}
    <div className="absolute inset-0">
      <Image
        src="/images/projects/residencialBackgroundWallpaper.jpg"
        alt="Modern residential architecture showcase"
        fill
        priority
        quality={90}
        className="object-cover scale-105"
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAhEQACAQIEBwAAAAAAAAAAAAABAgADBAUREiEiMWFxkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyBKhPPNbhgGkm0oBgBmDUPTUZN4ZBABUkiJWEE3qU9JMUaaSKKHVUAINtCQxe/wNamH0qVK8K5VbK9BSVMi6rPQFuoJAaOeQFuKxN/Fc//2Q=="
      />
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-amber-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Animated particles overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-1000" />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-amber-300 rounded-full animate-pulse animation-delay-2000" />
      </div>
    </div>
    
    {/* Content */}
    <div className="relative min-h-[250px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center px-4">
      <div className="text-center max-w-5xl mx-auto">
        <motion.h1
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          variants={titleVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-wide mb-4"
        >
          Residential Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-amber-100 font-light max-w-3xl mx-auto leading-relaxed"
        >
          Discover our portfolio of exceptional residential developments
        </motion.p>
      </div>
    </div>
  </section>
));

HeroSection.displayName = 'HeroSection';

// Debounce hook for search optimization
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

// Memoized search suggestions component
const SearchSuggestions = memo(({ suggestions, searchTerm, onSuggestionClick }) => (
  <motion.div
    initial={{ opacity: 0, y: -10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.95 }}
    transition={{ duration: 0.2 }}
    className="absolute z-20 w-full mt-2 bg-white rounded-xl shadow-xl border border-amber-200 overflow-hidden backdrop-blur-sm"
  >
    <div className="p-6">
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-gray-800 font-semibold">No results found for "{searchTerm}"</p>
      </div>

      <p className="text-gray-600 text-sm mb-4">Try searching for:</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSuggestionClick(suggestion)}
            className="px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 rounded-full text-sm font-medium hover:from-amber-200 hover:to-amber-100 transition-all duration-200 border border-amber-200 hover:border-amber-300"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>

      <p className="text-gray-500 text-xs">
        Search by city name, project name, or development type
      </p>
    </div>
  </motion.div>
));

SearchSuggestions.displayName = 'SearchSuggestions';

// Main component
const ResidencialProject = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [noResults, setNoResults] = useState(false);

  // Memoized filtered projects
  const filteredProjects = useMemo(() => {
    if (!debouncedSearchTerm) return projects;
    
    return projects.filter((project) =>
      project.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm]);

  // Memoized suggestions
  const suggestions = useMemo(() => {
    const keywords = projects.reduce((acc, project) => {
      const words = project.title.split(' ').concat(project.description.split(' '));
      words.forEach(word => {
        const cleanWord = word.replace(/[^\w]/g, '');
        if (cleanWord.length > 3 && !acc.includes(cleanWord)) {
          acc.push(cleanWord);
        }
      });
      return acc;
    }, []);

    return keywords.slice(0, 6);
  }, []);

  // Effect to handle no results
  useEffect(() => {
    setNoResults(debouncedSearchTerm && filteredProjects.length === 0);
  }, [debouncedSearchTerm, filteredProjects.length]);

  // Optimized suggestion click handler
  const handleSuggestionClick = useCallback((suggestion) => {
    setSearchTerm(suggestion);
    setNoResults(false);
  }, []);

  // Clear search handler
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setNoResults(false);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <HeroSection />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Enhanced Search Section */}
        <section className="flex justify-center mt-16 mb-12" role="search">
          <div className="relative w-full max-w-2xl">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500"
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
              <input
                type="text"
                placeholder="Search projects by name, city, or type..."
                className="w-full p-4 pl-12 pr-12 text-lg border-2 border-amber-200 rounded-2xl shadow-lg focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search residential projects"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors duration-200 p-1"
                  aria-label="Clear search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {noResults && (
                <SearchSuggestions 
                  suggestions={suggestions}
                  searchTerm={debouncedSearchTerm}
                  onSuggestionClick={handleSuggestionClick}
                />
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Results Counter */}
        {debouncedSearchTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <p className="text-gray-600 text-lg">
              {filteredProjects.length > 0 
                ? `Found ${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''}`
                : 'No projects found'
              }
            </p>
          </motion.div>
        )}

        {/* Projects Grid */}
        <section className="py-8">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            variants={titleVariants}
            className="mb-8"
          >
            {/* Additional content can go here */}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              ) : (
                debouncedSearchTerm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full text-center py-16"
                  >
                    <div className="max-w-md mx-auto">
                      <svg className="mx-auto h-24 w-24 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No projects found</h3>
                      <p className="text-gray-500">Try adjusting your search terms or browse all projects</p>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ResidencialProject;