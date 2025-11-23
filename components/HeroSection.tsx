"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center text-center py-32 bg-gradient-to-r from-lavender via-powderBlue to-mint rounded-xl">
      
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
        Hi, I'm Saumya Brahmbhatt
      </h1>

      <p className="text-gray500 text-xl md:text-2xl mb-8">
        CS Student | AI/ML Enthusiast | Creator of Interactive Web Experiences
      </p>

      {/* PROFESSIONAL GLOW BUTTON */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/projects")}
        className="
          relative px-8 py-3 font-medium rounded-full text-white 
          bg-gray-700 shadow-md overflow-visible group transition-all duration-300
          hover:bg-gray-800
        "
      >
        <span className="relative z-20">See My Work</span>

        {/* Subtle glow on hover */}
        <span className="
          absolute inset-0 rounded-full bg-white/10 blur-xl scale-0 
          group-hover:scale-105 transition-all duration-500">
        </span>
      </motion.button>
    </section>
  );
}






/*
export default function HeroSection() {
  return (
    <section className="h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
        Hi, I'm Saumya.
      </h1>
      <p className="max-w-2xl text-white/80 text-lg">
        A creative Computer Science student exploring AI, generative visuals, and software engineering —
        crafting beautiful digital experiences with code.
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href="/projects"
          className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-medium transition"
        >
          View Projects
        </a>

        <a
          href="/contact"
          className="px-6 py-3 border border-white/40 hover:border-pink-400 rounded-lg font-medium transition"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}
*/