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
        "Reflection: I chose Personalized Learning Experience as my Grand Challenge because I believe education is most effective when it adapts to each learner. My project, Budget2Broker, puts this into practice by offering personalized financial plans, interactive tools, and AI-guided lessons to make financial literacy approachable—a skill often missing in traditional education. Working on it taught me that personalization is about empathy: understanding users, making complex ideas clear, and designing for confidence. GCSP helped me grow as a designer and problem solver, and inspired me to expand Budget2Broker with adaptive learning and more inclusive content, so it can truly empower people to understand and take control of their finances."
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
          <strong>Advancing Personalized Learning:</strong> I chose this Grand Challenge because I believe that learning should adapt to the needs, goals, and strengths of each individual. Personalized education and financial literacy are critical for empowering young adults to make informed decisions and take control of their futures. This challenge aligns with my passion for using technology and innovation to create tools and experiences that support people’s growth, help them navigate complex information, and build confidence in their abilities. It reflects my broader vision of making learning more meaningful, accessible, and human-centered.
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
          Participating in GCSP excites me because it combines technical innovation with the opportunity to make a real societal impact. I am motivated by the chance to explore interdisciplinary approaches, collaborate with peers from diverse backgrounds, and develop solutions that address pressing challenges in education and beyond. The program also offers invaluable mentorship and opportunities to learn from experienced professionals, which I see as a critical step in shaping my growth as a thinker, leader, and problem-solver. Through GCSP, I hope to build skills in research, ethical decision-making, teamwork, and global perspectives, while gaining guidance and connections that will help me create learning experiences and tools that empower others, foster curiosity, and help people reach their full potential.
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
