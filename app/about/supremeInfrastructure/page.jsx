'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBuilding, FaDrawPolygon, FaTree, FaHardHat, FaPaintBrush, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';



const AboutUsPage = () => {
    const services = [
        { icon: <FaBuilding />, title: 'Interior Design', description: 'Efficient space utilization with cutting edge design concepts' },
        { icon: <FaDrawPolygon />, title: 'Horticulture Design', description: 'Urban forest themes including projects like Urban jungle' },
        { icon: <FaTree />, title: 'Garden Maintenance', description: 'Expert development and maintenance of gardens,parks and ornamental spaces' },
        { icon: <FaPaintBrush />, title: 'Architectural Design', description: 'Market-driven friendly designs aligned with the latest trends' },
        { icon: <FaHardHat />, title: 'Civil Construction', description: 'State-of-the-art technology for economical and safe building construction' },
        { icon: <FaPaintBrush />, title: 'Integrated Facilities Management', description: 'Advanced underground cabling solutions for efficient infrastructure' },
    ];

    const stats = [
        { value: '100 +', label: 'Projects Completed' },
        { value: '10 +', label: 'Years of Experience' },
        { value: '100 +', label: 'Happy Clients' },
    ];



    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[80vh] md:h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/about/about.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                        Building Tomorrow's <span className="text-amber-500">World Today</span>
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-6 md:px-16 py-16">
                {/* About Us */}
                <section className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">About Supreme Infrastructure Company</h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto mt-4">
                        Supreme Infrastructure Company is a leading Civil Engineering and construction firm with over 10 years of experience.
                        We specialize in delivering high-quality infrastructure projects, innovative architectural designs, and
                        sustainable urban green spaces. Our commitment to excellence and cutting-edge technology sets us apart in the industry.
                    </p>
                </section>

                {/* Directors Section */}
                <section className="mb-20">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12">Our Leadership</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* Lakshminarayanan Pillai Card */}
                        <motion.div
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex flex-col md:flex-row">
                                <Image
                                    className="h-64 w-full md:w-48 object-cover"
                                    src="/images/directors/laksh.jpg"
                                    alt="LakshminarayananPillai"
                                    width={192}
                                    height={192}
                                />
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-amber-700">Director</h3>
                                    <p className="text-xl font-medium text-gray-800">Lakshminarayanan Pillai</p>
                                    <p className="text-gray-600 mt-2">More than 20 years of Industrial experience of handling all kinds of projects in the field of Construction, Architectural, Landscape Designing, and Turnkey projects.</p>
                                    <Link href="https://www.instagram.com/lnpillai1983/" className="inline-flex items-center text-amber-600 hover:text-blue-700 mt-4">
                                        <FaInstagram className="mr-2" />
                                        Instagram Profile
                                    </Link>
                                </div>
                            </div>
                        </motion.div>


                        {/* Ruchita Patil Card */}
                        <motion.div
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex flex-col md:flex-row">
                                <Image
                                    className="h-64 w-full md:w-48 object-cover"
                                    src="/images/directors/ruchi.jpg"
                                    alt="RuchitaPatil"
                                    width={192}
                                    height={192}
                                />
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-amber-700">Design and Civil Head, (Managing Partner of Abstract Design)</h3>
                                    <p className="text-xl font-medium text-gray-800">Ruchita H. Patil</p>
                                    <p className="text-gray-600 mt-2">10 years of experience in the field of Construction and Interior design. Have worked in various sites for TATA groups.</p>
                                    <Link href="https://www.instagram.com/ruchita_patil93/" className="inline-flex items-center text-amber-600 hover:text-blue-700 mt-4">
                                        <FaInstagram className="mr-2" />
                                        Instagram Profile
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="mb-20">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-5xl mb-4 text-amber-600 md:ml-44 ml-32">{service.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Stats Section */}
                <section className="mb-20 bg-gradient-to-r from-amber-600 to-amber-600 text-white py-16 rounded-lg text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-12">Our Achievements</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                                <p className="text-lg md:text-xl">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Mission and Vision */}
                <section className="mb-20 grid md:grid-cols-2 gap-12">
                    <motion.div className="bg-white shadow-lg p-8 rounded-lg hover:shadow-xl transition duration-300">
                        <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                        <p className="text-gray-600 mt-2">
                            To deliver innovative and sustainable infrastructure solutions that enhance the quality of life for communities while maintaining
                            the highest standards of safety, quality, and environmental responsibility.
                        </p>
                    </motion.div>
                    <motion.div className="bg-white shadow-lg p-8 rounded-lg hover:shadow-xl transition duration-300">
                        <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                        <p className="text-gray-600 mt-2">
                            To be the global leader in infrastructure development, recognized for our innovative designs, sustainable practices, and commitment
                            to shaping a better future.
                        </p>
                    </motion.div>
                </section>


                {/* CTA Section */}
                <section className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Ready to Build Your Dream Project?</h2>
                    <Link href='/contact'>
                        <motion.button
                            className="bg-amber-600 text-white px-8 py-3 rounded-full text-lg hover:bg-amber-700 transition duration-300"
                            whileHover={{ scale: 1.05 }}
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
