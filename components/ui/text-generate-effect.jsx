"use client";
import React, { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(' ');

export const TextGenerateEffect = ({ word, filter, duration, className }) => {
  const [scope, animate] = useAnimate();
  let wordsArray = word.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    );
  }, [scope.current, animate, filter, duration]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-white opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-extrabold", className)}>
      <div className="mt-2">
        <div className="dark:text-white text-black text-5xl leading-snug tracking-wide ml-12">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};