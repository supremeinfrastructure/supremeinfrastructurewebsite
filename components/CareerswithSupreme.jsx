'use client'
import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

const CareerswithSupreme = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Error attempting to play video:", error);
            });
        }
    }, []);

    return (
        <div className="flex justify-center items-center min-h-[80vh] p-4 bg-gray-200">
            <Head>
                <title>Careers with Supreme</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col md:flex-row max-w-6xl w-full rounded-lg overflow-hidden">
                <div className="w-full md:w-1/2 h-64 md:h-auto">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/images/home/careerMobile.jpg"
                    >
                        <source src="/videos/career.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="w-full md:w-1/2 p-6 md:p-12">
                    <h2 className="text-orange-600 text-xs md:text-sm mb-4 md:mb-6 md:text-center">CAREERS WITH SUPREME</h2>
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 md:text-center">It's time to make a move.</h1>
                    <p className="text-gray-700 text-sm md:text-base mb-4 md:mb-6 md:text-center">
                        Supreme needs people-readers and problem-solvers, creators and collaborators, thinkers, doers, and innovators. Above all, we need leaders.
                    </p>
                    <p className="text-gray-700 text-sm md:text-base mb-6 md:mb-8 md:text-center">
                        That's where you come in.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:justify-center">
                        <Link href="/contact" className="bg-gradient-to-r from-amber-700 to-yellow-600 text-white px-6 py-3 rounded-md  hover:bg-red-600 transition duration-300 text-center">
                            JOIN SUPREME
                        </Link>
                        <Link href="/contact/career" className="bg-gray-800 text-white px-6 py-3 rounded-md  hover:bg-gray-900 transition duration-300 flex items-center justify-center">
                            <span>COME TO BELONG</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CareerswithSupreme