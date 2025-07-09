'use client'
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavbarDemo } from './Navbar';
import Link from 'next/link';
import Image from 'next/image';

// Animation variants defined outside component to prevent recreation
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

// Optimize TypewriterEffect with React.memo to prevent unnecessary re-renders
const TypewriterEffect = React.memo(({ text }) => (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="font-poppins"
  >
    {text}
  </motion.span>
));

TypewriterEffect.displayName = 'TypewriterEffect';

// Content constants moved outside component
const TITLE = "Supreme Infrastructure Company";
const DESCRIPTION = "We are a team of Talented, Innovative Designers, Engineers, and Horticulturists.";
const CARD_CONTENT = [
  {
    title: "Costal Road Mumbai",
    description: "ONGOING PROJECT",
    image: "/images/projects/COSTALROAD/costal-road.jpg"
  },
  {
    title: "Costal Road Mumbai ( South )",
    description: "Inaugurated By Hon'ble Chief Minister Devendra Fadnavis, Deputy Chief Minister Eknath Shinde, Minister of Tourism Mangal Prabhat Lodha and other esteemed Government Officials.",
    image: "/images/projects/COSTALROAD/costal-road3.JPG"
  }
];

// Constant video sources
const VIDEO_SOURCES = [
  { src: "/videos/unwatermark_video-4.mp4", type: "video/mp4" }
];

// Button hover animation constant
const BUTTON_HOVER_ANIMATION = {
  scale: 1.05,
  boxShadow: "0px 0px 15px rgba(255,255,255,0.5)"
};

const HeroSection = () => {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [fallbackImageVisible, setFallbackImageVisible] = useState(true);
  const [currentCard, setCurrentCard] = useState(0); // Use 0-based index for array access
  const [showCard, setShowCard] = useState(false);

  // Memoized title characters
  const titleChars = useMemo(() => TITLE.split(''), []);

  // Handle video loaded event
  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
    setTimeout(() => setFallbackImageVisible(false), 300);
    setTimeout(() => setShowCard(true), 800);
  }, []);

  // Handle video play error
  const handleVideoError = useCallback(() => {
    console.error("Video error occurred");
    setFallbackImageVisible(true);
    setTimeout(() => setShowCard(true), 800);
  }, []);

  // Optimized video play handler with error handling
  const playVideo = useCallback(() => {
    if (!videoRef.current || isVideoPlaying) return;

    videoRef.current.play()
      .then(() => setIsVideoPlaying(true))
      .catch(error => {
        console.error("Video play failed:", error);
        // Try playing without sound as a fallback
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play()
            .then(() => setIsVideoPlaying(true))
            .catch(handleVideoError);
        }
      });
  }, [isVideoPlaying, handleVideoError]);

  // Function to switch cards or close modal
  const handleCloseCard = useCallback(() => {
    if (currentCard === 0) {
      setCurrentCard(1);
    } else {
      setShowCard(false);
    }
  }, [currentCard]);

  // Initialize video playback with optimized event listeners
  useEffect(() => {
    const handleUserInteraction = () => playVideo();

    if (videoRef.current) {
      videoRef.current.load();
      // Attempt initial play
      playVideo();
    }

    // Use passive event listeners for better performance
    window.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true });
    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('scroll', handleUserInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };
  }, [playVideo]);

  // Get current card content based on state
  const currentCardData = CARD_CONTENT[currentCard];

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

        {/* Video background with improved loading attributes */}
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
          }}
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
          preload="auto"
          loading="eager"
        >
          {VIDEO_SOURCES.map((source, index) => (
            <source key={index} src={source.src} type={source.type} />
          ))}
          Your browser does not support the video tag.
        </motion.video>

        <NavbarDemo />

        {/* Logo with optimized image loading */}
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
            loading="eager"
          />
        </motion.div>

        {/* Main content */}
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
              {DESCRIPTION}
            </motion.div>

            <motion.div variants={buttonVariants}>
              <Link href='/about/supremeInfrastructure'>
                <motion.button
                  className="px-4 sm:px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-600 text-white font-normal rounded-full hover:bg-orange-600 transition-colors duration-300 text-xs sm:text-sm md:text-base lg:text-lg shadow-lg"
                  whileHover={BUTTON_HOVER_ANIMATION}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Card modal with optimized rendering */}
        <AnimatePresence mode="wait">
          {showCard && (
            <motion.div
              key={`card-${currentCard}`}
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={handleCloseCard}
              />

              {/* Card content */}
              <motion.div
                className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl z-30"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden mx-auto border">
                  {/* Close button */}
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

                  {/* Image with optimized loading */}
                  <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                    <Image
                      src={currentCardData.image}
                      alt="Project Image"
                      width={600}
                      height={300}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-4">
                      <h3 className="text-white font-semibold text-lg md:text-xl">{currentCardData.title}</h3>
                    </div>
                  </div>

                  {/* View Project Button */}
                  <div className='p-2'>
                    <Link href={`/project/commercialprojects/project-15`} passHref>
                      <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full transition-all duration-300 text-sm md:text-base">
                        View Project
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

// Export memoized component to prevent unnecessary re-renders
export default React.memo(HeroSection);