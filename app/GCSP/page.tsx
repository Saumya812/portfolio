"use client";

import { motion } from "framer-motion";

export default function GCSPPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const experiences = [
    {
      title: "Broke2Broker - AI-Driven Financial Mentorship",
      color: "bg-blue-500",
      summary:
        "Developed a platform providing students and young professionals with personalized investment guidance, interactive mentorship, and real-time market insights.",
      reflection:
        "Reflection: Directly aligns with GCSP learning objectives by combining research, entrepreneurship, service, interdisciplinary thinking, and global perspective.",
    },
    {
      title: "BizChat & Other AI Projects",
      color: "bg-purple-500",
      summary:
        "Built AI-powered business plan assistants, interactive web tools, and educational applications, demonstrating creativity, interdisciplinary problem-solving, and technological innovation.",
      reflection:
        "Reflection: These projects developed research skills, creative thinking, and ethical problem-solving abilities, connecting with GCSP objectives like innovative leadership and self-awareness.",
    },
    {
      title: "Teaching & Curriculum Development",
      color: "bg-green-500",
      summary:
        "Served as a Teaching Fellow and AI/ML curriculum developer, improving student learning experiences and creating structured, interactive educational materials.",
      reflection:
        "Reflection: Enhanced communication, teamwork, and leadership skills, fulfilling GCSP objectives in interdisciplinarity, service, and ethical innovation.",
    },
  ];

  return (
    <div className="relative max-w-6xl mx-auto p-6 space-y-20 text-gray-700">

      {/* Background Blobs */}
      <span className="absolute top-10 left-1/4 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite] -z-10"></span>
      <span className="absolute bottom-20 right-1/3 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite] -z-10"></span>

      {/* Short Bio */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4 md:flex md:gap-8 items-center"
      >
        <div className="md:w-1/3">
          <img
            src="/images/myPIC.jpg"
            alt="Saumya Brahmbhatt"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="md:w-2/3 space-y-2">
          <p className="text-lg md:text-xl">
            I am <strong>Saumya Brahmbhatt</strong>, a Computer Science student at UMBC with a focus on Artificial Intelligence and Machine Learning. I am passionate about applying technology ethically to solve societal challenges in finance, education, and technology. My goal is to create innovative solutions that have meaningful real-world impact.
          </p>
        </div>
      </motion.div>

      {/* Grand Challenge */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative border-l-4 border-gray-300 pl-6 space-y-2"
      >
        <h2 className="text-3xl font-semibold text-gray-800">Chosen Grand Challenge</h2>
        <p>
          <strong>Advancing Personalized Learning:</strong> I chose this Grand Challenge because personalized education and financial literacy are critical for empowering young adults. By leveraging AI, I aim to provide students and young professionals with tailored guidance and resources to make informed financial and educational decisions.
        </p>
      </motion.div>

      {/* Motivation */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative border-l-4 border-gray-300 pl-6 space-y-2"
      >
        <h2 className="text-3xl font-semibold text-gray-800">Motivation</h2>
        <p>
          Participating in the GCSP merges technical innovation with societal impact. It allows me to explore interdisciplinary approaches, lead technology-driven initiatives, and develop solutions that positively affect communities. I aim to build skills in research, ethical leadership, teamwork, and global perspectives while applying creative and innovative approaches to complex societal challenges.
        </p>
      </motion.div>

      {/* Experience & Reflection */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-12"
      >
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Experience & Reflection
        </h2>

        <div className="relative border-l-2 border-gray-300 pl-8 space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="group relative cursor-pointer transition-transform transform hover:scale-105 hover:z-10"
            >
              {/* Timeline Dot */}
              <span
                className={`absolute -left-5 top-1 w-5 h-5 rounded-full ${exp.color} shadow-lg group-hover:animate-pulse flex items-center justify-center`}
              >
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </span>

              {/* Collapsible Card */}
              <details className="bg-gray-50 border border-gray-200 rounded-xl p-4 transition-all duration-500 overflow-hidden group-hover:shadow-xl">
                <summary className="font-semibold text-gray-800 flex items-center gap-3 cursor-pointer hover:text-gray-900">
                  {exp.title}
                </summary>
                <div className="mt-2 pl-4 border-l-2 border-gray-200 text-gray-600 space-y-2 transition-all duration-500 ease-in-out">
                  <p>{exp.summary}</p>
                  <p className="italic text-gray-500">{exp.reflection}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
