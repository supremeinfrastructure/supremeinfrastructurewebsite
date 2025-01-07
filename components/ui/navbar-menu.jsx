"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9]"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white rounded-2xl overflow-hidden border border-black/[0.2] shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActive(null);
      }}
      className={`relative rounded-full border border-transparent ${isHovered ? 'bg-gradient-to-r from-gray-300 to-gray-200' : 'bg-transparent'
        } transition-colors duration-300 flex justify-center md:text-xl space-x-16 px-8 py-6 mt-6 ${isHovered ? 'shadow-3xl' : ''
        }`}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black">{title}</h4>
        <p className="text-neutral-700 text-sm max-w-[10rem]">{description}</p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }) => {
  return (
    <Link {...rest} className="text-neutral-700 hover:text-black">
      {children}
    </Link>
  );
};