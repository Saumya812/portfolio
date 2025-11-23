"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const projectData = [
  {
    slug: "bizchat",
    title: "BizChat",
    description: "LLM-powered business plan assistant.",
    imageUrl: "/images/Bizchat_IMG.png",
    details: [
      "Developed using React, Next.js, and OpenAI API.",
      "Supports real-time collaboration.",
      "Dynamic LLM prompts for templates."
    ]
  },
  
  {
    slug: "broke2broker",
    title: "Broke2Broker",
    description: "HackUMBC2025: AI-driven financial mentor.",
    imageUrl: "/images/B2B.jpeg",
    details: [
      "AI-guided financial roadmap.",
      "Custom algorithms.",
      "Real-time analytics."
    ]
  },

  {
    slug: "research",
    title: "1D Falling Disks Research",
    description:
      "Numerical & experimental study of 1D falling disks with air resistance. Presented at the 10th Annual Maryland Collegiate STEM Conference.",
    imageUrl: "/images/PhysicsResearch.JPEG",
    details: [
      "MATLAB simulations using ode45.",
      "Automated PASCO system with 99% accuracy.",
      "Analyzed drag-force with <5% computational error."
    ]
  },

  {
    slug: "scholarsnap",
    title: "ScholarSnap",
    description: "AI paper summarizer using OCR + NLP.",
    imageUrl: "/images/scholarsnap.png",
    details: [
      "OCR text extraction.",
      "NLP summarization.",
      "Highlights + insights."
    ]
  },

  {
    slug: "sliding-puzzle",
    title: "Sliding Puzzle",
    description: "NxM puzzle with C++ and Windows API.",
    imageUrl: "/images/SlidingPuzzle.png",
    details: [
      "Dynamic board generation.",
      "C++ implementation.",
      "Windows API UI."
    ]
  }
];

export default function ProjectDetailPage() {
  const params = useParams();
  const rawSlug = params.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const project = projectData.find((p) => p.slug === slug);

  if (!project) {
    return <p className="text-center mt-20 text-2xl">Project not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-gray-800"
      >
        {project.title}
      </motion.h1>

      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-96 object-cover rounded-xl shadow-lg"
      />

      <p className="text-gray-700 text-lg">{project.description}</p>

      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {project.details.map((detail, idx) => (
          <li key={idx}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}
