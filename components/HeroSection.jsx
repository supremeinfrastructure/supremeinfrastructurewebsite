'use client'
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavbarDemo } from './Navbar';
import Link from 'next/link';
import Image from 'next/image';

// Memoized TypewriterEffect component
const TypewriterEffect = React.memo(({ text }) => {
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
});

TypewriterEffect.displayName = 'TypewriterEffect';

// Animation variants moved outside component to prevent recreation
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

const HeroSection = () => {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [fallbackImageVisible, setFallbackImageVisible] = useState(true);

  // Memoized static content
  const title = useMemo(() => "Supreme Infrastructure Company", []);
  const description = useMemo(() =>
    "We are a team of Talented, Innovative Designers, Engineers, and Horticulturists.",
    []
  );

  // Memoized title characters
  const titleChars = useMemo(() => title.split(''), [title]);

  // Video source with a lower resolution option for mobile
  const videoSources = useMemo(() => [
    { src: "/videos/unwatermark_video-4.mp4", type: "video/mp4" }
  ], []);

  // Handle video loaded event
  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
    setTimeout(() => setFallbackImageVisible(false), 300); // Fade out fallback image after video loads
  }, []);

  // Handle video play error
  const handleVideoError = useCallback((error) => {
    console.error("Video error:", error);
    // Keep fallback image visible in case of error
    setFallbackImageVisible(true);
  }, []);

  // Optimized video play handler with error handling
  const playVideo = useCallback(() => {
    if (videoRef.current && !isVideoPlaying) {
      videoRef.current.play()
        .then(() => {
          setIsVideoPlaying(true);
        })
        .catch(error => {
          console.error("Video play failed:", error);
          // Try playing without sound as a fallback (autoplay policy workaround)
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play()
              .then(() => {
                setIsVideoPlaying(true);
              })
              .catch(handleVideoError);
          }
        });
    }
  }, [isVideoPlaying, handleVideoError]);

  // Initialize video playback
  useEffect(() => {
    // Add event listeners for different user interactions
    const handleUserInteraction = () => {
      playVideo();
    };

    // Preload the video
    if (videoRef.current) {
      videoRef.current.load();
    }

    // Try to play as soon as possible
    playVideo();

    // Add event listeners for user interaction
    window.addEventListener('touchstart', handleUserInteraction, { once: true });
    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('scroll', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };
  }, [playVideo]);

  // Memoized button hover animation
  const buttonHoverAnimation = useMemo(() => ({
    scale: 1.05,
    boxShadow: "0px 0px 15px rgba(255,255,255,0.5)"
  }), []);

  return (
    <AnimatePresence>
      <motion.div
        className="relative w-full h-screen overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Fallback image that shows until video loads */}
        {fallbackImageVisible && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gray-900"
            initial={{ opacity: 1 }}
            animate={{ opacity: isVideoLoaded ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image 
                src="/images/home/logo.png" 
                alt="Loading"
                width={200} 
                height={200}
                className="animate-pulse" 
                priority
              />
            </div>
          </motion.div>
        )}

        {/* Video background */}
        <motion.video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0, scale: isVideoLoaded ? 1 : 1.1 }}
          transition={{ duration: 1 }}
          style={{
            filter: 'brightness(0.7) contrast(1.1)',
            WebkitFilter: 'brightness(0.7) contrast(1.1)'
          }}
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
          preload="auto"
        >
          {videoSources.map((source, index) => (
            <source key={index} src={source.src} type={source.type} />
          ))}
          Your browser does not support the video tag.
        </motion.video>

        <NavbarDemo />

        <motion.div
          className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-4 lg:left-10 z-10 md:mx-24"
          initial={{ opacity: 0, y: -50, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
        >
          <Image
            src="/images/home/logo.png"
            alt="Logo"
            width={128}
            height={128}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
            priority
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8"
          variants={containerVariants}
        >
          <div className="bg-opacity-90 p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-6xl text-center">
            <motion.h2
              className="font-montserrat text-transparent bg-clip-text text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-shadow-lg"
              variants={titleVariants}
            >
              {titleChars.map((char, index) => (
                <TypewriterEffect key={index} text={char} />
              ))}
            </motion.h2>

            <motion.div
              className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8 text-shadow"
              variants={descriptionVariants}
            >
              {description}
            </motion.div>

            <motion.div variants={buttonVariants}>
              <Link href='/about/supremeInfrastructure'>
                <motion.button
                  className="px-4 sm:px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-600 text-white font-normal rounded-full hover:bg-orange-600 transition-colors duration-300 text-xs sm:text-sm md:text-base lg:text-lg shadow-lg"
                  whileHover={buttonHoverAnimation}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(HeroSection);