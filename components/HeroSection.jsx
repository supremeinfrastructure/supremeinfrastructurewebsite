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

// Updated card animation - fade in from center
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
};

const HeroSection = () => {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [fallbackImageVisible, setFallbackImageVisible] = useState(true);
  const [currentCard, setCurrentCard] = useState(1); // Track which card is showing
  const [showCard, setShowCard] = useState(false);

  // Memoized static content
  const title = useMemo(() => "Supreme Infrastructure Company", []);
  const description = useMemo(() =>
    "We are a team of Talented, Innovative Designers, Engineers, and Horticulturists.",
    []
  );

  // First card content
  const card1Title = useMemo(() => "Costal Road Mumbai ( South )", []);
  const card1Description = useMemo(() =>
    "ONGOING PROJECT",
    []
  );

  // Second card content
  const card2Title = useMemo(() => "Costal Road Mumbai ( South )", []);
  const card2Description = useMemo(() =>
    "Inaugurated By Hon'ble Chief Minister Devendra Fadnavis, Deputy Chief Minister Eknath Shinde, Minister of Tourism Mangal Prabhat Lodha and other esteemed Government Officials.",
    []
  );

  // Function to immediately switch to the second card
  const handleCloseCard = useCallback(() => {
    if (currentCard === 1) {
      // Switch to second card immediately
      setCurrentCard(2);
    } else {
      // Close second card with no follow-up
      setShowCard(false);
    }
  }, [currentCard]);

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

    // Show the sliding card after a delay
    setTimeout(() => setShowCard(true), 800);
  }, []);

  // Handle video play error
  const handleVideoError = useCallback((error) => {
    console.error("Video error:", error);
    // Keep fallback image visible in case of error
    setFallbackImageVisible(true);

    // Still show the card even if video fails
    setTimeout(() => setShowCard(true), 800);
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

  // Get current card content based on state
  const currentCardTitle = currentCard === 1 ? card1Title : card2Title;
  const currentCardDescription = currentCard === 1 ? card1Description : card2Description;
  const currentCardImage = currentCard === 1
    ? "/images/projects/COSTALROAD/costal-road.jpg"
    : "/images/projects/COSTALROAD/costal-road3.jpg";

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

        {/* Card centered on screen for both mobile and desktop */}
        {/* <AnimatePresence mode="wait">
          {showCard && (
            <motion.div
              key={`card-${currentCard}`}
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
         
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={handleCloseCard}></div>
              

              <motion.div
                className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl z-30"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden mx-auto border">
                 
                  <button
                    onClick={handleCloseCard}
                    className="absolute top-2 right-2 z-10 bg-black/30 hover:bg-black/50 rounded-full p-1 transition-colors duration-200"
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                    <Image
                      src={currentCardImage}
                      alt="Project Image"
                      width={600}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-4">
                      <h3 className="text-white font-semibold text-lg md:text-xl">{currentCardTitle}</h3>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <p className="text-gray-800 text-sm md:text-base mb-4">{currentCardDescription}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(HeroSection);