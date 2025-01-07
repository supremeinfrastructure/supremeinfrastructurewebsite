'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHardHat, FaShoppingCart, FaPencilRuler, FaUserShield, FaCalculator, FaPercent } from 'react-icons/fa';

const CareerPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume: null,
        position: '',
        contactNumber: '',
    });

    const handleChange = (e) => {
        if (e.target.name === 'resume') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission logic here
    };

    const jobs = [
        { title: 'Site Engineer', department: 'Engineering', icon: FaHardHat },
        { title: 'Purchase Engineer', department: 'Product', icon: FaShoppingCart },
        { title: 'Interior Designer', department: 'Design', icon: FaPencilRuler },
        { title: 'Admin', department: 'Administration', icon: FaUserShield },
        { title: 'Accountant', department: 'Finance', icon: FaCalculator },
        { title: 'Billing Engineer', department: 'Engineer', icon: FaPercent },
        { title: 'QA/QC Engineer', department: 'Engineer', icon: FaCalculator },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="h-[60vh] relative overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    style={{
                        filter: 'brightness(0.6)',
                        objectPosition: 'center'
                    }}
                >
                    <source src="/videos/career-2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* <div className="absolute inset-0 bg-gradient-to-b from-white-50 via-transparent to-transparent opacity-100"></div> */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center leading-tight px-4"
                    >
                        {/* Come to <span className="text-white">Belong.</span> */}
                    </motion.h1>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12 md:py-20 -mt-20 relative z-10">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-xl md:text-2xl text-center mb-12 md:mb-16 mt-8 text-gray-700 max-w-3xl mx-auto"
                >
                    With agility, capacity, range, and ambition, Supreme's lineup plays on some big stages—on and off the clock.
                </motion.p>

                <section className="mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-gray-800">Open Positions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {jobs.map((job, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg p-6 md:p-8 hover:bg-blue-50 transition duration-300 text-center border-2 border-amber-500"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div className="text-4xl mb-4 flex justify-center">
                                    <job.icon className="text-orange-600" />
                                </motion.div>
                                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800">{job.title}</h3>
                                <p className="text-lg text-gray-500 font-semibold">{job.department}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="flex flex-col lg:flex-row gap-12">
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            className="h-64 md:h-80 lg:h-96 w-full bg-cover bg-center rounded-lg overflow-hidden lg:mt-52"
                            style={{ backgroundImage: "url('/images/contact/careerBackground-2.jpg')" }}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="h-full bg-black bg-opacity-50 flex items-center justify-center p-8">
                                <motion.h2
                                    className="text-3xl md:text-4xl font-bold text-white text-center"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    Be Part of Our Story
                                </motion.h2>
                            </div>
                        </motion.div>
                    </div>
                    <div className="min-h-screenflex items-center justify-center p-6">
                        <div className="w-full max-w-2xl overflow-hidden">
                            <div className="bg-gradient-to-r from-amber-600 to-amber-600 p-6">
                                <h2 className="text-4xl  text-center text-white tracking-wide">Career Application</h2>
                            </div>

                            <form className="p-8 space-y-6">
                                {/* Personal Information Section */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block mb-2 text-lg font-semibold text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 transition duration-300"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block mb-2 text-lg font-semibold text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 transition duration-300"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-lg font-semibold text-gray-700">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 transition duration-300"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-lg font-semibold text-gray-700">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            pattern="^\+?[1-9]\d{1,14}$"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 transition duration-300"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Career Information */}
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="position" className="block mb-2 text-lg font-semibold text-gray-700">Position Applied For</label>
                                        <select
                                            id="position"
                                            name="position"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 transition duration-300"
                                            required
                                        >
                                            <option value="">Select a position</option>
                                            <option value="site-engineer">Site Engineer</option>
                                            <option value="purchase-engineer">Purchase Engineer</option>
                                            <option value="interior-designer">Interior Designer</option>
                                            <option value="accountant">Accountant</option>
                                            <option value="billing-engineer">Billing Engineer</option>
                                            <option value="qa-qc-engineer">QA/QC Engineer</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="experience" className="block mb-2 text-lg font-semibold text-gray-700">Years of Experience</label>
                                        <select
                                            id="experience"
                                            name="experience"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 transition duration-300"
                                            required
                                        >
                                            <option value="">Select years of experience</option>
                                            <option value="0-2">0-2 years</option>
                                            <option value="2-5">2-5 years</option>
                                            <option value="5-10">5-10 years</option>
                                            <option value="10+">10+ years</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Resume Upload */}
                                <div>
                                    <label htmlFor="resume" className="block mb-2 text-lg font-semibold text-gray-700">Upload Resume/CV</label>
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <input
                                            type="file"
                                            id="resume"
                                            name="resume"
                                            accept=".pdf,.doc,.docx"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="text-gray-600">
                                            <p className="mb-2">Drag and drop your resume here</p>
                                            <p className="text-sm">or</p>
                                            <p className="text-amber-600 font-semibold">Browse Files</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div>
                                    <label htmlFor="additionalInfo" className="block mb-2 text-lg font-semibold text-gray-700">Additional Information</label>
                                    <textarea
                                        id="additionalInfo"
                                        name="additionalInfo"
                                        rows="4"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 transition duration-300"
                                        placeholder="Tell us why you're a great fit for this role..."
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-amber-700 to-amber-700 text-white text-lg py-4 rounded-lg hover:shadow-lg transition duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Submit Application
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CareerPage;