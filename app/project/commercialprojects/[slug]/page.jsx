// "use client";
// import { useState, useMemo, useCallback } from "react";
// import {
//   Fence, FlipHorizontal, BetweenVerticalStart, Lightbulb, Armchair, Component, Wallpaper, Home, Activity, Banknote, FileCheck, CheckSquare, Dumbbell, Utensils, House, GraduationCap,
//   LampCeiling, Library, Scale3D, Layers2, Waves, ShowerHead, Lamp, InspectionPanel, Pickaxe, LampCeilingIcon, Columns2, Palette, Timer, Sticker, AudioLines, LogIn, Book, FlipHorizontal2,
//   PanelBottom, History, Sprout, Coffee, HandCoins, Users, Presentation, Leaf, BrickWall, LeafyGreen, Brush, Box, Diamond, Landmark, Paintbrush, ScanLine, MonitorPlay,
// } from "lucide-react";
// import { projects } from "../../../../data/commercialprojects";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import ProjectNotFound from "@/components/ProjectNotFoundCommercial";

// // Move icon mapping outside component to avoid recreation on each render
// const highlightsIcon = {
//   Banknote, FileCheck, CheckSquare, FlipHorizontal, BetweenVerticalStart, Lightbulb, Activity, Armchair,
//   Wallpaper, Component, Fence, Dumbbell, Utensils, House, GraduationCap, LampCeiling, Home, Library,
//   Scale3D, Layers2, Waves, ShowerHead, Lamp, Pickaxe, InspectionPanel, LampCeilingIcon, Columns2, Palette,
//   Timer, Sticker, AudioLines, LogIn, Book, FlipHorizontal2, PanelBottom, History, Sprout, Coffee,
//   HandCoins, Users, Presentation, Leaf, BrickWall, LeafyGreen, Brush, Box, Diamond, Paintbrush, Landmark,
//   ScanLine, MonitorPlay,
// };

// // Memoize project lookup function
// const getProjectBySlug = (slug) => {
//   return projects.find((project) => project.slug === slug);
// };

// export default function ProjectPage() {
//   const { slug } = useParams();
//   const [fullViewImage, setFullViewImage] = useState(null);

//   // Memoize project lookup to avoid unnecessary computations
//   const project = useMemo(() => getProjectBySlug(slug), [slug]);

//   // Memoize callback functions to prevent unnecessary re-renders
//   const openFullView = useCallback((image) => setFullViewImage(image), []);
//   const closeFullView = useCallback(() => setFullViewImage(null), []);

//   // Early return for better performance
//   if (!project) return <ProjectNotFound />;

//   // Memoize highlight items to avoid recreation on each render
//   const highlightItems = useMemo(() => {
//     if (!project.highlights) return null;
    
//     return project.highlights.map((item, index) => {
//       const IconComponent = highlightsIcon[item.icon];
//       return (
//         <div key={index} className='lg:my-8 flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105'>
//           {IconComponent && <IconComponent className='w-8 h-8 mb-4 text-cyan-700' />}
//           <p className='text-sm font-medium text-gray-900'>{item.description}</p>
//         </div>
//       );
//     });
//   }, [project.highlights]);

//   // Memoize gallery images to avoid recreation
//   const galleryImageItems = useMemo(() => {
//     if (!project.galleryImages) return null;
    
//     return project.galleryImages.map((galleryImage, index) => (
//       <div
//         key={index}
//         className='relative aspect-video w-full cursor-pointer rounded-lg overflow-hidden'
//         onClick={() => openFullView(galleryImage.image)}
//       >
//         <Image
//           src={galleryImage.image}
//           alt={galleryImage.alt}
//           fill
//           loading="lazy"
//           sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
//           className='object-cover transition duration-300 ease-in-out hover:scale-105'
//         />
//       </div>
//     ));
//   }, [project.galleryImages, openFullView]);

//   // Memoize video items
//   const videoItems = useMemo(() => {
//     if (!project.videos?.length) return null;
    
//     return project.videos.map((video, index) => (
//       <div key={index} className='relative aspect-video w-full rounded-lg overflow-hidden'>
//         <video
//           className='w-full h-full object-cover'
//           autoPlay
//           loop
//           muted
//           playsInline
//           controls
//           poster={video.thumbnail}
//         >
//           <source src={video.url} type='video/mp4' />
//           Your browser does not support the video tag.
//         </video>
//         <p className='mt-2 text-center text-gray-700'>{video.title}</p>
//       </div>
//     ));
//   }, [project.videos]);

//   // Memoize configuration rows
//   const configurationRows = useMemo(() => {
//     return project.configuration.map((config, index) => (
//       <tr key={index} className='border-b border-gray-200 hover:bg-gray-100'>
//         <td className='py-3 px-4 md:text-center'>{config.flat}</td>
//         <td className='py-3 px-4 md:text-center'>{config.carpet}</td>
//         <td className='py-3 px-4 md:text-center'>
//           <Link href='/contact' className='bg-gradient-to-r from-amber-700 to-yellow-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'>
//             Get Quote
//           </Link>
//         </td>
//       </tr>
//     ));
//   }, [project.configuration]);

//   return (
//     <div className='bg-gradient-to-b from-white-100 to-white min-h-screen md:mt-36'>
//       <div className='w-full'>
//         {/* Hero Section */}
//         <section className='py-8 px-4 sm:px-6 lg:px-8'>
//           <div className='flex flex-col lg:flex-row items-start mx-auto w-full'>
//             <div className='lg:w-1/2 lg:pr-6 text-center'>
//               <h1 className='text-2xl md:text-5xl font-bold mb-4 text-amber-800 text-center lg:text-center md:my-8 md:ml-24'>
//                 {project.title}
//               </h1>
//               <p className='mb-4 text-sm md:text-base text-black lg:text-center lg:ml-24'>
//                 {project.fullDescription}
//               </p>
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

//         {/* Gallery Section */}
//         {(project.galleryImages || project.videos) && (
//           <section className='bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 w-full'>
//             <h2 className='text-3xl md:text-4xl lg:text-5xl font-xl mb-8 text-center text-amber-800 md:my-6'>Gallery</h2>
//             <div className='w-36 h-1 bg-gradient-to-r bg-amber-700 hover:bg-amber-700 mx-auto mb-8'></div>

//             {/* Videos */}
//             {videoItems && (
//               <div className='mb-12'>
//                 <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//                   {videoItems}
//                 </div>
//               </div>
//             )}

//             {/* Images */}
//             {galleryImageItems && (
//               <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 md:mt-16 w-full'>
//                 {galleryImageItems}
//               </div>
//             )}
//           </section>
//         )}

//         {/* Highlights */}
//         {project.highlights && (
//           <div className='bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 w-full'>
//             <h2 className='text-3xl md:text-4xl lg:text-5xl font-xl mb-8 text-center text-amber-800 md:my-6'>Project Highlights</h2>
//             <div className='w-36 h-1 bg-gradient-to-r bg-amber-700 hover:bg-amber-700 mx-auto mb-8'></div>
//             <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 w-full'>
//               {highlightItems}
//             </div>
//           </div>
//         )}

//         {/* Configuration */}
//         <section className='bg-white py-12 px-4 sm:px-6 lg:px-8 w-full'>
//           <h2 className='text-3xl md:text-4xl lg:text-5xl font-xl mb-8 text-center text-orange-800 md:my-6'>Configuration</h2>
//           <div className='w-36 h-1 bg-gradient-to-r bg-amber-700 hover:bg-cyan-600 mx-auto mb-8'></div>

//           <div className='overflow-x-auto mb-12'>
//             <table className='w-full border-collapse bg-white shadow-md rounded-lg'>
//               <thead>
//                 <tr className='bg-navy-700 text-black md:text-center'>
//                   <th className='py-3 px-4 text-left md:text-center'>Approx Area</th>
//                   <th className='py-3 px-4 text-left md:text-center'>Project duration</th>
//                   <th className='py-3 px-4 text-left md:text-center'>Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {configurationRows}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         {/* Full View Modal */}
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
//               <button className='absolute top-4 right-4 text-white text-4xl hover:text-red-600 transition-colors md:text-6xl' onClick={closeFullView}>
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
import { useState, useMemo, useCallback } from "react";
import {
  Fence, FlipHorizontal, BetweenVerticalStart, Lightbulb, Armchair, Component, Wallpaper,
  Home, Activity, Banknote, FileCheck, CheckSquare, Dumbbell, Utensils, House, GraduationCap,
  LampCeiling, Library, Scale3D, Layers2, Waves, ShowerHead, Lamp, InspectionPanel, Pickaxe,
  LampCeilingIcon, Columns2, Palette, Timer, Sticker, AudioLines, LogIn, Book, FlipHorizontal2,
  PanelBottom, History, Sprout, Coffee, HandCoins, Users, Presentation, Leaf, BrickWall,
  LeafyGreen, Brush, Box, Diamond, Landmark, Paintbrush, ScanLine, MonitorPlay, Wine,LampWallUp,PaintRoller,TentTree,Columns3,ComponentIcon,LampWallDown
} from "lucide-react";
import { projects } from "../../../../data/commercialprojects";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProjectNotFound from "@/components/ProjectNotFoundCommercial";

// 🔧 Create icon map
const highlightsIcon = {
  Fence, FlipHorizontal, BetweenVerticalStart, Lightbulb, Armchair, Component, Wallpaper,
  Home, Activity, Banknote, FileCheck, CheckSquare, Dumbbell, Utensils, House, GraduationCap,
  LampCeiling, Library, Scale3D, Layers2, Waves, ShowerHead, Lamp, InspectionPanel, Pickaxe,
  LampCeilingIcon, Columns2, Palette, Timer, Sticker, AudioLines, LogIn, Book, FlipHorizontal2,
  PanelBottom, History, Sprout, Coffee, HandCoins, Users, Presentation, Leaf, BrickWall,
  LeafyGreen, Brush, Box, Diamond, Landmark, Paintbrush, ScanLine, MonitorPlay,Wine,LampWallUp,PaintRoller,TentTree,Columns3,ComponentIcon,LampWallDown
};

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
