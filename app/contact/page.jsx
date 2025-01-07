'use client'
import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    message: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: '',
      email: '',
      contactNumber: '',
      message: ''
    };

    // Name validation
    if (formData.fullName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters long';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone number validation (accepts international format)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid phone number';
      isValid = false;
    }

    // Message validation
    if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission here
      console.log('Form submitted:', formData);
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        contactNumber: '',
        message: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 to-gray-200">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-cover bg-center h-[40vh] sm:h-[50vh] md:h-[60vh]"
        style={{
          backgroundImage: "url('/images/contact/contact-us-banner.jpeg')",
          backgroundBlendMode: 'overlay',
          // backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-100"></div> */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative container mx-auto h-full flex items-center justify-center px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-amber-600 tracking-wide text-center drop-shadow-lg">
            Let's <span className='text-amber-600'>Connect</span>
          </h1>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Contact Info Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className=" p-6 md:p-8 rounded-lg"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-amber-700 border-b-4 border-amber-700 pb-2 text-center">
              Contact Info
            </h2>
            <div className="space-y-6 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
                <FaMapMarkerAlt className="text-2xl text-amber-700 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Address:</p>
                  <p className="text-sm md:text-base">SUPREME INFRASTRUCTURE COMPANY<br />
                    Office No 603, Sector 15,
                    opposite Belapur Court Station,<br />
                    Sector-15, Belapur,<br />
                    Navi Mumbai, Maharashtra 400614</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
                <FaPhone className="text-2xl text-amber-700 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Phone:</p>
                  <p className="text-sm md:text-base">+91 86570 04324 / (+1) 212-946-2707</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
                <FaEnvelope className="text-2xl text-amber-700 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Email:</p>
                  <p className="text-sm md:text-base">info@supremeinfrastructure</p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-amber-700">Follow Us</h3>
              <div className="flex justify-center space-x-14">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-amber-700 hover:text-amber-800 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className=" p-6 md:p-8  rounded-lg"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-amber-700 border-b-4 border-amber-700 pb-2 text-center">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 border-2 ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:border-amber-700 outline-none rounded transition duration-300`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-amber-700 outline-none rounded transition duration-300`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number *"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border-2 ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'} focus:border-amber-700 outline-none rounded transition duration-300`}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
                )}
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border-2 ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:border-amber-700 outline-none rounded transition duration-300`}
                  rows={4}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <motion.button
                type="submit"
                className="w-full bg-amber-700 text-white py-3 px-6 rounded hover:bg-amber-800 transition duration-300 text-lg disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 sm:mt-12 md:mt-36"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-16 text-amber-700 text-center border-b-4  border-amber-600 pb-2">
            Location
          </h2>
          <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d988.1054919148572!2d73.03228064559504!3d19.006737810288765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c146766a3db7%3A0x762c073d563eb77a!2sSupreme%20Infrastructure%20Company!5e1!3m2!1sen!2sin!4v1734178610573!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}





