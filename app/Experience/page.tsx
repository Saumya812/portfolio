"use client";

import { motion } from "framer-motion";

export default function ExperienceSection() {
  const experiences = [

    {
      title: "Undergrad Research Engineer – BizChat",
      company: "University of Maryland, Balitmore County",
      date: "Sept 2025 – Present",
      bullets: [
        "Built a web app helping small business owners create business plans informed by 4 workshops and 15 interviews.",
        "Applied HCI-driven design to improve accessibility 40% and reduce drafting time 60%.",
        "Integrated GPT-4 Turbo and Whisper-1 for real-time, section-level business plan generation (< 2s latency).",
      ],
    },

    {
      title: "Teaching Fellow – Social / Ethnic Issues in IT",
      company: "University of Maryland, Baltimore County",
      date: "March 2025 – Present",
      bullets: [
        "Assist faculty in course delivery, grading, and discussion facilitation for undergraduate IT students.",
        "Lead conversations on diversity, equity, and ethical issues in technology, fostering inclusive learning.",
        "Support student research projects and assignments, enhancing critical thinking and analytical skills.",
        "Collaborate with faculty to develop inclusive course materials and classroom activities.",
      ],
    },
    {
      title: "AI/ML Curriculum Development Intern",
      company: "Harford Community College, Baltimore, MD",
      date: "Sept 2025 – Present",
      bullets: [
        "Collaborated with faculty to design a new AI/ML track for credit and non-credit pathways.",
        "Co-developed course structures, learning outcomes, and skill modules (Python, neural networks, ML ethics).",
        "Led curriculum development via Git and researched 15+ AI/ML programs for a Maryland state proposal.",
      ],
    },
    {
      title: "Teaching Assistant",
      company: "Harford Community College",
      date: "April 2024 – May 2025",
      bullets: [
        "Assisted 200+ students in programming C/C++, Java, Physics, Chemistry, and Math.",
        "Supported the Learning Center and promoted CRLA Certification Training.",
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-20">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
        My Experience
      </h1>

      <div className="relative border-l-4 border-gray-300 ml-4">
        {experiences.map((exp, idx) => {
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
              {/* Circle Timeline Marker */}
              

              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -3 }}
                transition={{ type: "spring", stiffness: 180 }}
                className="bg-gray-50 border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-2xl flex-1 md:mx-6"
              >
                <h2 className="text-2xl font-bold text-gray-900">{exp.title}</h2>
                <h3 className="text-gray-600 font-medium mb-2">{exp.company}</h3>
                <p className="text-gray-500 mb-4">{exp.date}</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Skills Highlight */}
      {/*
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Key Skills
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {["Artificial Intelligence", "Machine Learning", "API Usage", "Object-Oriented Programming"].map(
            (skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="px-5 py-2 bg-gray-200 rounded-full text-gray-800 font-medium shadow hover:shadow-lg cursor-pointer transition-all duration-300"
              >
                {skill}
              </motion.div>
            )
          )}
        </div>
      </div>
      */}
    </div>
  );
}
