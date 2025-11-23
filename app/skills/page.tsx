"use client";

import { motion } from "framer-motion";

export default function SkillsSection() {
  const skillCategories = {
    "Programming Languages": [
      "Python",
      "C++",
      "Java",
      "JavaScript",
      "TypeScript",
    ],
    "AI & Machine Learning": [
      "Machine Learning",
      "Deep Learning",
      "Neural Networks",
      "Generative AI",
      "Prompt Engineering",
      "Data Analysis",
    ],
    "Web & App Development": [
      "React",
      "Next.js",
      "Node.js",
      "HTML & CSS",
      "REST APIs",
      "UI/UX Design",
    ],
    Tools: [
      "Git & GitHub",
      "VS Code",
      "Linux CLI",
      "Postman",
      "Firebase",
      "Figma",
    ],
    "Data & Cloud": ["SQL", "MongoDB", "AWS Basics", "Data Visualization"],
  };

  return (
    <div className="relative max-w-6xl mx-auto p-10 space-y-16">

      {/* Animated Floating Background Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3, x: [0, 100, -100, 0], y: [0, 50, -50, 0] }}
          transition={{ repeat: Infinity, duration: 18 }}
          className="w-80 h-80 bg-purple-300 rounded-full blur-3xl absolute -top-10 -left-10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25, x: [0, -120, 120, 0], y: [0, -60, 60, 0] }}
          transition={{ repeat: Infinity, duration: 22 }}
          className="w-72 h-72 bg-pink-300 rounded-full blur-3xl absolute top-20 right-0"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2, x: [0, 80, -60, 0], y: [0, 100, -80, 0] }}
          transition={{ repeat: Infinity, duration: 25 }}
          className="w-96 h-96 bg-blue-300 rounded-full blur-[110px] absolute bottom-10 left-20"
        />
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-center text-gray-900"
      >
        My Skills
      </motion.h1>

      {/* Skill Categories */}
      <div className="space-y-12">
        {Object.entries(skillCategories).map(([category, skills], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all"
          >
            {/* Category Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {category}
            </h2>

            {/* Skills */}
            <div className="flex flex-wrap gap-4">
              {skills.map((skill) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.12, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="
                    px-5 py-2 
                    rounded-xl 
                    bg-gradient-to-r from-white to-gray-100 
                    border border-gray-300 
                    shadow-sm 
                    hover:shadow-lg 
                    text-gray-800 
                    font-medium 
                    cursor-pointer 
                    backdrop-blur-lg
                  "
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Animated Footer Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-center text-gray-700 text-lg max-w-2xl mx-auto"
      >
        I enjoy blending <span className="font-semibold">creativity</span>,
        <span className="font-semibold"> innovation</span>, and
        <span className="font-semibold"> engineering</span> to build modern,
        scalable, and intelligent digital experiences.
      </motion.p>
    </div>
  );
}
