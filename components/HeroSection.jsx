"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const HeroCarousel = () => {
  // Sample images - replace with your actual image URLs
  const images = [
    {
      url: '/images/projects/CARNACBUNDER5B/carnac-5.jpeg',
      // title: 'Office Renovation',
      subtitle: 'Mumbai'
    },
    {
      url: '/images/projects/horticultureprojects/COASTALROAD/costal-herosection.JPG',
      // title: 'Green Designs for Urban Life',
      subtitle: 'Coastal Road'
    },
    {
      url: '/images/projects/TATATAMILNADU/tataTamilnadu-22.jpg',
      // title: 'Tamilnadu',
      subtitle: 'Tamilnadu'
    },
    {
      url: '/images/projects/TATAPOWERSOLARCIVILOFFICEANDBRICKOUTAREABANGOLARE/tataBanglore-19.jpg',
      // title: 'Bengaluru',
      subtitle: 'Bengaluru'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, images.length]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated Logo */}
      <div
        className={`absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-4 lg:left-10 z-20 md:mx-24 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 -translate-y-10 rotate-12'
          }`}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <Image
            src="/images/home/logo.png"
            alt="Logo"
            width={128}
            height={128}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 relative z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
            priority
            loading="eager"
          />
        </div>
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Image Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentIndex
              ? 'opacity-100 translate-x-0 scale-100'
              : index < currentIndex
                ? 'opacity-0 -translate-x-full scale-105'
                : 'opacity-0 translate-x-full scale-105'
              }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className={`w-full h-full object-cover md:object-fill transition-all duration-2000 ${index === currentIndex ? 'scale-100' : 'scale-110'
                }`}
            />

            {/* Enhanced Gradient Overlay with Animation */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`} />

            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />

            {/* Content Overlay with Enhanced Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl">
                <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-4 transition-all duration-1000 ${index === currentIndex
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-95'
                  } bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl`}>
                  {image.title}
                </h1>
                <p className={`text-lg md:text-xl lg:text-2xl font-light transition-all duration-1000 delay-300 ${index === currentIndex
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                  } drop-shadow-lg`}>
                  {image.subtitle}
                </p>

                {/* Animated Decorative Elements */}
                <div className={`mt-8 transition-all duration-1000 delay-500 ${index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                  <div className="flex justify-center space-x-2">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Navigation Arrows */}
      <button
        onClick={goToPrevious}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 group border border-white/20 hover:border-white/40"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <svg className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-blue-200 transition-colors duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 group border border-white/20 hover:border-white/40"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <svg className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-purple-200 transition-colors duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`relative transition-all duration-300 ${index === currentIndex
              ? 'w-8 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full scale-125'
              : 'w-3 h-3 bg-white/50 hover:bg-white/75 rounded-full hover:scale-110'
              }`}
          >
            {index === currentIndex && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse opacity-60"></div>
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black/20 to-black/40">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-4000 ease-linear relative overflow-hidden"
          style={{
            width: isAutoPlaying ? '100%' : '0%',
            animation: isAutoPlaying ? 'progress 4s linear infinite' : 'none'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* Custom Animation Keyframes */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes slideInFromRight {
          from { 
            opacity: 0; 
            transform: translateX(100%) scale(1.1);
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes slideOutToLeft {
          from { 
            opacity: 1; 
            transform: translateX(0) scale(1);
          }
          to { 
            opacity: 0; 
            transform: translateX(-100%) scale(1.1);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;