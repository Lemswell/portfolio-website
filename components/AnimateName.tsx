'use client'; // Required for interactivity in Next.js App Router

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimateName() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // The static part that never moves
  const base = "lem";
  // The two possible suffixes
  const suffix = isExpanded ? "uel De La Cruz." : ".";

  const letterVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <span 
      className="inline-flex items-center cursor-pointer font-bold text-zinc-800 dark:text-zinc-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(true)}
    >
      {base}
      
      <AnimatePresence mode="wait">
        <motion.span
          key={suffix} // Changing the key triggers the "Backspace" then "Type"
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ 
            staggerChildren: 0.05, 
            // This ensures the "exit" happens before the "entrance"
            staggerDirection: 1 
          }}
          className="inline-flex items-center"
        >
          {suffix.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              // duration: 0 makes it "pop" in without fading
              transition={{ duration: 0 }}
            >
              {char}
            </motion.span>
          ))}

          {/* The Blinking Cursor */}
          {isHovered && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-0.5 inline-block w-[2px] h-[1.2em] bg-black dark:bg-white animate-pulse"
              style={{ verticalAlign: 'middle' }}
            />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}