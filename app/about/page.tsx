"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import profile from '../../public/images/profile.jpg';

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
      const size = 20 + Math.random() * 50;
      return {
        size,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: 10 + Math.random() * 10,
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
          style={{
            width: b.size,
            height: b.size,
            top: `calc(${b.top} - ${b.size / 2}px)`,
            left: `calc(${b.left} - ${b.size / 2}px)`,
          }}
          animate={{
            y: ["0%", `${Math.random() * 20 - 10}%`, "0%"],
            x: ["0%", `${Math.random() * 20 - 10}%`, "0%"],
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
          Hello! I'm <strong>Saumya Brahmbhatt</strong>, a Computer Science student
          specializing in Artificial Intelligence and Machine Learning. I love building
          intelligent systems that merge creativity with practical, real-world problem-solving.
        </p>

        <p className="text-black text-lg leading-relaxed">
          I completed my <strong>A.S. in Computer Science with High Honors</strong> from
          Harford Community College, and I am currently part of the 
          <strong> Honors College at UMBC</strong> pursuing my B.S. in Computer Science.
        </p>

        <p className="text-black text-lg leading-relaxed">
          My work explores AI research, simulations, interactive applications, and creative computing—
          always with the goal of making technology more intuitive, human-centered, and impactful.
        </p>

        <p className="text-black italic">“Innovation happens where creativity meets logic.”</p>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/3 relative z-10">
        <motion.div
          className="overflow-hidden rounded-3xl shadow-2xl"
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          <Image
            src="/images/profile.JPG"
            alt="Saumya Brahmbhatt"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}
