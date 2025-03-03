'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { titleVariants } from '../../../utils/animation';
import { projects } from '../../../data/commercialprojects';
import Link from 'next/link';
import Image from 'next/image';

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

const ProjectCard = ({ project }) => (
  <Link href={`/project/commercialprojects/${project.slug}`} className="block">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInUpVariant}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
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
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSk..."
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
);

const HeroSection = () => (
  <div className="relative w-full">
    <div className="absolute inset-0">
      <Image
        src="/images/projects/commercialBackgroundWallpaper.jpeg"
        alt="Commercial Projects Background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
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
);

const CommercialProject = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique cities/categories from projects
  const getAllSuggestions = () => {
    // Extract cities/locations and other relevant keywords from project titles
    const keywords = projects.reduce((acc, project) => {
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
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Box with Suggestions */}
        <div className="flex justify-center mt-12 mb-6">
          <div className="relative w-full max-w-lg">
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
                placeholder="Search projects by project name or city name . . . . . ."
                className="w-full p-3 pl-10 border border-amber-500/30 rounded-3xl shadow focus:outline-none focus:border-amber-500 transition-colors duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 text-gray-400 hover:text-amber-600 transition-colors duration-200"
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
                      Please search by city name, project name, or type
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="py-8 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-10 py-4 sm:py-6 md:py-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              searchTerm && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-600 text-center col-span-full"
                >
                  No results found
                </motion.p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialProject;