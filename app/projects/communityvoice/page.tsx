"use client";

import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: "🌐",
    title: "Multilingual Intake, 24/7",
    desc: "Conversational AI intake in English, Spanish, French, Mandarin & Arabic. Voice input via Web Speech API — no app download needed.",
    color: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.3)",
    accent: "#059669",
  },
  {
    icon: "⚡",
    title: "Autonomous Resource Allocation",
    desc: "Gemini scans live inventory — food pantry bags, appointment slots, utility vouchers — and allocates the best match in real time. First-come, first-served.",
    color: "rgba(236,72,153,0.08)",
    border: "rgba(236,72,153,0.3)",
    accent: "#ec4899",
  },
  {
    icon: "🧑‍💼",
    title: "Human Supervision at Every Step",
    desc: "Staff dashboard powered by Firebase. Override any AI decision, escalate cases, restock inventory. Nothing is invisible. No allocation is irreversible.",
    color: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.3)",
    accent: "#6366f1",
  },
  {
    icon: "📊",
    title: "AI-Powered Analytics",
    desc: "Live breakdown of need types, language distribution, urgency patterns & daily volume trends. Gemini generates actionable recommendations every session.",
    color: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.35)",
    accent: "#d97706",
  },
];

const stats = [
  { value: "20–40", label: "minutes saved per intake", accent: "#10b981" },
  { value: "7+", label: "staff hours freed daily (20 intakes/day)", accent: "#ec4899" },
  { value: "5", label: "languages supported", accent: "#6366f1" },
  { value: "24/7", label: "available — even at 2am", accent: "#f59e0b" },
];

const techStack = [
  { name: "Gemini AI", icon: "✨", color: "rgba(254,243,199,0.8)", border: "#fcd34d" },
  { name: "Firebase Firestore", icon: "🔥", color: "rgba(255,237,213,0.8)", border: "#fb923c" },
  { name: "Google Maps API", icon: "🗺️", color: "rgba(209,250,229,0.8)", border: "#6ee7b7" },
  { name: "Google Translate API", icon: "🌍", color: "rgba(219,234,254,0.8)", border: "#93c5fd" },
  { name: "Web Speech API", icon: "🎙️", color: "rgba(237,233,254,0.8)", border: "#c4b5fd" },
  { name: "Google Cloud Run", icon: "☁️", color: "rgba(224,242,254,0.8)", border: "#7dd3fc" },
  { name: "Google Fonts", icon: "🔤", color: "rgba(252,231,243,0.8)", border: "#f9a8d4" },
];

const sdgs = [
  { num: "SDG 1", label: "No Poverty", color: "#dc2626" },
  { num: "SDG 2", label: "Zero Hunger", color: "#d97706" },
  { num: "SDG 3", label: "Good Health", color: "#16a34a" },
  { num: "SDG 10", label: "Reduced Inequalities", color: "#7c3aed" },
  { num: "SDG 17", label: "Partnerships", color: "#0284c7" },
];

const floatingOrbs = [
  { size: 300, top: "8%", left: "70%", color: "rgba(52,211,153,0.07)", delay: 0 },
  { size: 220, top: "60%", left: "3%", color: "rgba(236,72,153,0.06)", delay: 2 },
  { size: 180, top: "85%", left: "75%", color: "rgba(99,102,241,0.05)", delay: 4 },
];

export default function CommunityVoicePage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 60, damping: 15 });
  const spotY = useSpring(mouseY, { stiffness: 60, damping: 15 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

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
          background: "radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)",
        }}
      />

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #fdf4ff 50%, #eff6ff 100%)" }}
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
            transition={{ duration: 7 + i * 2, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
          />
        ))}

        {/* ── HERO ── */}
        <motion.section
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase"
            style={{ background: "rgba(52,211,153,0.12)", color: "#059669", border: "1px solid rgba(52,211,153,0.3)" }}
          >
            <span></span> Google Developer Solution Chalenege 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold mb-6 leading-none"
            style={{
              background: "linear-gradient(135deg, #059669 0%, #ec4899 50%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Community<br />Voice
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed mb-6"
          >
            From intake to resolution in <strong style={{ color: "#059669" }}>90 seconds</strong> — the world's first AI-powered nonprofit intake & resource allocation platform
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="mx-auto h-px mb-10"
            style={{ background: "linear-gradient(90deg, transparent, #10b981, #ec4899, transparent)" }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-3 text-sm text-gray-500"
          >
            {["🌐 5 Languages", "⚡ Real-time Allocation", "🤖 Gemini-powered", "🔥 Firebase backend", "☁️ Google Cloud Run"].map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-white/60 border border-white/50">{tag}</span>
            ))}
          </motion.div>

          <motion.div
            className="absolute bottom-10"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-emerald-300 flex items-start justify-center pt-1.5">
              <div className="w-1.5 h-3 rounded-full bg-emerald-400" />
            </div>
          </motion.div>
        </motion.section>

        {/* ── PROBLEM ── */}
        <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(52,211,153,0.2)",
              boxShadow: "0 20px 60px rgba(52,211,153,0.06)",
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ background: "linear-gradient(135deg, #059669, #6366f1)", color: "white" }}
            >
              The Problem
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              There are <strong className="text-emerald-700">1.9 million nonprofits</strong> in the US — but getting help to someone in crisis still means: phone call → paper form → manual triage → resource lookup → booking → callback → spreadsheet update. Over half of social workers report spending too much time on admin tasks. <strong className="text-pink-600">75% of nonprofit leaders</strong> say burnout is actively impairing their mission. Communities are waiting — not because resources don't exist, but because the systems connecting people to those resources are <em>broken</em>.
            </p>
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <section className="px-6 md:px-16 py-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center p-6 rounded-3xl cursor-default"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: s.accent }}>{s.value}</p>
                <p className="text-xs text-gray-500 leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs uppercase tracking-widest text-emerald-500 mb-3 font-semibold">What we built</p>
            <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onHoverStart={() => setHoveredFeature(i)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="p-7 rounded-3xl cursor-default"
                style={{
                  background: hoveredFeature === i ? f.color : "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(16px)",
                  border: hoveredFeature === i ? `1px solid ${f.border}` : "1px solid rgba(255,255,255,0.5)",
                  transition: "all 0.3s ease",
                  boxShadow: hoveredFeature === i ? `0 12px 40px ${f.color}` : "none",
                }}
              >
                <span className="text-3xl block mb-4" style={{ fontSize: 28 }}>{f.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                <div className="mt-4 h-0.5 rounded-full" style={{ background: f.border, width: "40%" }} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── HOW A CASE IS RESOLVED ── */}
        <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs uppercase tracking-widest text-pink-500 mb-3 font-semibold">The magic moment</p>
            <h2 className="text-4xl font-bold text-gray-900">90-Second Resolution</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {[
              { icon: "💬", label: "Natural conversation" },
              { icon: "→", label: "", connector: true },
              { icon: "🤖", label: "Gemini processes need" },
              { icon: "→", label: "", connector: true },
              { icon: "✅", label: "Resource allocated & confirmed" },
            ].map((step, i) => (
              step.connector ? (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center text-2xl text-emerald-300 hidden md:block"
                >
                  →
                </motion.div>
              ) : (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-5 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.5)", backdropFilter: "blur(12px)" }}
                >
                  <span className="block text-3xl mb-2" style={{ fontSize: 28 }}>{step.icon}</span>
                  <p className="text-sm font-medium text-gray-700">{step.label}</p>
                </motion.div>
              )
            ))}
          </div>
        </section>

        {/* ── SDG ALIGNMENT ── */}
        <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-xs uppercase tracking-widest text-indigo-500 mb-3 font-semibold">Impact</p>
            <h2 className="text-3xl font-bold text-gray-900">UN SDG Alignment</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {sdgs.map((sdg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.08, y: -3 }}
                className="px-5 py-2.5 rounded-2xl text-white text-center cursor-default"
                style={{ background: sdg.color }}
              >
                <p className="text-xs font-bold tracking-wider">{sdg.num}</p>
                <p className="text-xs opacity-90">{sdg.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-xs uppercase tracking-widest text-pink-500 mb-3 font-semibold">Google-native stack</p>
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
                style={{ background: tech.color, border: `1px solid ${tech.border}`, color: "#374151" }}
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
          >
            <p className="text-5xl md:text-6xl font-bold mb-4" style={{
              background: "linear-gradient(135deg, #059669, #ec4899, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              From intake to resolution.
            </p>
            <p className="text-xl text-gray-500 italic mt-4">In 90 seconds. In any language. At any hour.</p>
          </motion.div>
        </section>
      </div>
    </>
  );
}