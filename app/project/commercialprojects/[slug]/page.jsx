// "use client";
// import { useState, useMemo, useCallback } from "react";
// import {
//   Fence, FlipHorizontal, BetweenVerticalStart, Lightbulb, Armchair, Component, Wallpaper,
//   Home, Activity, Banknote, FileCheck, CheckSquare, Dumbbell, Utensils, House, GraduationCap,
//   LampCeiling, Library, Scale3D, Layers2, Waves, ShowerHead, Lamp, InspectionPanel, Pickaxe,
//   LampCeilingIcon, Columns2, Palette, Timer, Sticker, AudioLines, LogIn, Book, FlipHorizontal2,
//   PanelBottom, History, Sprout, Coffee, HandCoins, Users, Presentation, Leaf, BrickWall,
//   LeafyGreen, Brush, Box, Diamond, Landmark, Paintbrush, ScanLine, MonitorPlay, Wine,LampWallUp,PaintRoller,TentTree,Columns3,ComponentIcon,LampWallDown
// } from "lucide-react";
// import { projects } from "../../../../data/commercialprojects";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import ProjectNotFound from "@/components/ProjectNotFoundCommercial";

// // 🔧 Create icon map
// const highlightsIcon = {
//   Fence, FlipHorizontal, BetweenVerticalStart, Lightbulb, Armchair, Component, Wallpaper,
//   Home, Activity, Banknote, FileCheck, CheckSquare, Dumbbell, Utensils, House, GraduationCap,
//   LampCeiling, Library, Scale3D, Layers2, Waves, ShowerHead, Lamp, InspectionPanel, Pickaxe,
//   LampCeilingIcon, Columns2, Palette, Timer, Sticker, AudioLines, LogIn, Book, FlipHorizontal2,
//   PanelBottom, History, Sprout, Coffee, HandCoins, Users, Presentation, Leaf, BrickWall,
//   LeafyGreen, Brush, Box, Diamond, Landmark, Paintbrush, ScanLine, MonitorPlay,Wine,LampWallUp,PaintRoller,TentTree,Columns3,ComponentIcon,LampWallDown
// };

// const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug);

// export default function ProjectPage() {
//   const { slug } = useParams();
//   const [fullViewImage, setFullViewImage] = useState(null);

//   const project = useMemo(() => getProjectBySlug(slug), [slug]);
//   const openFullView = useCallback((image) => setFullViewImage(image), []);
//   const closeFullView = useCallback(() => setFullViewImage(null), []);

//   if (!project) return <ProjectNotFound />;

//   const highlightItems = useMemo(() => project.highlights?.map((item, index) => {
//     const IconComponent = highlightsIcon[item.icon];
//     return (
//       <div
//         key={index}
//         className='lg:my-8 flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105'
//       >
//         {IconComponent && <IconComponent className='w-8 h-8 mb-4 text-cyan-700' />}
//         <p className='text-sm font-medium text-gray-900'>{item.description}</p>
//       </div>
//     );
//   }) ?? null, [project.highlights]);

//   const galleryImageItems = useMemo(() => project.galleryImages?.map((galleryImage, index) => (
//     <div
//       key={index}
//       className='relative aspect-video w-full cursor-pointer rounded-lg overflow-hidden'
//       onClick={() => openFullView(galleryImage.image)}
//     >
//       <Image
//         src={galleryImage.image}
//         alt={galleryImage.alt}
//         fill
//         loading="lazy"
//         sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
//         className='object-cover transition duration-300 ease-in-out hover:scale-105'
//       />
//     </div>
//   )) ?? null, [project.galleryImages, openFullView]);

//   const videoItems = useMemo(() => project.videos?.map((video, index) => (
//     <div key={index} className='relative aspect-video w-full rounded-lg overflow-hidden'>
//       <video
//         className='w-full h-full object-cover'
//         autoPlay
//         loop
//         muted
//         playsInline
//         controls
//         poster={video.thumbnail}
//       >
//         <source src={video.url} type='video/mp4' />
//         Your browser does not support the video tag.
//       </video>
//       <p className='mt-2 text-center text-gray-700'>{video.title}</p>
//     </div>
//   )) ?? null, [project.videos]);

//   const configurationRows = useMemo(() => project.configuration?.map((config, index) => (
//     <tr key={index} className='border-b border-gray-200 hover:bg-gray-100'>
//       <td className='py-3 px-4 text-center'>{config.flat}</td>
//       <td className='py-3 px-4 text-center'>{config.carpet}</td>
//       <td className='py-3 px-4 text-center'>
//         <Link
//           href='/contact'
//           className='bg-gradient-to-r from-amber-700 to-yellow-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'
//         >
//           Get Quote
//         </Link>
//       </td>
//     </tr>
//   )) ?? null, [project.configuration]);

//   return (
//     <div className='bg-gradient-to-b from-white-100 to-white min-h-screen md:mt-36'>
//       <div className='w-full'>
//         <section className='py-8 px-4 sm:px-6 lg:px-8'>
//           <div className='flex flex-col lg:flex-row items-start mx-auto w-full'>
//             <div className='lg:w-1/2 lg:pr-6 text-center'>
//               <h1 className='text-2xl md:text-5xl font-bold mb-4 text-amber-800 text-center md:my-8 md:ml-24'>
//                 {project.title}
//               </h1>
//               <p className='mb-4 text-sm md:text-base text-black md:ml-24'>{project.fullDescription}</p>
//             </div>
//             <div className='lg:w-2/2 mt-4 lg:mt-0 lg:ml-36'>
//               <div
//                 className='cursor-pointer transition-transform duration-300 hover:scale-105'
//                 onClick={() => openFullView(project.image)}
//               >
//                 <Image
//                   src={project.image}
//                   alt={project.title}
//                   width={600}
//                   height={400}
//                   priority
//                   placeholder="blur"
//                   blurDataURL="/placeholder.jpg"
//                   className='w-full h-auto object-cover rounded-lg'
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {(project.galleryImages || project.videos) && (
//           <section className='bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
//             <h2 className='text-3xl md:text-5xl font-bold text-center text-amber-800 mb-8'>Gallery</h2>
//             <div className='w-36 h-1 bg-amber-700 mx-auto mb-8'></div>
//             {videoItems && <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>{videoItems}</div>}
//             {galleryImageItems && <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>{galleryImageItems}</div>}
//           </section>
//         )}

//         {highlightItems && (
//           <section className='bg-gray-200 py-12 px-4 sm:px-6 lg:px-8'>
//             <h2 className='text-3xl md:text-5xl font-bold text-center text-amber-800 mb-8'>Project Highlights</h2>
//             <div className='w-36 h-1 bg-amber-700 mx-auto mb-8'></div>
//             <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8'>{highlightItems}</div>
//           </section>
//         )}

//         <section className='bg-white py-12 px-4 sm:px-6 lg:px-8'>
//           <h2 className='text-3xl md:text-5xl font-bold text-center text-orange-800 mb-8'>Configuration</h2>
//           <div className='w-36 h-1 bg-amber-700 mx-auto mb-8'></div>
//           <div className='overflow-x-auto'>
//             <table className='w-full border-collapse bg-white shadow-md rounded-lg'>
//               <thead>
//                 <tr className='bg-navy-700 text-black'>
//                   <th className='py-3 px-4 text-center'>Approx Area</th>
//                   <th className='py-3 px-4 text-center'>Project duration</th>
//                   <th className='py-3 px-4 text-center'>Price</th>
//                 </tr>
//               </thead>
//               <tbody>{configurationRows}</tbody>
//             </table>
//           </div>
//         </section>

//         {fullViewImage && (
//           <div className='fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50' onClick={closeFullView}>
//             <div className='relative w-full h-full max-w-5xl max-h-[90vh] p-4'>
//               <Image
//                 src={fullViewImage}
//                 alt='Full view'
//                 fill
//                 sizes="90vw"
//                 loading='eager'
//                 className='object-contain rounded'
//               />
//               <button
//                 className='absolute top-4 right-4 text-white text-4xl hover:text-red-600 md:text-6xl'
//                 onClick={closeFullView}
//               >
//                 &times;
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";
import { useState, useEffect } from "react";
import {
  Fence, FlipHorizontal, BetweenVerticalStart, Lightbulb, Armchair, Component, Wallpaper,
  Home, Activity, Banknote, FileCheck, CheckSquare, Dumbbell, Utensils, House, GraduationCap,
  LampCeiling, Library, Scale3D, Layers2, Waves, ShowerHead, Lamp, InspectionPanel, Pickaxe,
  LampCeilingIcon, Columns2, Palette, Timer, Sticker, AudioLines, LogIn, Book, FlipHorizontal2,
  PanelBottom, History, Sprout, Coffee, HandCoins, Users, Presentation, Leaf, BrickWall,
  LeafyGreen, Brush, Box, Diamond, Landmark, Paintbrush, ScanLine, MonitorPlay, Wine, LampWallUp, PaintRoller, TentTree, Columns3, ComponentIcon, LampWallDown
} from 'lucide-react';
import { projects } from "../../../../data/commercialprojects";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProjectNotFound from "@/components/ProjectNotFoundResidencial";
import { motion } from "framer-motion";

const getProjectBySlug = (slug) => {
  return projects.find((project) => project.slug === slug);
};

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [fullViewImage, setFullViewImage] = useState(null);

  if (!project) {
    return <ProjectNotFound />;
  }

  const openFullView = (image) => {
    setFullViewImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeFullView = () => {
    setFullViewImage(null);
    document.body.style.overflow = "auto";
  };

  const highlightsIcon = {
    Fence, FlipHorizontal, BetweenVerticalStart, Lightbulb, Armchair, Component, Wallpaper,
    Home, Activity, Banknote, FileCheck, CheckSquare, Dumbbell, Utensils, House, GraduationCap,
    LampCeiling, Library, Scale3D, Layers2, Waves, ShowerHead, Lamp, InspectionPanel, Pickaxe,
    LampCeilingIcon, Columns2, Palette, Timer, Sticker, AudioLines, LogIn, Book, FlipHorizontal2,
    PanelBottom, History, Sprout, Coffee, HandCoins, Users, Presentation, Leaf, BrickWall,
    LeafyGreen, Brush, Box, Diamond, Landmark, Paintbrush, ScanLine, MonitorPlay, Wine, LampWallUp, PaintRoller, TentTree, Columns3, ComponentIcon, LampWallDown
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white">
      <div className="w-full">
        {/* Hero */}
        <section className="py-12 px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <h1 className="text-3xl md:text-5xl font-extrabold text-amber-800 mb-4">
                {project.title}
              </h1>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {project.fullDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 cursor-pointer"
              onClick={() => openFullView(project.image)}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={720}
                height={480}
                priority
                className="rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 md:mt-24"
              />
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        {(project.galleryImages || project.videos) && (
          <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6 lg:px-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-800 mb-10">
              Gallery
            </h2>

            {/* Videos */}
            {project.videos?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {project.videos.map((video, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
                  >
                    <video className="w-full h-full object-cover" controls poster={video.thumbnail}>
                      <source src={video.url} type="video/mp4" />
                    </video>
                    <p className="mt-2 text-center text-gray-600">{video.title}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Images */}
            {project.galleryImages && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.galleryImages.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square overflow-hidden rounded-xl shadow-md cursor-pointer"
                    onClick={() => openFullView(img.image)}
                  >
                    <Image
                      src={img.image}
                      alt={img.alt}
                      fill
                      className="object-cover hover:scale-110 transition duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Highlights */}
        {project.highlights && (
          <section className="bg-white py-16 px-6 lg:px-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-800 mb-12">
              Project Highlights
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {project.highlights.map((item, i) => {
                const Icon = highlightsIcon[item.icon];
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition"
                  >
                    {Icon && <Icon className="w-10 h-10 mb-3 text-amber-600" />}
                    <p className="text-sm font-medium text-gray-700">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* Config */}
        <section className="bg-gradient-to-r from-orange-50 to-amber-100 py-16 px-6 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-800 mb-10">
            Configuration
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white/90 backdrop-blur-md shadow-lg rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-amber-700 text-white text-sm md:text-base">
                  <th className="py-3 px-4">Approx Area</th>
                  <th className="py-3 px-4">Project Duration</th>
                  <th className="py-3 px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {project.configuration.map((cfg, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-amber-50 transition">
                    <td className="py-3 px-4 text-center">{cfg.flat}</td>
                    <td className="py-3 px-4 text-center">{cfg.carpet}</td>
                    <td className="py-3 px-4 text-center">
                      <Link
                        href="/contact"
                        className="inline-block bg-gradient-to-r from-amber-700 to-amber-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition"
                      >
                        Get Quote
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modal */}
        {fullViewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={closeFullView}
          >
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] p-6">
              <Image
                src={fullViewImage}
                alt="Full view"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
              <button
                className="absolute top-4 right-6 text-white text-4xl hover:text-red-500 transition"
                onClick={closeFullView}
              >
                &times;
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}


