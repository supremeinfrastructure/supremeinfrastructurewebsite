"use client";
import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import { guestprojects } from "../../../../data/guesthousedata";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProjectNotFound from "@/components/ProjectNotFoundGuestHouse";

const ICON_MAP = Object.fromEntries(Object.entries(Icons));

const GRID = {
  gallery: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full",
  highlights: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6",
  videos: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12",
};

const STYLES = {
  title: "text-3xl md:text-4xl font-bold text-center text-amber-800 mb-6",
  divider: "w-36 h-1 bg-amber-700 mx-auto mb-10",
  button:
    "inline-block bg-gradient-to-r from-amber-700 to-amber-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition",
};

const cache = new Map();
const getProjectBySlug = (slug) => {
  if (!slug) return null;
  if (cache.has(slug)) return cache.get(slug);
  const project = guestprojects.find((p) => p.slug === slug);
  if (project) cache.set(slug, project);
  return project;
};

const VideoPlayer = React.memo(({ video }) => {
  const ref = useRef();
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (error)
    return (
      <div className="aspect-video bg-gray-200 flex items-center justify-center">
        Video unavailable
      </div>
    );

  return (
    <div ref={ref} className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
      {show && (
        <video
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          controls
          poster={video.thumbnail}
          preload="metadata"
          onError={() => setError(true)}
        >
          <source src={video.url} type="video/mp4" />
        </video>
      )}
      {video.title && <p className="mt-2 text-center text-gray-700">{video.title}</p>}
    </div>
  );
});

const GalleryImage = React.memo(({ item, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      onClick={() => !error && onClick(item.image)}
      className={`relative aspect-square rounded-xl overflow-hidden ${
        error
          ? "bg-gray-200"
          : "cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md"
      }`}
    >
      {!error ? (
        <>
          {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
          <Image
            src={item.image}
            alt={item.alt || "Gallery image"}
            fill
            loading="lazy"
            sizes="(max-width:768px)50vw,(max-width:1200px)33vw,25vw"
            className={`object-cover ${loaded ? "opacity-100" : "opacity-0"} transition-opacity`}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-sm text-gray-500">
          Image unavailable
        </div>
      )}
    </div>
  );
});

const HighlightItem = React.memo(({ item }) => {
  const Icon = ICON_MAP[item.icon];
  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:scale-105 transition">
      {Icon ? (
        <Icon className="w-10 h-10 mb-3 text-amber-600" />
      ) : (
        <div className="w-10 h-10 bg-gray-300 rounded mb-4" />
      )}
      <p className="text-sm font-medium text-gray-700">{item.description}</p>
    </div>
  );
});

const ConfigRow = React.memo(({ config }) => (
  <tr className="border-b border-gray-200 hover:bg-amber-50 transition">
    <td className="py-3 px-4 text-center">{config.flat}</td>
    <td className="py-3 px-4 text-center">{config.carpet}</td>
    <td className="py-3 px-4 text-center">
      <Link href="/contact" className={STYLES.button}>
        Get Quote
      </Link>
    </td>
  </tr>
));

const ImageModal = ({ image, onClose }) => {
  const modalRef = useRef();
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      onClick={(e) => e.target === modalRef.current && onClose()}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    >
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] p-6">
        <Image
          src={image}
          alt="Preview"
          fill
          sizes="100vw"
          className="object-contain rounded-lg"
          priority
        />
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-4xl hover:text-red-500 z-50"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default function ProjectPage() {
  const { slug } = useParams();
  const [fullImage, setFullImage] = useState(null);
  const project = useMemo(() => getProjectBySlug(slug), [slug]);

  if (!project) return <ProjectNotFound />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white">
      {/* Hero */}
      <section className="py-12 px-6 lg:px-16 ">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:mt-24">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold text-orange-800 mb-4">
              {project.title}
            </h1>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>
          <div className="lg:w-1/2 cursor-pointer">
            <Image
              src={project.image}
              alt={project.title}
              width={720}
              height={480}
              priority
              className="rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              onClick={() => setFullImage(project.image)}
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      {(project.galleryImages || project.videos) && (
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6 lg:px-16">
          <h2 className={STYLES.title}>Gallery</h2>
          <div className={STYLES.divider}></div>
          {project.videos?.length > 0 && (
            <div className={GRID.videos}>
              {project.videos.map((v, i) => (
                <VideoPlayer key={i} video={v} />
              ))}
            </div>
          )}
          {project.galleryImages?.length > 0 && (
            <div className={GRID.gallery}>
              {project.galleryImages.map((img, i) => (
                <GalleryImage key={i} item={img} onClick={setFullImage} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Highlights */}
      {project.highlights?.length > 0 && (
        <section className="bg-white py-16 px-6 lg:px-16">
          <h2 className={STYLES.title}>Project Highlights</h2>
          <div className={STYLES.divider}></div>
          <div className={GRID.highlights}>
            {project.highlights.map((h, i) => (
              <HighlightItem key={i} item={h} />
            ))}
          </div>
        </section>
      )}

      {/* Config */}
      {project.configuration?.length > 0 && (
        <section className="bg-gradient-to-r from-orange-50 to-amber-100 py-16 px-6 lg:px-16">
          <h2 className={STYLES.title}>Configuration</h2>
          <div className={STYLES.divider}></div>
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
                {project.configuration.map((c, i) => (
                  <ConfigRow key={i} config={c} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {fullImage && <ImageModal image={fullImage} onClose={() => setFullImage(null)} />}
    </div>
  );
}
