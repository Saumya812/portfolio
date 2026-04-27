"use client";

import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const techStack = [
  { name: "Python FastAPI", icon: "🐍", color: "#f0fdf4", border: "#86efac" },
  { name: "LangGraph", icon: "🕸️", color: "#fdf4ff", border: "#e879f9" },
  { name: "Next.js 15", icon: "▲", color: "#f0f9ff", border: "#7dd3fc" },
  { name: "TypeScript", icon: "🔷", color: "#eff6ff", border: "#93c5fd" },
  { name: "Gemini 2.5 Flash", icon: "✨", color: "#fefce8", border: "#fde047" },
  { name: "Claude Sonnet", icon: "🤖", color: "#fff7ed", border: "#fdba74" },
  { name: "K2 Legal Model", icon: "⚖️", color: "#fdf2f8", border: "#f0abfc" },
];

const agents = [
  { title: "Document Parser", desc: "Detects headings with 3 regex strategies + DOCX style metadata", icon: "📄", step: "01" },
  { title: "Clause Extraction", desc: "CTA-specific taxonomy: Publication Rights, Subject Injury, Protocol Deviations", icon: "🔍", step: "02" },
  { title: "Risk Identification", desc: "Hybrid rule-based + LLM analysis with RED/YELLOW/GREEN scoring", icon: "⚠️", step: "03" },
  { title: "Compliance Check", desc: "Flags missing required clauses as compliance findings", icon: "✅", step: "04" },
  { title: "Suggestion Generator", desc: "Produces negotiation-ready redlines with git-style diffs", icon: "✍️", step: "05" },
];

const stats = [
  { value: "100", label: "days avg. to finalize CTAs", accent: "#f43f5e" },
  { value: "$1.4M", label: "lost pipeline value / day", accent: "#a855f7" },
  { value: "400K+", label: "active clinical trials globally", accent: "#3b82f6" },
  { value: "50M", label: "patients waiting for trials", accent: "#ec4899" },
];

const floatingOrbs = [
  { size: 280, top: "5%", left: "75%", color: "rgba(168,85,247,0.08)", delay: 0 },
  { size: 200, top: "55%", left: "5%", color: "rgba(236,72,153,0.07)", delay: 1.5 },
  { size: 160, top: "80%", left: "80%", color: "rgba(99,102,241,0.06)", delay: 3 },
];

export default function ActaAIPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 60, damping: 15 });
  const spotY = useSpring(mouseY, { stiffness: 60, damping: 15 });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);

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
      {/* Spotlight */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full"
        style={{
          width: 400,
          height: 400,
          x: spotX,
          y: spotY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
        }}
      />

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fdf4ff 0%, #f0f9ff 50%, #fdf2f8 100%)" }}
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
            animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
          />
        ))}

        {/* ── HERO ── */}
        <motion.section
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase"
            style={{ background: "rgba(168,85,247,0.12)", color: "#7c3aed", border: "1px solid rgba(168,85,247,0.25)" }}
          >
            <span>🏆</span> HackPrinceton'26 · Team Project
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold mb-6 leading-none"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ACTA AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed mb-6"
          >
            Full-stack multi-agent contract intelligence platform for Clinical Trial Agreements
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="mx-auto h-px mb-10"
            style={{ background: "linear-gradient(90deg, transparent, #a855f7, #ec4899, transparent)" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-gray-500 max-w-xl italic"
          >
            "50 million patients are waiting to enroll in clinical trials — not because the science isn't ready, but because lawyers are still negotiating paperwork."
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-10"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-purple-300 flex items-start justify-center pt-1.5">
              <div className="w-1.5 h-3 rounded-full bg-purple-400" />
            </div>
          </motion.div>
        </motion.section>

        {/* ── STATS ── */}
        <section className="relative px-6 md:px-16 py-20">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="relative text-center p-6 rounded-3xl backdrop-blur-sm"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  boxShadow: `0 8px 32px rgba(0,0,0,0.06)`,
                }}
              >
                <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: s.accent }}>{s.value}</p>
                <p className="text-xs text-gray-500 leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── THE PROBLEM ── */}
        <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-10 rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(168,85,247,0.15)",
              boxShadow: "0 20px 60px rgba(168,85,247,0.08)",
            }}
          >
            <div
              className="absolute -top-4 left-8 px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
              style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)", color: "white" }}
            >
              The Problem
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mt-2">
              Clinical Trial Agreements take an average of <strong className="text-purple-700">100 days</strong> to finalize — costing{" "}
              <strong className="text-pink-600">$800K–$1.4M in lost pipeline value per day</strong>. Lawyers negotiate the same clauses across the same contract types, manually, every time. For Regeneron alone with 56 active programs, cutting negotiation time by 50 days unlocks{" "}
              <strong className="text-purple-700">$2.24 billion</strong> in pipeline value — and gets patients into trials two months sooner.
            </p>
          </motion.div>
        </section>

        {/* ── PIPELINE ── */}
        <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs uppercase tracking-widest text-purple-500 mb-3 font-semibold">Architecture</p>
            <h2 className="text-4xl font-bold text-gray-900">4-Stage LangGraph Pipeline</h2>
          </motion.div>

          <div className="relative">
            {/* Connector line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 hidden md:block"
              style={{ background: "linear-gradient(180deg, #a855f7, #ec4899)", transform: "translateX(-50%)" }}
            />

            <div className="space-y-8">
              {agents.map((agent, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`relative flex items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  onHoverStart={() => setHoveredAgent(i)}
                  onHoverEnd={() => setHoveredAgent(null)}
                >
                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="md:w-5/12 p-6 rounded-2xl cursor-default"
                    style={{
                      background: hoveredAgent === i ? "rgba(168,85,247,0.08)" : "rgba(255,255,255,0.6)",
                      backdropFilter: "blur(16px)",
                      border: hoveredAgent === i ? "1px solid rgba(168,85,247,0.35)" : "1px solid rgba(255,255,255,0.5)",
                      transition: "all 0.3s ease",
                      boxShadow: hoveredAgent === i ? "0 12px 40px rgba(168,85,247,0.1)" : "none",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{agent.icon}</span>
                      <span className="text-xs font-bold tracking-widest" style={{ color: "#a855f7" }}>STEP {agent.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{agent.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{agent.desc}</p>
                  </motion.div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <motion.div
                      className="w-4 h-4 rounded-full z-10"
                      style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
                      animate={hoveredAgent === i ? { scale: 1.6 } : { scale: 1 }}
                    />
                  </div>

                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SMART ROUTER ── */}
        <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl text-center"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(236,72,153,0.06) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(168,85,247,0.2)",
            }}
          >
            <p className="text-xs uppercase tracking-widest text-purple-500 mb-4 font-semibold">Smart Model Router</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Right model. Right job. Every time.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { model: "K2 Legal", task: "Indemnification & IP clauses", desc: "Deep legal reasoning", color: "#7c3aed", bg: "rgba(124,58,237,0.07)" },
                { model: "Gemini 2.5 Flash", task: "Fast classification", desc: "High-speed clause sorting", color: "#0284c7", bg: "rgba(2,132,199,0.07)" },
                { model: "Claude Sonnet", task: "Rewrite tasks", desc: "Negotiation-ready language", color: "#ec4899", bg: "rgba(236,72,153,0.07)" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-5 rounded-2xl text-left"
                  style={{ background: item.bg, border: `1px solid ${item.color}30` }}
                >
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: item.color }}>{item.model}</p>
                  <p className="text-base font-semibold text-gray-800 mb-1">{item.task}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── TECH STACK ── */}
        <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-xs uppercase tracking-widest text-pink-500 mb-3 font-semibold">Built with</p>
            <h2 className="text-3xl font-bold text-gray-900">Tech Stack</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.08, y: -3 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-default"
                style={{
                  background: tech.color,
                  border: `1px solid ${tech.border}`,
                  color: "#374151",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span style={{ fontSize: 14 }}>{tech.icon}</span> {tech.name}
              </motion.span>
            ))}
          </div>
        </section>

        {/* ── FOOTER CTA ── */}
        <section className="px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-5xl md:text-6xl font-bold mb-4" style={{
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Built in 36 hours.
            </p>
            <p className="text-xl text-gray-500 mb-8">We didn't sleep much. We have no regrets.</p>
            <p className="text-lg text-gray-600 italic max-w-lg mx-auto">
              "The patients can't wait."
            </p>
          </motion.div>
        </section>
      </div>
    </>
  );
}