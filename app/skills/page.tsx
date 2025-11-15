"use client";

import { motion } from "framer-motion";

export default function SkillsSection() {
  const skills = [
    "Python",
    "C++",
    "Java",
    "AI / ML",
    "Web Development",
    "Next.js & React",
    "Data Analysis",
    "SQL & Databases",
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      {/* Section Title */}
      <h1 className="text-5xl font-extrabold text-center text-gray-800">
        My Skills
      </h1>

      {/* Skills Grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill) => (
          <motion.div
            key={skill}
            whileHover={{ scale: 1.05, y: -3 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="px-6 py-3 rounded-xl border border-gray-300 bg-gray-50 shadow-md hover:shadow-xl text-gray-800 font-semibold text-lg cursor-pointer transition-all duration-300"
          >
            {skill}
          </motion.div>
        ))}
      </div>

      {/* Optional description */}
      <p className="text-center text-gray-600 max-w-2xl mx-auto">
        These are some of the tools and technologies I specialize in. I focus on building efficient, creative, and scalable solutions that leverage AI, software engineering, and modern web development frameworks.
      </p>
    </div>
  );
}
