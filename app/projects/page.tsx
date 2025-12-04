"use client";

import { motion } from "framer-motion";
import ProjectCard from '../../components/ProjectCard';

export default function ProjectsPage() {
  const projects = [
    {
      title: "BizChat",
      slug: "bizchat",
      description: "LLM-powered business plan assistant.",
      imageUrl: "/images/Bizchat_IMG.png"
    },

    {
      title: "Budget2Broker",
      slug: "broke2broker",
      description: "HackUMBC2025: AI-driven financial mentorship platform.",
      imageUrl: "/images/budget2broker.png",
      link: "/projects/broke2broker",
    },

    {
    title: "1D Falling Disks Research",
    slug: "research",
    description:
      "Numerical & experimental study of 1D falling disks with air resistance. Presented at the 10th Annual Maryland Collegiate STEM Conference. Built MATLAB simulations (ode45), engineered automated PASCO system with 99% accuracy, and analyzed drag-force behavior with <5% computational error.",
    imageUrl: "/images/PhysicsResearch.jpeg",
    link: "/projects/research",
    },

    {
      title: "ScholarSnap",
      slug: "scholarsnap",
      description: "AI paper summarizer using OCR and NLP.",
      imageUrl: "/images/ScholarSnap_2.png", 
      link: "/projects/ScholarSnap",
    },
    {
      title: "Sliding Puzzle",
      slug: "sliding-puzzle",
      description: "NxM puzzle game with C++ and Windows API.",
      imageUrl: "/images/SlidingPuzzle.png",
      link: "/projects/sliding-puzzle",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-16">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
        My Projects
      </h1>

      <div className="relative border-l-4 border-gray-300 ml-4">
        {projects.map((project, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className={`mb-12 flex flex-col md:flex-row ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              

              {/* Project Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -3 }}
                transition={{ type: "spring", stiffness: 180 }}
                className="bg-gray-50 border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-2xl flex-1 md:mx-6"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  link={project.link}
                  slug={project.slug} 
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
