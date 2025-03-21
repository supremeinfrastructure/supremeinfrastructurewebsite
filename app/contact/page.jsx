"use client";
import React, { useState } from "react";
import { FaFacebookF,FaTwitter,FaInstagram,FaLinkedinIn,FaMapMarkerAlt,FaPhone,FaEnvelope,FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: "",
      email: "",
      contactNumber: "",
      message: "",
    };

    // Name validation
    if (formData.fullName.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters long";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone number validation (accepts international format)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid phone number";
      isValid = false;
    }

    // Message validation
    if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitStatus({ loading: true, success: false, error: "" });

      try {
        const response = await fetch("/api/emails/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        setSubmitStatus({ loading: false, success: true, error: "" });
        setFormData({
          fullName: "",
          email: "",
          contactNumber: "",
          message: "",
        });

        // Show success message for 3 seconds
        setTimeout(() => {
          setSubmitStatus((prev) => ({ ...prev, success: false }));
        }, 3000);
      } catch (error) {
        setSubmitStatus({
          loading: false,
          success: false,
          error: "Failed to send message. Please try again later.",
        });
      }
    }
  };
  
  const statusMessage = () => {
    if (submitStatus.loading) {
      return <p className="text-amber-700 flex items-center gap-2"><span className="animate-spin">⟳</span> Sending message...</p>;
    }
    if (submitStatus.success) {
      return <p className="text-green-600 flex items-center gap-2">✓ Message sent successfully!</p>;
    }
    if (submitStatus.error) {
      return <p className="text-red-500 flex items-center gap-2">✗ {submitStatus.error}</p>;
    }
    return null;
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-cover bg-center h-[50vh] sm:h-[60vh] md:h-[70vh]"
        style={{
          backgroundImage: "url('/images/contact/contact-us-banner.jpeg')",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative container mx-auto h-full flex items-center justify-center px-4"
        >
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-wider mb-4">
              Let's <span className="text-amber-500">Connect</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              {/* We're here to listen and provide solutions for your infrastructure needs */}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We value your inquiries and are committed to providing excellent service.
            Reach out to us through any of the channels below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg transform hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-6 text-amber-800">
              <span className="border-b-4 border-amber-500 pb-2">Contact Info</span>
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4 group">
                <div className="bg-amber-100 p-3 rounded-full text-amber-700 group-hover:bg-amber-700 group-hover:text-white transition-all duration-300">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-amber-800 text-lg mb-1">Address</p>
                  <p className="text-gray-600 leading-relaxed">
                    Mayuresh Planet, 603, Supreme Infrastructure Company, plot no -42,43, <br />
                    Opposite Navi Mumbai Civil & Criminal Court<br />
                    At C B D Belapur, Sector 15, CBD Belapur, <br />
                    Navi Mumbai, Maharashtra 400614.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="bg-amber-100 p-3 rounded-full text-amber-700 group-hover:bg-amber-700 group-hover:text-white transition-all duration-300">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-amber-800 text-lg mb-1">Phone</p>
                  <p className="text-gray-600">
                    +91 8591269664 / 022-40110378
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="bg-amber-100 p-3 rounded-full text-amber-700 group-hover:bg-amber-700 group-hover:text-white transition-all duration-300">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-amber-800 text-lg mb-1">Email</p>
                  <p className="text-gray-600">
                    contact@supremeinfrastructure.in
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-lg font-semibold mb-4 text-amber-800">
                <span className="border-b-2 border-amber-500 pb-1">Follow Us</span>
              </h3>
              <div className="flex justify-between mt-6">
                {[
                  { Icon: FaFacebookF, color: "#4267B2" },
                  { Icon: FaTwitter, color: "#1DA1F2" },
                  { Icon: FaInstagram, color: "#E1306C" },
                  { Icon: FaLinkedinIn, color: "#0077B5" }
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: item.color,
                      color: "white"
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ color: "rgba(180, 83, 9, 0.8)" }}
                  >
                    <item.Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3  p-8 rounded-xl  transform hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-6 text-amber-800">
              <span className="border-b-4 border-amber-500 pb-2">Send Us a Message</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className={`w-full p-4 pl-12 border-2 rounded-lg bg-gray-50 focus:bg-white ${
                      errors.fullName ? "border-red-500" : "border-gray-200 focus:border-amber-500"
                    } outline-none transition duration-300`}
                  />
                  <div className="absolute top-1/2 left-3 -translate-y-1/2 text-amber-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full p-4 pl-12 border-2 rounded-lg bg-gray-50 focus:bg-white ${
                      errors.email ? "border-red-500" : "border-gray-200 focus:border-amber-500"
                    } outline-none transition duration-300`}
                  />
                  <div className="absolute top-1/2 left-3 -translate-y-1/2 text-amber-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className={`w-full p-4 pl-12 border-2 rounded-lg bg-gray-50 focus:bg-white ${
                    errors.contactNumber ? "border-red-500" : "border-gray-200 focus:border-amber-500"
                  } outline-none transition duration-300`}
                />
                <div className="absolute top-1/2 left-3 -translate-y-1/2 text-amber-700">
                  <FaPhone className="h-4 w-4" />
                </div>
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1 ml-2">
                    {errors.contactNumber}
                  </p>
                )}
              </div>
              
              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full p-4 pl-12 border-2 rounded-lg bg-gray-50 focus:bg-white ${
                    errors.message ? "border-red-500" : "border-gray-200 focus:border-amber-500"
                  } outline-none transition duration-300`}
                  rows={4}
                />
                <div className="absolute top-6 left-3 text-amber-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-1.008c-.417.25-.923.5-1.5.5-.875 0-1.75-.5-1.75-1.5 0-.233.083-.466.166-.7A6.707 6.707 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                  </svg>
                </div>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 ml-2">{errors.message}</p>
                )}
              </div>
              
              <div className="text-sm font-medium">
                {statusMessage()}
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-800 text-white py-4 px-8 rounded-lg hover:from-amber-700 hover:to-amber-900 transition duration-300 text-lg font-medium shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                disabled={submitStatus.loading}
              >
                {submitStatus.loading ? (
                  <>
                    <span className="animate-spin">⟳</span> Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="h-4 w-4" /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 md:mt-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
              Visit Our Office
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Located in the heart of CBD Belapur, our office is easily accessible and ready to welcome you.
            </p>
          </div>
          
          <div className="w-full overflow-hidden rounded-xl shadow-xl bg-white p-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d988.1054919148572!2d73.03228064559504!3d19.006737810288765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c146766a3db7%3A0x762c073d563eb77a!2sSupreme%20Infrastructure%20Company!5e1!3m2!1sen!2sin!4v1734178610573!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full rounded-lg"
            ></iframe>
          </div>
        </motion.div>
      </div>
      
      {/* Footer Divider */}
      <div className="relative h-16 mt-16">
        <svg 
          className="absolute bottom-0 left-0 w-full" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320"
        >
          <path 
            fill="#d97706" 
            fillOpacity="0.8" 
            d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,224C840,224,960,192,1080,176C1200,160,1320,160,1380,160L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}