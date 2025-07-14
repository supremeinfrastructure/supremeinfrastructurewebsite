"use client";
import { useState, useMemo, useCallback } from "react";
import * as Icons from "lucide-react";
import { projects } from "../../../../data/horticultureprojects";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProjectNotFound from "@/components/ProjectNotFoundCommercial";

const highlightsIcon = Object.fromEntries(
  Object.entries(Icons).map(([key, Icon]) => [key, Icon])
);

const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug);

export default function ProjectPage() {
  const { slug } = useParams();
  const [fullViewImage, setFullViewImage] = useState(null);

  const project = useMemo(() => getProjectBySlug(slug), [slug]);
  const openFullView = useCallback((image) => setFullViewImage(image), []);
  const closeFullView = useCallback(() => setFullViewImage(null), []);

  if (!project) return <ProjectNotFound />;

  const highlightItems = useMemo(() => project.highlights?.map((item, index) => {
    const IconComponent = highlightsIcon[item.icon];
    return (
      <div
        key={index}
        className='lg:my-8 flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105'
      >
        {IconComponent && <IconComponent className='w-8 h-8 mb-4 text-cyan-700' />}
        <p className='text-sm font-medium text-gray-900'>{item.description}</p>
      </div>
    );
  }) ?? null, [project.highlights]);

  const galleryImageItems = useMemo(() => project.galleryImages?.map((galleryImage, index) => (
    <div
      key={index}
      className='relative aspect-video w-full cursor-pointer rounded-lg overflow-hidden'
      onClick={() => openFullView(galleryImage.image)}
    >
      <Image
        src={galleryImage.image}
        alt={galleryImage.alt}
        fill
        loading="lazy"
        sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
        className='object-cover transition duration-300 ease-in-out hover:scale-105'
      />
    </div>
  )) ?? null, [project.galleryImages, openFullView]);

  const videoItems = useMemo(() => project.videos?.map((video, index) => (
    <div key={index} className='relative aspect-video w-full rounded-lg overflow-hidden'>
      <video
        className='w-full h-full object-cover'
        autoPlay
        loop
        muted
        playsInline
        controls
        poster={video.thumbnail}
      >
        <source src={video.url} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <p className='mt-2 text-center text-gray-700'>{video.title}</p>
    </div>
  )) ?? null, [project.videos]);

  const configurationRows = useMemo(() => project.configuration?.map((config, index) => (
    <tr key={index} className='border-b border-gray-200 hover:bg-gray-100'>
      <td className='py-3 px-4 text-center'>{config.flat}</td>
      <td className='py-3 px-4 text-center'>{config.carpet}</td>
      <td className='py-3 px-4 text-center'>
        <Link
          href='/contact'
          className='bg-gradient-to-r from-amber-700 to-yellow-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'
        >
          Get Quote
        </Link>
      </td>
    </tr>
  )) ?? null, [project.configuration]);

  return (
    <div className='bg-gradient-to-b from-white-100 to-white min-h-screen md:mt-36'>
      <div className='w-full'>
        <section className='py-8 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col lg:flex-row items-start mx-auto w-full'>
            <div className='lg:w-1/2 lg:pr-6 text-center'>
              <h1 className='text-2xl md:text-5xl font-bold mb-4 text-amber-800 text-center md:my-8 md:ml-24'>
                {project.title}
              </h1>
              <p className='mb-4 text-sm md:text-base text-black md:ml-24'>{project.fullDescription}</p>
            </div>
            <div className='lg:w-2/2 mt-4 lg:mt-0 lg:ml-36'>
              <div
                className='cursor-pointer transition-transform duration-300 hover:scale-105'
                onClick={() => openFullView(project.image)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  priority
                  placeholder="blur"
                  blurDataURL="/placeholder.jpg"
                  className='w-full h-auto object-cover rounded-lg'
                />
              </div>
            </div>
          </div>
        </section>

        {(project.galleryImages || project.videos) && (
          <section className='bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl md:text-5xl font-bold text-center text-amber-800 mb-8'>Gallery</h2>
            <div className='w-36 h-1 bg-amber-700 mx-auto mb-8'></div>
            {videoItems && <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>{videoItems}</div>}
            {galleryImageItems && <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>{galleryImageItems}</div>}
          </section>
        )}

        {highlightItems && (
          <section className='bg-gray-200 py-12 px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl md:text-5xl font-bold text-center text-amber-800 mb-8'>Project Highlights</h2>
            <div className='w-36 h-1 bg-amber-700 mx-auto mb-8'></div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8'>{highlightItems}</div>
          </section>
        )}

        <section className='bg-white py-12 px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl md:text-5xl font-bold text-center text-orange-800 mb-8'>Configuration</h2>
          <div className='w-36 h-1 bg-amber-700 mx-auto mb-8'></div>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse bg-white shadow-md rounded-lg'>
              <thead>
                <tr className='bg-navy-700 text-black'>
                  <th className='py-3 px-4 text-center'>Approx Area</th>
                  <th className='py-3 px-4 text-center'>Project duration</th>
                  <th className='py-3 px-4 text-center'>Price</th>
                </tr>
              </thead>
              <tbody>{configurationRows}</tbody>
            </table>
          </div>
        </section>

        {fullViewImage && (
          <div className='fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50' onClick={closeFullView}>
            <div className='relative w-full h-full max-w-5xl max-h-[90vh] p-4'>
              <Image
                src={fullViewImage}
                alt='Full view'
                fill
                sizes="90vw"
                loading='eager'
                className='object-contain rounded'
              />
              <button
                className='absolute top-4 right-4 text-white text-4xl hover:text-red-600 md:text-6xl'
                onClick={closeFullView}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}