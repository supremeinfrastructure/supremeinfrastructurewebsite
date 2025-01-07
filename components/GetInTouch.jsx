'use client'
import React from 'react';
import { motion } from 'framer-motion';

const GetInTouch = () => {
  return (
    <div className="relative h-4/6 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/home/getinTouch.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-35"></div>
      <div className="relative h-full md:h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center text-white p-6 max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Let's Get In Touch
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            It would be great to hear from you! If you have any questions, please do not hesitate to contact us!
            Meet our experts, share your dreams! Reach us with trust, We will leave you with no regrets!
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.a
              href="tel:+918356834380"
              className="inline-block px-6 py-3 border-2 border-white rounded-md text-base sm:text-lg transition-all duration-300 hover:bg-white hover:text-black"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
              whileTap={{ scale: 0.95 }}
            >
              +91 8356834380
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GetInTouch;