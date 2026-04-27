"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const experiences = [
  {
    title: "Broke2Broker — AI-Driven Financial Mentorship",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.07)",
    border: "rgba(59,130,246,0.25)",
    icon: "💹",
    summary:
      "Developed a platform providing students and young professionals with personalized investment guidance, interactive mentorship, and real-time market insights.",
    reflection:
      "I chose Personalized Learning Experience as my Grand Challenge because I believe education is most effective when it adapts to each learner. My project puts this into practice by offering personalized financial plans, interactive tools, and AI-guided lessons to make financial literacy approachable — a skill often missing in traditional education. Working on it taught me that personalization is about empathy: understanding users, making complex ideas clear, and designing for confidence. GCSP inspired me to expand it with adaptive learning and more inclusive content, so it can truly empower people to understand and take control of their finances.",
  },
  {
    title: "BizChat & Other AI Projects",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.07)",
    border: "rgba(168,85,247,0.25)",
    icon: "🤖",
    summary:
      "Built AI-powered business plan assistants, interactive web tools, and educational applications — demonstrating creativity, interdisciplinary problem-solving, and technological innovation.",
    reflection:
      "These projects developed research skills, creative thinking, and ethical problem-solving abilities, connecting with GCSP objectives like innovative leadership and self-awareness.",
  },
  {
    title: "Teaching & Curriculum Development",
    color: "#10b981",
    bg: "rgba(16,185,129,0.07)",
    border: "rgba(16,185,129,0.25)",
    icon: "📚",
    summary:
      "Served as a Teaching Fellow and AI/ML curriculum developer, improving student learning experiences and creating structured, interactive educational materials.",
    reflection:
      "Enhanced communication, teamwork, and leadership skills, fulfilling GCSP objectives in interdisciplinarity, service, and ethical innovation.",
  },
];

const gcspPillars = [
  { title: "Research", icon: "🔬", desc: "Engaged in research addressing a Grand Challenge" },
  { title: "Interdisciplinary", icon: "🔀", desc: "Bridged technical + social dimensions" },
  { title: "Entrepreneurship", icon: "🚀", desc: "Innovation thinking applied to GCs" },
  { title: "Global Dimension", icon: "🌐", desc: "Cross-cultural international perspective" },
  { title: "Service Learning", icon: "❤️", desc: "Giving back through engineering" },
];

const romeHighlights = [
  { icon: "🏛️", label: "Vatican City", desc: "Presented research at global convening" },
  { icon: "🌍", label: "Grand Challenges Summit", desc: "Connected with GCSP scholars worldwide" },
  { icon: "🤝", label: "NAE Partnership", desc: "National Academy of Engineering network" },
  { icon: "💡", label: "Grand Challenges", desc: "14 engineering challenges for the 21st century" },
  { icon: "📸", label: "Rome, Italy", desc: "An unforgettable global experience" },
  { icon: "🎓", label: "GCSP Scholar", desc: "GCSP Affiliate at UMBC" },
];

const romePhotos = [
  { src: "/images/Pic1.jpeg", alt: "Rome conference", span: "row-span-2" },
  { src: "/images/Pic2.jpeg", alt: "Vatican City", span: "" },
  { src: "/images/Pic3.jpeg", alt: "NAE Summit", span: "" },
  { src: "/images/Pic6.jpeg", alt: "Grand Challenges", span: "col-span-2" },
  { src: "/images/Pic5.jpeg", alt: "Rome, Italy", span: "" },
  { src: "/images/Pic4.jpeg", alt: "GCSP Scholars", span: "row-span-2" },
  { src: "/images/Pic7.jpeg", alt: "GCSP Scholars", span: "" },
  { src: "/images/Pic8.jpeg", alt: "GCSP Scholars", span: "" },
  { src: "/images/Pic9.jpeg", alt: "GCSP Scholars", span: "col-span-2" },
  { src: "/images/Pic10.jpeg", alt: "GCSP Scholars", span: "" },
  { src: "/images/Pic11.jpeg", alt: "GCSP Scholars", span: "" },
  { src: "/images/Pic12.jpeg", alt: "GCSP Scholars", span: "row-span-2" },
  { src: "/images/Pic14.jpeg", alt: "GCSP Scholars", span: "" },
  { src: "/images/Pic15.jpeg", alt: "GCSP Scholars", span: "" },
  { src: "/images/Pic16.jpeg", alt: "GCSP Scholars", span: "row-span-2" },
];

const floatingOrbs = [
  { size: 300, top: "3%", left: "70%", color: "rgba(251,191,36,0.08)", delay: 0 },
  { size: 220, top: "35%", left: "2%", color: "rgba(236,72,153,0.06)", delay: 2 },
  { size: 180, top: "68%", left: "75%", color: "rgba(124,58,237,0.05)", delay: 4 },
  { size: 150, top: "88%", left: "20%", color: "rgba(59,130,246,0.06)", delay: 1.5 },
];

export default function GCSPRomePage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 70, damping: 18 });
  const spotY = useSpring(mouseY, { stiffness: 70, damping: 18 });
  const [openExp, setOpenExp] = useState<number | null>(null);
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight" && lightbox !== null)
        setLightbox((lightbox + 1) % romePhotos.length);
      if (e.key === "ArrowLeft" && lightbox !== null)
        setLightbox((lightbox - 1 + romePhotos.length) % romePhotos.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <>
      {/* Spotlight cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full"
        style={{
          width: 380,
          height: 380,
          x: spotX,
          y: spotY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Lightbox */}
      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setLightbox(null)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="relative max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={romePhotos[lightbox].src}
              alt={romePhotos[lightbox].alt}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              ✕
            </button>
            {/* Prev */}
            <button
              onClick={() => setLightbox((lightbox - 1 + romePhotos.length) % romePhotos.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              ‹
            </button>
            {/* Next */}
            <button
              onClick={() => setLightbox((lightbox + 1) % romePhotos.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              ›
            </button>
            {/* Counter */}
            <p className="text-center text-white/50 text-sm mt-3">
              {lightbox + 1} / {romePhotos.length}
            </p>
          </motion.div>
        </motion.div>
      )}

      <div
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fffbeb 0%, #fdf4ff 50%, #ffe4e6 100%)" }}
      >
        {/* Floating orbs */}
        {floatingOrbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              left: orb.left,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            }}
            animate={{ y: [0, -18, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
          />
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-20 space-y-28">

          {/* ── HERO ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center space-y-5"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-2"
              style={{
                background: "rgba(251,191,36,0.15)",
                color: "#b45309",
                border: "1px solid rgba(251,191,36,0.35)",
              }}
            >
              <span>🌍</span> Grand Challenges Scholars Program
            </motion.div>

            <h1
              className="text-5xl md:text-7xl font-bold leading-tight"
              style={{
                background: "linear-gradient(135deg, #b45309 0%, #ec4899 50%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              GCSP 
            </h1>

            <motion.div
              className="mx-auto h-px"
              initial={{ width: 0 }}
              animate={{ width: "55%" }}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{ background: "linear-gradient(90deg, transparent, #f59e0b, #ec4899, transparent)" }}
            />

            <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
              Representing UMBC at the NAE Grand Challenges Scholars Program convening in <em>Rome, Italy</em>
            </p>
          </motion.div>

          {/* ── BIO ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="md:w-2/5 flex-shrink-0 relative"
              style={{ maxWidth: 300 }}
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400 z-10" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-pink-400 z-10" />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: "rgba(251,191,36,0.1)", transform: "translate(8px, 8px)", borderRadius: "1rem" }}
              />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ height: 380 }}>
                <img
                  src="/images/myPIC.jpg"
                  alt="Saumya Brahmbhatt"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>

            <div className="md:w-3/5 space-y-4">
              <p className="text-2xl font-semibold text-gray-800 leading-snug">
                Engineering with <span className="italic text-amber-600">purpose</span> and{" "}
                <span className="italic text-pink-600">empathy</span>.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                I am <strong className="text-gray-900">Saumya Brahmbhatt</strong>, a Computer Science student at UMBC
                with a focus on Artificial Intelligence and Machine Learning. I am passionate about applying technology
                ethically to solve societal challenges in finance, education, and technology. My goal is to create
                innovative solutions that have meaningful real-world impact.
              </p>
            </div>
          </motion.div>

          {/* ── GRAND CHALLENGE ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative p-10 rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(251,191,36,0.2)",
              boxShadow: "0 20px 60px rgba(251,191,36,0.06)",
            }}
          >
            <div
              className="absolute -top-4 left-8 px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
              style={{ background: "linear-gradient(135deg, #f59e0b, #ec4899)", color: "white" }}
            >
              Chosen Grand Challenge
            </div>
            <h2 className="text-xl font-bold text-amber-700 mb-3 mt-2">
              Advancing Personalized Learning
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              I chose this Grand Challenge because I believe that learning should adapt to the needs, goals, and
              strengths of each individual. Personalized education and financial literacy are critical for empowering
              young adults to make informed decisions and take control of their futures. This challenge aligns with my
              passion for using technology and innovation to create tools and experiences that support people's growth,
              help them navigate complex information, and build confidence in their abilities. It reflects my broader
              vision of making learning more meaningful, accessible, and human-centered.
            </p>
          </motion.div>

          {/* ── MOTIVATION ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative p-10 rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(236,72,153,0.15)",
              boxShadow: "0 20px 60px rgba(236,72,153,0.05)",
            }}
          >
            <div
              className="absolute -top-4 left-8 px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
              style={{ background: "linear-gradient(135deg, #ec4899, #7c3aed)", color: "white" }}
            >
              Motivation
            </div>
            <p className="text-gray-600 text-base leading-relaxed mt-2">
              Participating in GCSP excites me because it combines technical innovation with the opportunity to make a
              real societal impact. I am motivated by the chance to explore interdisciplinary approaches, collaborate
              with peers from diverse backgrounds, and develop solutions that address pressing challenges in education
              and beyond. The program also offers invaluable mentorship and opportunities to learn from experienced
              professionals, which I see as a critical step in shaping my growth as a thinker, leader, and
              problem-solver. Through GCSP, I hope to build skills in research, ethical decision-making, teamwork, and
              global perspectives, while gaining guidance and connections that will help me create learning experiences
              and tools that empower others, foster curiosity, and help people reach their full potential.
            </p>
          </motion.div>

          {/* ── EXPERIENCE & REFLECTION ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-pink-500 mb-3 font-semibold">Projects & Impact</p>
              <h2 className="text-4xl font-bold text-gray-900">Experience & Reflection</h2>
            </div>

            <div className="relative">
              <div
                className="absolute left-6 top-0 bottom-0 w-0.5"
                style={{ background: "linear-gradient(180deg, #f59e0b, #ec4899, #7c3aed)" }}
              />
              <div className="space-y-6 pl-16">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.6 }}
                    className="relative"
                  >
                    <motion.div
                      className="absolute -left-10 top-5 w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center"
                      style={{ background: exp.color }}
                      animate={openExp === i ? { scale: 1.4 } : { scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 4 }}
                      onClick={() => setOpenExp(openExp === i ? null : i)}
                      className="cursor-pointer rounded-2xl p-6 transition-all duration-300"
                      style={{
                        background: openExp === i ? exp.bg : "rgba(255,255,255,0.55)",
                        backdropFilter: "blur(16px)",
                        border: openExp === i ? `1px solid ${exp.border}` : "1px solid rgba(255,255,255,0.5)",
                        boxShadow: openExp === i ? `0 12px 40px ${exp.bg}` : "none",
                      }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl flex-shrink-0">{exp.icon}</span>
                          <h3 className="text-base font-bold text-gray-900">{exp.title}</h3>
                        </div>
                        <motion.span
                          animate={{ rotate: openExp === i ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-400 flex-shrink-0 text-sm"
                        >
                          ▾
                        </motion.span>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{ height: openExp === i ? "auto" : 0, opacity: openExp === i ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          className="mt-4 pt-4 space-y-3"
                          style={{ borderTop: `1px solid ${exp.border}` }}
                        >
                          <p className="text-sm text-gray-600 leading-relaxed">{exp.summary}</p>
                          <p
                            className="text-sm text-gray-500 leading-relaxed italic"
                            style={{ borderLeft: `3px solid ${exp.color}`, paddingLeft: "12px" }}
                          >
                            {exp.reflection}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── ROME DIVIDER ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex items-center gap-6"
          >
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.4))" }} />
            <span className="text-2xl">🏛️</span>
            <div className="flex flex-col items-center">
              <p className="text-xs uppercase tracking-widest font-bold text-amber-700">Rome, Italy</p>
              <p className="text-xs text-gray-400">NAE GCSP Global Convening</p>
            </div>
            <span className="text-2xl">✈️</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(236,72,153,0.4), transparent)" }} />
          </motion.div>

          {/* ── FIVE PILLARS ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-amber-600 mb-3 font-semibold">Program competencies</p>
              <h2 className="text-4xl font-bold text-gray-900">The Five Pillars</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {gcspPillars.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -6, scale: 1.04 }}
                  onHoverStart={() => setHoveredPillar(i)}
                  onHoverEnd={() => setHoveredPillar(null)}
                  className="p-5 rounded-2xl text-center cursor-default"
                  style={{
                    background: hoveredPillar === i ? "rgba(251,191,36,0.1)" : "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(16px)",
                    border: hoveredPillar === i ? "1px solid rgba(251,191,36,0.4)" : "1px solid rgba(255,255,255,0.5)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <span className="text-2xl block mb-3">{p.icon}</span>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{p.title}</h3>
                  <p className="text-xs text-gray-500 leading-snug">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── ROME HIGHLIGHTS ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-pink-500 mb-3 font-semibold">The Experience</p>
              <h2 className="text-4xl font-bold text-gray-900">Rome Conference Highlights</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {romeHighlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="flex items-start gap-4 p-6 rounded-2xl cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.5)",
                  }}
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">{item.label}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── PHOTO COLLAGE ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-purple-500 mb-3 font-semibold">Memories ⭐</p>
              <h2 className="text-4xl font-bold text-gray-900">From Rome</h2>
              <p className="text-sm text-gray-400 mt-2">Click any photo to view full size</p>
            </div>

            {/* Masonry-style collage using CSS columns */}
            <div
              style={{
                columns: "3",
                columnGap: "12px",
              }}
              className="[&>*]:break-inside-avoid"
            >
              {romePhotos.map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  onClick={() => setLightbox(i)}
                  className="relative overflow-hidden rounded-xl cursor-pointer mb-3 group"
                  style={{
                    border: "2px solid rgba(255,255,255,0.7)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-auto block"
                    onError={(e) => {
                      (e.target as HTMLImageElement).closest("div")!.style.display = "none";
                    }}
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.3)" }}
                  >
                    <span className="text-white text-2xl">🔍</span>
                  </div>
                  {/* Gradient shimmer at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.4))" }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── CLOSING QUOTE ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-center py-12 relative"
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-8xl text-amber-200 leading-none select-none font-serif">
              "
            </span>
            <blockquote className="text-2xl md:text-3xl text-gray-800 font-semibold italic relative z-10 max-w-2xl mx-auto">
              Engineering is not just about building things — it's about building a better world.
            </blockquote>
            <motion.div
              className="mx-auto mt-6 h-px"
              initial={{ width: 0 }}
              whileInView={{ width: "40%" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ background: "linear-gradient(90deg, transparent, #f59e0b, transparent)" }}
            />
            <p className="text-sm text-gray-400 mt-4">— Grand Challenges Scholars Program ethos</p>
          </motion.div>

        </div>
      </div>
    </>
  );
}