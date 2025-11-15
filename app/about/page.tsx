"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Bubble {
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
}

export default function AboutPage() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generated: Bubble[] = Array.from({ length: 25 }).map(() => {
      const size = 20 + Math.random() * 50; // size between 20px and 70px
      return {
        size,
        top: `${Math.random() * 100}%`, // anywhere from top to bottom
        left: `${Math.random() * 100}%`, // anywhere from left to right
        duration: 10 + Math.random() * 10, // duration 10-20s
        delay: Math.random() * 5,
      };
    });
    setBubbles(generated);
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto p-8 flex flex-col lg:flex-row items-center gap-10 overflow-hidden min-h-screen">

      {/* Floating Bubbles */}
      {bubbles.map((b, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-indigo-300 opacity-30"
          style={{ width: b.size, height: b.size, top: b.top, left: b.left }}
          animate={{
            y: ["0%", `${Math.random() * 20 - 10}%`, "0%"], // small vertical float
            x: ["0%", `${Math.random() * 20 - 10}%`, "0%"], // small horizontal float
          }}
          transition={{
            repeat: Infinity,
            duration: b.duration,
            ease: "easeInOut",
            delay: b.delay,
          }}
        />
      ))}

      {/* Text Section */}
      <div className="lg:w-2/3 space-y-6 z-10">
        <h1 className="text-5xl font-extrabold text-black">About Me</h1>

        <p className="text-black text-lg leading-relaxed">
          Hello! I'm <strong>Saumya Brahmbhatt</strong>, a passionate Computer Science student specializing 
          in Artificial Intelligence and Machine Learning. I enjoy creating software that blends creativity with practical problem-solving.
        </p>

        <p className="text-black text-lg leading-relaxed">
          My projects and explorations are driven by curiosity and the desire to make technology more accessible 
          and impactful. From building AI-driven financial tools like <strong>Broke2Broker</strong> to innovative 
          games and research experiments, I aim to turn ideas into real-world solutions.  
        </p>

        <p className="text-black italic">“Innovation is the intersection of creativity and logic.”</p>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/3 relative z-10">
        <motion.div
          className="overflow-hidden rounded-3xl shadow-2xl"
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          <img
            src="/images/your-photo.jpg" // replace with your actual image path
            alt="Saumya Brahmbhatt"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}
