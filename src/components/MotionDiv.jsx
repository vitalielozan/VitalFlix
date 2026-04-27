import React from "react";
import { motion as Motion } from "framer-motion";

const animations = [
  { x: -50, y: 0 },
  { x: 50, y: 0 },
  { x: 0, y: 50 },
  { x: 0, y: -50 },
];

function MotionDiv({ children }) {
  const randomEffect =
    animations[Math.floor(Math.random() * animations.length)];

  return (
    <Motion.div
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      initial="hidden"
      animate="show"
    >
      <Motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          ...randomEffect,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </Motion.div>
    </Motion.div>
  );
}

export default MotionDiv;
