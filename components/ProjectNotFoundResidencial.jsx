import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const ProjectNotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-4">
            <div className="text-center bg-white shadow-2xl rounded-2xl p-8 md:p-12 lg:p-16 transform transition-all duration-500 hover:scale-105">
                <div className="flex justify-center mb-6">
                    <AlertTriangle
                        className="w-16 h-16 md:w-24 md:h-24 text-red-500 animate-bounce"
                        strokeWidth={1.5}
                    />
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 animate-pulse">
                    Project Not Found
                </h1>
                <p className="text-base md:text-lg text-gray-600 mb-6 animate-fade-in">
                    We couldn't locate the project you're looking for.
                    Please check the URL or return to the projects page.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                        href="/"
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/project/residencialprojects"
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        View Projects
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectNotFound;