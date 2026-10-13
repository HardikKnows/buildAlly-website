"use client";

import { motion } from "framer-motion";

// Tasteful, restrained scroll-reveal. Fades + lifts content into view once.
// Respects reduced-motion via Framer Motion's built-in handling.

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
  as = "div",
  once = true,
}) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

// Staggered container — children should be <Reveal> or motion items.
export function RevealGroup({ children, className = "", stagger = 0.08 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

// `as="li"` lets an item sit directly inside a <ul>/<ol> as a real list item.
export function RevealItem({ children, className = "", y = 18, as = "div" }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
