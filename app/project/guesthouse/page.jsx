'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { titleVariants } from '../../../utils/animation';
import { guestprojects } from '../../../data/guesthousedata';
import Link from 'next/link';
import Image from 'next/image';

const ProjectCard = ({ project }) => {
  return (
    <Link href={`/project/guesthouse/${project.slug}`}>
      <motion.div
        className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-amber-600/20 hover:border-amber-600 cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={project.image}
            layout="fill"
            objectFit="cover"
            alt={project.title}
            className="transform group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
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
          <div
            onClick={(e) => e.preventDefault()}
            className="mt-auto"
          >
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
  );
};

const GuestProject = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const filteredProjects = guestprojects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique cities/categories from projects
  const getAllSuggestions = () => {
    // Extract cities/locations and other relevant keywords from project titles
    const keywords = guestprojects.reduce((acc, project) => {
      // Simple extraction - split by spaces and filter relevant words
      const words = project.title.split(' ');

      // Add key words that might be relevant (words over 3 chars)
      words.forEach(word => {
        if (word.length > 3 && !acc.includes(word)) {
          acc.push(word);
        }
      });

      return acc;
    }, []);

    return keywords.slice(0, 5); // Limit to 5 suggestions
  };

  useEffect(() => {
    if (searchTerm && filteredProjects.length === 0) {
      setNoResults(true);
      setSuggestions(getAllSuggestions());
    } else {
      setNoResults(false);
    }
  }, [searchTerm, filteredProjects.length]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
  };

  return (
    <section className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] flex items-center justify-center">
        <Image
          src="/images/home/guestHouse.jpg"
          alt="Guest House Projects Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
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

      {/* Search Bar Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 mb-6 relative z-20">
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-lg p-2">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
                placeholder="Search guest house projects..."
                className="w-full p-3 pl-10 border border-amber-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-5 text-gray-400 hover:text-amber-600 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* No Results Animation with Suggestions */}
            <AnimatePresence>
              {noResults && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-amber-200 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-700 font-medium">No results found for "{searchTerm}"</p>
                    </div>

                    <p className="text-gray-600 text-sm mb-3">Try searching for:</p>

                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm hover:bg-amber-200 transition-colors duration-200"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>

                    <p className="text-gray-500 text-xs mt-3">
                      Please search by location, property name, or features
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
            className="max-w-2xl mx-auto text-center mb-8 sm:mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Discover Our Featured Projects
            </h2>
          </motion.div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-10">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            searchTerm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-600 text-lg">No guest house projects found matching your search.</p>
                <p className="text-gray-500 mt-2">Try adjusting your search terms or browse all projects.</p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default GuestProject;