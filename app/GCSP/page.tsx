"use client";

import { motion } from "framer-motion";

export default function GCSPPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative max-w-6xl mx-auto p-6 space-y-20 text-gray-700">

      {/* Background Tech Blobs */}
      <span className="absolute top-10 left-1/4 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl animate-slow-pulse -z-10"></span>
      <span className="absolute bottom-20 right-1/3 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-slow-pulse -z-10"></span>

      {/* Short Bio */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4 md:flex md:gap-8 items-center"
      >
        {/* Scholar Photo Placeholder */}
        <div className="md:w-1/3">
          <img
            src="/images/myPIC.jpg"
            alt="Saumya Brahmbhatt"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Bio */}
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

      {/* Experience Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-12"
      >
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Experience & Reflection</h2>

        {/* Timeline */}
        <div className="relative border-l-2 border-gray-300 pl-8 space-y-12">

          {/* Broke2Broker */}
          <div className="relative">
            <span className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-blue-500"></span>
            <p className="font-semibold text-gray-800">Broke2Broker - AI-Driven Financial Mentorship</p>
            <p className="text-gray-600">
              Developed a platform providing students and young professionals with personalized investment guidance, interactive mentorship, and real-time market insights. This experience strengthened my AI/ML development, ethical problem-solving, and interdisciplinary project skills.
            </p>
            <p className="italic text-gray-500 mt-1">
              Reflection: Directly aligns with GCSP learning objectives by combining research, entrepreneurship, service, interdisciplinary thinking, and global perspective. I honed skills in teamwork, ethical leadership, and creative problem-solving while addressing real societal needs.
            </p>
          </div>

          {/* Other Projects */}
          <div className="relative">
            <span className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-purple-500"></span>
            <p className="font-semibold text-gray-800">BizChat & Other AI Projects</p>
            <p className="text-gray-600">
              Built AI-powered business plan assistants, interactive web tools, and educational applications, demonstrating creativity, interdisciplinary problem-solving, and technological innovation.
            </p>
            <p className="italic text-gray-500 mt-1">
              Reflection: These projects developed research skills, creative thinking, and ethical problem-solving abilities, connecting with GCSP objectives like innovative leadership and self-awareness.
            </p>
          </div>

          {/* Teaching & Curriculum Development */}
          <div className="relative">
            <span className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-green-500"></span>
            <p className="font-semibold text-gray-800">Teaching & Curriculum Development</p>
            <p className="text-gray-600">
              Served as a Teaching Fellow and AI/ML curriculum developer, improving student learning experiences and creating structured, interactive educational materials.
            </p>
            <p className="italic text-gray-500 mt-1">
              Reflection: Enhanced communication, teamwork, and leadership skills, fulfilling GCSP objectives in interdisciplinarity, service, and ethical innovation.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
