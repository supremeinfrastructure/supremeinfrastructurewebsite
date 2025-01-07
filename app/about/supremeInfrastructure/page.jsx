'use client'
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBuilding, FaDrawPolygon, FaTree, FaHardHat, FaPaintBrush, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

const AboutUsPage = () => {
    const services = [
        { icon: <FaBuilding />, title: 'Civil Construction', description: 'Expert construction services for various infrastructure projects.' },
        { icon: <FaDrawPolygon />, title: 'Architecture Design', description: 'Innovative and sustainable architectural solutions for modern needs.' },
        { icon: <FaTree />, title: 'Horticulture & Gardens', description: 'Creating lush, vibrant green spaces in urban environments.' },
        { icon: <FaHardHat />, title: 'Building Projects', description: 'Comprehensive building services from conception to completion.' },
        { icon: <FaPaintBrush />, title: 'Interior Design', description: 'Crafting beautiful and functional interior spaces.' },
    ];

    const stats = [
        { value: '50+', label: 'Projects Completed' },
        { value: '10+', label: 'Years of Experience' },
        { value: '100+', label: 'Happy Clients' },
    ];

    const directors = [
        {
            name: "Laxminarayanan Pillai",
            position: "Director",
            image: "/images/directors/laksh.jpg",
            bio: "More than 20 years of Industrial experience of handling all kinds of projects in the field of Construction, Architectural, Landscape Designing and Trunkey projects.",
        },
        {
            name: "Ruchita H. Patil",
            position: "Design and Civil Head, (Managing Partner of Abstract Design)",
            image: "/images/directors/ruchi.jpg",
            bio: "10 years of experience, in the field of Construction and Interior design. Have worked in various site for TATA groups.",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <div className="bg-cover bg-center h-[calc(100vh-80px)] md:h-screen relative" style={{ backgroundImage: "url('/images/about/about.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">Building Tomorrow's <span className='text-amber-700'>World Today</span> </h1>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto w-full px-4 py-16">
                {/* About Us Section */}
                <section className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">About Supreme Infrastructure</h2>
                    <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto text-center">
                        Supreme Infrastructure is a leading Civil Engineering and construction company with over 10 years of experience.
                        We specialize in delivering High-quality Infrastructure projects, Innovative Architectural Designs, and
                        Sustainable urban green spaces. Our commitment to excellence and Cutting-Edge technology sets us apart in the Industry.
                    </p>
                </section>

                {/* Directors Section */}
                <section className="mb-20">
                    <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-gray-800">Our Leadership</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {directors.map((director, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg shadow-lg overflow-hidden"
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="md:flex">
                                    <div className="md:flex-shrink-0">
                                        <Image
                                            className="h-64 w-full object-cover md:w-48"
                                            src={director.image}
                                            alt={director.name}
                                            width={192}
                                            height={192}
                                        />
                                    </div>
                                    <div className="p-8">
                                        <div className="uppercase tracking-wide text-sm text-amber-700 font-semibold">{director.position}</div>
                                        <div className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{director.name}</div>
                                        <p className="mt-2 text-gray-500">{director.bio}</p>
                                        <div className="mt-4">
                                            <Link href="#" className="text-amber-700 hover:text-blue-800">
                                                <FaLinkedin className="inline mr-2" />
                                                LinkedIn Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Services Section */}
                <div>
                    <section className="mb-20">
                        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-gray-800">Our Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-gray-200 rounded-lg shadow-lg p-6 text-center"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="text-4xl mb-4 text-amber-700 mx-32 md:mx-44">{service.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                    <p className="text-gray-600">{service.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Stats Section */}
                <section className="mb-20 bg-gradient-to-r from-amber-700 to-amber-600 text-white py-16 rounded-lg">
                    <div className="container mx-auto">
                        <h2 className="text-2xl md:text-3xl mb-12 text-center">Our Achievements</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                                    <div className="text-lg md:text-xl">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mission and Vision */}
                <section className="mb-20">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            className=" rounded-lg  p-8"
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 text-center md:text-start">Our Mission</h3>
                            <p className="text-gray-600 text-center md:text-start">
                                To deliver innovative and sustainable infrastructure solutions that enhance the quality of life
                                for communities while maintaining the highest standards of safety, quality, and environmental responsibility.
                            </p>
                        </motion.div>
                        <motion.div
                            className=" rounded-lg  p-8"
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 text-center md:text-start">Our Vision</h3>
                            <p className="text-gray-600 text-center md:text-start">
                                To be the global leader in infrastructure development, recognized for our innovative designs,
                                sustainable practices, and commitment to shaping a better future for generations to come.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Ready to Build Your Dream Project?</h2>
                    <Link href='/contact'>
                        <motion.button
                            className="bg-gradient-to-r from-amber-700 to-amber-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Us Today
                        </motion.button>
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default AboutUsPage;
