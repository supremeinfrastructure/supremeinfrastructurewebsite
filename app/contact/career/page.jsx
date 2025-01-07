"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHardHat,
  FaShoppingCart,
  FaPencilRuler,
  FaUserShield,
  FaCalculator,
  FaPercent,
} from "react-icons/fa";

const CareerPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    additionalInfo: "",
  });

  const [resume, setResume] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: "Please upload your resume",
      });
      return;
    }

    setSubmitStatus({ loading: true, success: false, error: "" });

    try {
      const formDataToSend = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append resume file
      formDataToSend.append("resume", resume);

      const response = await fetch("/api/emails/career", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setSubmitStatus({ loading: false, success: true, error: "" });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        additionalInfo: "",
      });
      setResume(null);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: "Failed to submit application. Please try again later.",
      });
    }
  };

  const jobs = [
    { title: "Site Engineer", department: "Engineering", icon: FaHardHat },
    { title: "Purchase Engineer", department: "Product", icon: FaShoppingCart },
    { title: "Interior Designer", department: "Design", icon: FaPencilRuler },
    { title: "Admin", department: "Administration", icon: FaUserShield },
    { title: "Accountant", department: "Finance", icon: FaCalculator },
    { title: "Billing Engineer", department: "Engineer", icon: FaPercent },
    { title: "QA/QC Engineer", department: "Engineer", icon: FaCalculator },
  ];

  const statusMessage = () => {
    if (submitStatus.loading) {
      return (
        <p className='text-amber-700 text-center mt-4'>
          Submitting application...
        </p>
      );
    }
    if (submitStatus.success) {
      return (
        <p className='text-green-600 text-center mt-4'>
          Application submitted successfully!
        </p>
      );
    }
    if (submitStatus.error) {
      return (
        <p className='text-red-500 text-center mt-4'>{submitStatus.error}</p>
      );
    }
    return null;
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
      <div className='h-[60vh] relative overflow-hidden'>
        <video
          autoPlay
          loop
          muted
          playsInline
          className='absolute top-0 left-0 w-full h-full object-cover'
          style={{
            filter: "brightness(0.6)",
            objectPosition: "center",
          }}
        >
          <source src='/videos/career-2.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <div className='absolute inset-0 flex items-center justify-center'>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center leading-tight px-4'
          >
            Join Our Team
          </motion.h1>
        </div>
      </div>

      <main className='container mx-auto px-4 py-12 md:py-20 -mt-20 relative z-10'>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className='text-xl md:text-2xl text-center mb-12 md:mb-16 mt-8 text-gray-700 max-w-3xl mx-auto'
        >
          With agility, capacity, range, and ambition, Supreme's lineup plays on
          some big stages—on and off the clock.
        </motion.p>

        <section className='mb-16 md:mb-24'>
          <h2 className='text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-gray-800'>
            Open Positions
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                className='bg-white rounded-lg p-6 md:p-8 hover:bg-blue-50 transition duration-300 text-center border-2 border-amber-500'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div className='text-4xl mb-4 flex justify-center'>
                  <job.icon className='text-orange-600' />
                </motion.div>
                <h3 className='text-xl md:text-2xl font-bold mb-3 text-gray-800'>
                  {job.title}
                </h3>
                <p className='text-lg text-gray-500 font-semibold'>
                  {job.department}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className='flex flex-col lg:flex-row gap-12'>
          <div className='w-full lg:w-1/2'>
            <motion.div
              className='h-64 md:h-80 lg:h-96 w-full bg-cover bg-center rounded-lg overflow-hidden lg:mt-52'
              style={{
                backgroundImage:
                  "url('/images/contact/careerBackground-2.jpg')",
              }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className='h-full bg-black bg-opacity-50 flex items-center justify-center p-8'>
                <motion.h2
                  className='text-3xl md:text-4xl font-bold text-white text-center'
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Be Part of Our Story
                </motion.h2>
              </div>
            </motion.div>
          </div>

          <div className='w-full lg:w-1/2'>
            <div className='bg-white rounded-lg shadow-xl overflow-hidden'>
              <div className='bg-gradient-to-r from-amber-600 to-amber-600 p-6'>
                <h2 className='text-4xl text-center text-white tracking-wide'>
                  Career Application
                </h2>
              </div>

              <form onSubmit={handleSubmit} className='p-8 space-y-6'>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='firstName'
                      className='block mb-2 text-lg font-semibold text-gray-700'
                    >
                      First Name
                    </label>
                    <input
                      type='text'
                      id='firstName'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 transition duration-300'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='lastName'
                      className='block mb-2 text-lg font-semibold text-gray-700'
                    >
                      Last Name
                    </label>
                    <input
                      type='text'
                      id='lastName'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 transition duration-300'
                      required
                    />
                  </div>
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-lg font-semibold text-gray-700'
                    >
                      Email Address
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 transition duration-300'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='phone'
                      className='block mb-2 text-lg font-semibold text-gray-700'
                    >
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      pattern='^\+?[1-9]\d{1,14}$'
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 transition duration-300'
                      required
                    />
                  </div>
                </div>

                <div className='space-y-6'>
                  <div>
                    <label
                      htmlFor='position'
                      className='block mb-2 text-lg font-semibold text-gray-700'
                    >
                      Position Applied For
                    </label>
                    <select
                      id='position'
                      name='position'
                      value={formData.position}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 transition duration-300'
                      required
                    >
                      <option value=''>Select a position</option>
                      <option value='site-engineer'>Site Engineer</option>
                      <option value='purchase-engineer'>
                        Purchase Engineer
                      </option>
                      <option value='interior-designer'>
                        Interior Designer
                      </option>
                      <option value='admin'>Admin</option>
                      <option value='accountant'>Accountant</option>
                      <option value='billing-engineer'>Billing Engineer</option>
                      <option value='qa-qc-engineer'>QA/QC Engineer</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='experience'
                      className='block mb-2 text-lg font-semibold text-gray-700'
                    >
                      Years of Experience
                    </label>
                    <select
                      id='experience'
                      name='experience'
                      value={formData.experience}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 transition duration-300'
                      required
                    >
                      <option value=''>Select years of experience</option>
                      <option value='0-2'>0-2 years</option>
                      <option value='2-5'>2-5 years</option>
                      <option value='5-10'>5-10 years</option>
                      <option value='10+'>10+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='resume'
                    className='block mb-2 text-lg font-semibold text-gray-700'
                  >
                    Upload Resume/CV
                  </label>
                  <div className='relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center'>
                    <input
                      type='file'
                      id='resume'
                      name='resume'
                      onChange={handleFileChange}
                      accept='.pdf,.doc,.docx'
                      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                      required
                    />
                    <div className='text-gray-600'>
                      <p className='mb-2'>
                        {resume
                          ? resume.name
                          : "Drag and drop your resume here"}
                      </p>
                      <p className='text-sm'>or</p>
                      <p className='text-amber-600 font-semibold'>
                        Browse Files
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='additionalInfo'
                    className='block mb-2 text-lg font-semibold text-gray-700'
                  >
                    Additional Information
                  </label>
                  <textarea
                    id='additionalInfo'
                    name='additionalInfo'
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 transition duration-300'
                    placeholder="Tell us why you're a great fit for this role..."
                  ></textarea>
                </div>

                {statusMessage()}

                <motion.button
                  type='submit'
                  className='w-full bg-gradient-to-r from-amber-700 to-amber-700 text-white text-lg py-4 rounded-lg hover:shadow-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={submitStatus.loading}
                >
                  {submitStatus.loading
                    ? "Submitting..."
                    : "Submit Application"}
                </motion.button>
              </form>
            </div>
          </div>
        </section>

        {/* Additional Benefits Section */}
        <section className='mt-24 mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800'>
            Why Join Us?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <motion.div
              className='bg-white p-6 rounded-lg shadow-lg'
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className='text-xl font-bold mb-4 text-amber-700'>
                Growth Opportunities
              </h3>
              <p className='text-gray-600'>
                We believe in nurturing talent and providing clear pathways for
                career advancement and professional development.
              </p>
            </motion.div>

            <motion.div
              className='bg-white p-6 rounded-lg shadow-lg'
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className='text-xl font-bold mb-4 text-amber-700'>
                Innovative Environment
              </h3>
              <p className='text-gray-600'>
                Work with cutting-edge technologies and methodologies in an
                environment that encourages innovation and creative thinking.
              </p>
            </motion.div>

            <motion.div
              className='bg-white p-6 rounded-lg shadow-lg'
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className='text-xl font-bold mb-4 text-amber-700'>
                Work-Life Balance
              </h3>
              <p className='text-gray-600'>
                We understand the importance of balance and offer flexible
                working arrangements and comprehensive benefits.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CareerPage;
