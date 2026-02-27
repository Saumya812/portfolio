"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const highlights = [
  { icon: "🎓", label: "UMBC Honors College" },
  { icon: "🤖", label: "AI & ML Specialization" },
  { icon: "🏆", label: "Graduated High Honors" },
  { icon: "📍", label: "Maryland, USA" },
  { icon: "💻", label: "B.S. Computer Science" },
  { icon: "🌍", label: "GCSP Scholar" },
];

const stats = [
  { value: "4.0", label: "GPA at HCC" },
  { value: "3+", label: "Research Projects" },
  { value: "2", label: "Leadership Roles" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" as const},
  }),
};

export default function AboutPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const spotY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      {/* Spotlight cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full"
        style={{
          width: 320,
          height: 320,
          x: spotX,
          y: spotY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative w-full overflow-hidden py-24 px-6 md:px-16"
        style={{ background: "#fdf8ff" }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(251,207,232,0.35) 0%, transparent 70%)",
            transform: "translate(20%, -20%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(233,213,255,0.3) 0%, transparent 70%)",
            transform: "translate(-20%, 20%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto space-y-20">

          {/* ── HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center space-y-5"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-pink-500 font-medium">
              Get to know me
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              About <span className="italic text-pink-600">Me</span>
            </h1>
            <motion.div
              className="mx-auto h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
          </motion.div>

          {/* ── MAIN: Photo + Text ── */}
          <div className="flex flex-col lg:flex-row items-center gap-14">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="lg:w-2/5 flex-shrink-0 flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="relative"
                style={{ width: "320px" }}
              >
                {/* Pink corner accents */}
                <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-pink-400 z-10" />
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-pink-400 z-10" />

                {/* Offset shadow */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "rgba(236,72,153,0.1)",
                    transform: "translate(10px, 10px)",
                    borderRadius: "1rem",
                  }}
                />

                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                  style={{ height: "420px" }}
                >
                  <Image
                    src="/images/profile.JPG"
                    alt="Saumya Brahmbhatt"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="lg:w-3/5 space-y-6"
            >
              {/* Hook */}
              <p className="text-2xl font-semibold text-gray-800 leading-snug">
                I build intelligent systems at the intersection of{" "}
                <span className="italic text-pink-600">creativity</span> and{" "}
                <span className="italic text-purple-500">logic</span>.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                I'm{" "}
                <strong className="text-gray-900">Saumya Brahmbhatt</strong>, a
                Computer Science student specializing in AI and Machine Learning.
                I graduated with an{" "}
                <strong className="text-gray-900">
                  A.S. in Computer Science with High Honors
                </strong>{" "}
                from Harford Community College, and I'm currently part of the{" "}
                <strong className="text-gray-900">Honors College at UMBC</strong>{" "}
                pursuing my B.S. in Computer Science.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                My work spans AI research, simulations, interactive applications,
                and creative computing — always with the goal of making technology
                more{" "}
                <em className="text-gray-800">
                  intuitive, human-centered, and impactful
                </em>
                .
              </p>

              {/* Stats */}
              <div className="flex gap-6 pt-2 flex-wrap">
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    className="text-center px-5 py-3 rounded-2xl border cursor-default transition-all duration-300"
                    style={{
                      background:
                        hoveredStat === i
                          ? "rgba(236,72,153,0.08)"
                          : "rgba(255,255,255,0.6)",
                      borderColor:
                        hoveredStat === i
                          ? "rgba(236,72,153,0.4)"
                          : "rgba(251,207,232,0.8)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    onHoverStart={() => setHoveredStat(i)}
                    onHoverEnd={() => setHoveredStat(null)}
                  >
                    <p className="text-3xl font-bold text-pink-600">{s.value}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── HIGHLIGHT PILLS ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {highlights.map((item, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-700 border border-pink-200 bg-white/70 backdrop-blur-sm shadow-sm cursor-default hover:bg-pink-50 hover:shadow-[0_0_12px_rgba(255,160,200,0.3)] transition-all duration-300"
              >
                <span>{item.icon}</span>
                {item.label}
              </motion.span>
            ))}
          </motion.div>

          {/* ── WHAT DRIVES ME ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative bg-white/60 backdrop-blur-sm border border-pink-100 rounded-3xl p-10 shadow-md hover:shadow-[0_0_20px_rgba(255,160,200,0.2)] transition-shadow duration-300"
          >
            <div className="absolute -top-4 left-10 bg-pink-500 text-white text-xs font-semibold px-4 py-1 rounded-full tracking-wide uppercase">
              ✨ What Drives Me
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              I'm drawn to problems that sit at the edge of what's possible —
              where research meets real-world impact. Whether it's designing an AI
              that helps people make financial decisions, simulating physical
              systems, or building tools that make learning easier, I care about
              technology that <strong>means something to people</strong>.
            </p>
          </motion.div>

          {/* ── QUOTE ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center py-10 relative"
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-8xl text-pink-200 leading-none select-none font-serif">
              "
            </span>
            <blockquote className="text-2xl md:text-3xl text-gray-800 font-semibold italic relative z-10">
              Innovation happens where creativity meets logic.
            </blockquote>
            <motion.div
              className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "40%" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </motion.div>

        </div>
      </div>
    </>
  );
}