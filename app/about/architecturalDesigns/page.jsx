'use client';
import React from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';


export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/projects/COACT/coact-11.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center text-white relative z-10">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mt-40 md:mt-96"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Architectural Designs Specialists
          </motion.h2>
        </div>
      </motion.section>

      {/* Reimagine Section */}
      <motion.section
        className="bg-white py-12 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4">Reimagine. Redefine. Revitalize.</h3>
            <p className="text-center">Invite us in, examine, and let us transform your space.</p>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-700 text-center">We're Supreme's Interior Construction Specialists, focused on commercial transformation and tenant improvements.</p>
          </motion.div>
          <motion.div className="bg-amber-600 text-white p-6 rounded-xl text-center">
            <h4 className="text-xl font-bold">Ready to talk about your project?</h4>
            <p className="mt-2">Contact Our Team</p>
            <p className="mt-1">Phone: +91 - 8591269664</p>
            <p className="mt-1">Email: contact@supremeinfrastructure.in</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Image Section */}
      <motion.section
        className="py-12 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.img
            src="/images/projects/TATAPOWERSOLARPROCUREMENTOFFICEBANGOLARE/tataBanglore-5.jpg"
            alt="Project 1"
            className="w-full h-auto object-cover rounded-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
          <motion.img
            src="/images/projects/TPSSLBANGOLARE/tpsslBanglore-17.jpg"
            alt="Project 2"
            className="w-full h-auto object-cover rounded-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>
      </motion.section>

      {/* Crew Section */}
      <motion.section
        className="bg-gray-100 py-12 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-center">The crew you want in your corner.</h3>
            <p className="mt-4 text-center">From preconstruction to construction, we're by your side...</p>
            <div className="mt-4 flex justify-center">
              <motion.a
                href="/contact"
                className="bg-amber-600 text-white px-4 py-2 rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            className="col-span-2 flex items-center justify-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {['Tenant Improvements', 'Adaptive Reuse', 'Build Outs'].map((item, i) => (
                <motion.button
                  key={i}
                  className="bg-white p-4 border text-center rounded-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Good Better Section */}
      <motion.section
        className="bg-white py-12 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-center">Commercial | Residential | Restaurant Interiors</h3>
            <p className="mt-2 text-center">From vibrant cafés to high-end workspaces, we design interiors that elevate ambience, strengthen brand identity, and leave a lasting impression.</p>
          </motion.div>
          <motion.div className="p-6 border rounded-md text-center">
            <h4 className="text-xl font-bold">Design Beyond the Ordinary.</h4>
            <p className="mt-2">We don’t just decorate — we transform. Our team brings your ideas to life with bold creativity, refined materials, and a touch of innovation that turns every corner into an experience.</p>
            <Link href="/project/commercialprojects" className="inline-block bg-amber-600 text-white px-6 py-2 mt-4 rounded-xl">View Projects</Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Join Us Section */}
      <motion.section
        className="bg-gray-700 text-white py-12 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center">
          <motion.h3
            className="text-2xl sm:text-3xl font-bold"
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Ready to make a move?
          </motion.h3>
          <motion.a
            href="/contact/career"
            className="mt-6 inline-block bg-amber-600 text-white px-6 py-3 rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Open Positions
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}