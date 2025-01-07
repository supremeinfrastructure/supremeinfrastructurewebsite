'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const services = [
    {
        title: 'INTERIOR DESIGN',
        description: 'Using latest technology to make efficient use of spaces. Better designing concepts.',
        image: '/images/services/interior.jpeg',
        icon: '🏠',
    },
    {
        title: 'CIVIL CONSTRUCTION',
        description: 'Using the latest technology and machines we create buildings which are economical yet safe.',
        image: '/images/services/civil.jpg',
        icon: '🏗️',
    },
    {
        title: 'ARCHITECTURAL DESIGN',
        description: 'We work on the latest trends as per the markets for developing an economical and budget-friendly option to our clients.',
        image: '/images/services/architecture.jpg',
        icon: '📐',
    },
    {
        title: 'CABLE TRENCH',
        description: 'A method of laying cables into the ground by digging trenches. It is also known as underground cabling.',
        image: '/images/services/cabletrench.jpg',
        icon: '🕳️',
    },
    {
        title: 'INDUSTRIAL BUILDING',
        description: 'We have been associated with many corporates, who are related in the EV & Solar Businesses.',
        image: '/images/services/industrial-building.jpg',
        icon: '🏭',
    },
    {
        title: 'HORTICULTURE DESIGN',
        description: 'Worked in many prestigious projects like the Urban Jungle By Panvel Municipal Corporation under the GOI Funded Urban Forest theme.',
        image: '/images/services/horticulture-design.jpg',
        icon: '🌿',
    },
    {
        title: 'GARDEN MAINTENANCE',
        description: 'Development and decorative planting of gardens, yards, grounds, parks, and other types of areas.',
        image: '/images/services/garden-maintenance.jpg',
        icon: '🌳',
    },
    {
        title: 'BUILDING DESIGN',
        description: 'We use technology with ideas to create designs that are sustainable in any environment.',
        image: '/images/services/building-design.jpg',
        icon: '🏢',
    },
];

const ServicesGrid = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 100
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 100
            }
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto" ref={ref}>
                <motion.h2 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-gray-800 relative inline-block "
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    Services
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></span>
                    <span className="absolute bottom-[-6px] left-0 w-3/4 h-[2px] bg-blue-400"></span>
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {services.slice(0, 6).map((service, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden transform transition duration-300 hover:shadow-2xl"
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="relative h-56 md:h-64 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="transition-transform duration-300 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <span className="text-6xl">{service.icon}</span>
                                </div>
                            </div>
                            <div className="p-6 md:p-8">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                                <p className="text-sm md:text-base text-gray-600">{service.description}</p>
                            </div>
                            <div className="px-6 pb-6 md:px-8 md:pb-8">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                                    Learn More
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    <div className="md:col-span-2 lg:col-span-3 flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-12">
                        {services.slice(6).map((service, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl max-w-md"
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <div className="relative h-56 md:h-64 overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        className="transition-transform duration-300 hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                        <span className="text-6xl">{service.icon}</span>
                                    </div>
                                </div>
                                <div className="p-6 md:p-8">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                                    <p className="text-sm md:text-base text-gray-600">{service.description}</p>
                                </div>
                                <div className="px-6 pb-6 md:px-8 md:pb-8">
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                                        Learn More
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ServicesGrid;