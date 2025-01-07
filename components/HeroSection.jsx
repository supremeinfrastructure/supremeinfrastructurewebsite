'use client'
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { NavbarDemo } from './Navbar';
import Link from 'next/link';

const TypewriterEffect = ({ text }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="font-poppins"
    >
      {text}
    </motion.span>
  );
};

const HeroSection = () => {
  const videoRef = useRef(null);
  const title = "Supreme Infrastructure Company";
  const description = "We are a team of Talented, Innovative Designers, Engineers, and Horticulturists.";

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error("Video play failed:", error);
        });
      }
    };

    playVideo();
    window.addEventListener('touchstart', playVideo);
    return () => window.removeEventListener('touchstart', playVideo);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          filter: 'brightness(0.7) contrast(1.1)',
          WebkitFilter: 'brightness(0.7) contrast(1.1)'
        }}
      >
        <source src="/videos/unwatermark_video-4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>
      <NavbarDemo />

      <motion.div
        className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-4 lg:left-10 z-10 md:mx-24"
        initial={{ opacity: 0, y: -50, rotate: -10 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
      >
        <img src="/images/home/logo.png" alt="Logo" className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={containerVariants}
      >
        <div className="bg-opacity-90 p-6 sm:p-8 md:p-10 lg:p-0 rounded-lg max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-6xl text-center">
          <motion.h2
            className="font-montserrat text-transparent bg-clip-text text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 text-shadow-lg"
            variants={titleVariants}
          >
            {title.split('').map((char, index) => (
              <TypewriterEffect key={index} text={char} />
            ))}
          </motion.h2>
          <motion.div
            className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-8 text-shadow"
            variants={descriptionVariants}
          >
            {description}
          </motion.div>
          <motion.div variants={buttonVariants}>
            <Link href='/about/supremeInfrastructure'>
              <motion.button
                className="px-6 sm:px-6 py-2 bg-gradient-to-r from-amber-700 to-yellow-600 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors duration-300 text-sm sm:text-base md:text-lg lg:text-xl shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;