"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const experiences = [
  {
    title: "Adaptive Variational Quantum Reinforcement Learning",
    role: "Research Intern",
    company: "QuPIDC · Dr. Lei Zhang, UMBC",
    date: "Summer 2026",
    tag: "Quantum Computing",
    tagColor: "#7c6fcd",
    dot: "#a78bfa",
    stripe: "linear-gradient(180deg, #ddd6fe 0%, #c4b5fd 100%)",
    bullets: [
      "Developing an adaptive VQRL framework for dynamic portfolio optimization under Dr. Lei Zhang.",
      "Designing flexible VQC architecture with adaptive rotation axes, entanglement patterns, and circuit depth.",
      "Implementing multi-scale temporal modeling (5–60 day windows) with volatility-based rebalancing triggers.",
      "Modeling risk-aversion as a learnable, state-dependent function that dynamically shifts allocation strategies.",
      "Evaluating via Sharpe ratio, annualized return, and max drawdown across time-series cross-validation folds.",
    ],
  },
  {
    title: "AI/ML for Post-Quantum Computing",
    role: "Research Intern",
    company: "AIM-PQC Program",
    date: "Summer 2026",
    tag: "Post-Quantum AI",
    tagColor: "#0e7490",
    dot: "#67e8f9",
    stripe: "linear-gradient(180deg, #cffafe 0%, #a5f3fc 100%)",
    bullets: [
      "Investigating how machine learning methods apply to quantum-resilient computing architectures.",
      "Bridging quantum information science, computer science, and applied ML across research deliverables.",
      "Contributing to technical reports and presentations on quantum-resilient AI system design.",
    ],
  },
  {
    title: "BizChat — AI Business Plan Assistant",
    role: "Undergraduate Research Engineer",
    company: "University of Maryland, Baltimore County",
    date: "Sept 2025 – Present",
    tag: "Applied AI",
    tagColor: "#be185d",
    dot: "#f9a8d4",
    stripe: "linear-gradient(180deg, #fce7f3 0%, #fbcfe8 100%)",
    bullets: [
      "Built a web app helping small business owners create plans, informed by 4 workshops and 15 interviews.",
      "Applied HCI-driven design to improve accessibility 40% and reduce drafting time 60%.",
      "Integrated GPT-4 Turbo and Whisper-1 for real-time, section-level plan generation under 2s latency.",
    ],
  },
  {
    title: "Social & Ethnic Issues in Information Technology",
    role: "Teaching Fellow",
    company: "University of Maryland, Baltimore County",
    date: "March 2025 – Present",
    tag: "Education",
    tagColor: "#065f46",
    dot: "#6ee7b7",
    stripe: "linear-gradient(180deg, #d1fae5 0%, #a7f3d0 100%)",
    bullets: [
      "Assist faculty in course delivery, grading, and discussion facilitation for undergraduate IT students.",
      "Lead conversations on diversity, equity, and ethical issues in technology, fostering inclusive learning.",
      "Collaborate with faculty to develop inclusive course materials and classroom activities.",
    ],
  },
  {
    title: "AI/ML Curriculum Development",
    role: "Curriculum Development Intern",
    company: "Harford Community College, Maryland",
    date: "Sept 2025 – Present",
    tag: "EdTech",
    tagColor: "#92400e",
    dot: "#fcd34d",
    stripe: "linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)",
    bullets: [
      "Collaborated with faculty to design a new AI/ML track for credit and non-credit pathways.",
      "Co-developed course structures, learning outcomes, and skill modules covering Python, neural networks, and ML ethics.",
      "Researched 15+ AI/ML programs and prepared a curriculum proposal for Maryland state government consideration.",
    ],
  },
  {
    title: "Teaching Assistant",
    role: "Teaching Assistant",
    company: "Harford Community College",
    date: "April 2024 – May 2025",
    tag: "Teaching",
    tagColor: "#1e40af",
    dot: "#93c5fd",
    stripe: "linear-gradient(180deg, #dbeafe 0%, #bfdbfe 100%)",
    bullets: [
      "Assisted 200+ students across C/C++, Java, Physics, Chemistry, and Mathematics coursework.",
      "Supported the Learning Center and promoted CRLA Certification Training program.",
    ],
  },
];

const yearGroups = [
  { year: "2026", range: [0, 2] },
  { year: "2025", range: [2, 5] },
  { year: "2024", range: [5, 6] },
];

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative"
    >
      <motion.div
        animate={{ y: hovered ? -3 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        onClick={() => setExpanded(!expanded)}
        className="relative cursor-pointer rounded-2xl overflow-hidden flex"
        style={{
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: hovered
            ? "1px solid rgba(0,0,0,0.12)"
            : "1px solid rgba(0,0,0,0.07)",
          boxShadow: hovered
            ? "0 8px 32px rgba(0,0,0,0.09), 0 1px 2px rgba(0,0,0,0.04)"
            : "0 2px 8px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
          transition: "border 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        {/* Left color stripe */}
        <div
          className="w-1 shrink-0 rounded-l-2xl"
          style={{ background: exp.stripe }}
        />

        <div className="flex-1 px-6 py-5">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Tag + date */}
              <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                <span
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-md"
                  style={{
                    background: `${exp.dot}22`,
                    color: exp.tagColor,
                    border: `1px solid ${exp.dot}55`,
                    letterSpacing: "0.04em",
                  }}
                >
                  {exp.tag}
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color: "#9ca3af" }}
                >
                  {exp.date}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-[15px] font-semibold leading-snug mb-1.5"
                style={{ color: "#111827" }}
              >
                {exp.title}
              </h3>

              {/* Role · Company */}
              <p className="text-sm" style={{ color: "#6b7280" }}>
                <span style={{ color: "#374151", fontWeight: 500 }}>
                  {exp.role}
                </span>{" "}
                ·{" "}
                {exp.company}
              </p>
            </div>

            {/* Expand icon */}
            <motion.div
              animate={{
                rotate: expanded ? 45 : 0,
                backgroundColor: expanded ? `${exp.dot}33` : "transparent",
              }}
              transition={{ duration: 0.25 }}
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{
                border: `1px solid ${hovered || expanded ? exp.dot : "#e5e7eb"}`,
                color: hovered || expanded ? exp.tagColor : "#9ca3af",
                fontSize: 18,
                lineHeight: 1,
                transition: "border 0.25s, color 0.25s",
              }}
            >
              +
            </motion.div>
          </div>

          {/* Expandable content */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div
                  className="mt-4 pt-4 space-y-2.5"
                  style={{ borderTop: "1px solid #f3f4f6" }}
                >
                  {exp.bullets.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055, duration: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className="mt-[7px] shrink-0 rounded-full"
                        style={{
                          width: 5,
                          height: 5,
                          background: exp.dot,
                        }}
                      />
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#4b5563" }}
                      >
                        {b}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed hint */}
          {!expanded && (
            <motion.p
              animate={{ opacity: hovered ? 0.7 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs mt-2 font-medium"
              style={{ color: exp.tagColor }}
            >
              {exp.bullets.length} highlights — click to expand
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden py-24 px-6 md:px-16"
      style={{
        background:
          "linear-gradient(145deg, #fdf8ff 0%, #f8f4fe 30%, #f0f9ff 65%, #fdf2f8 100%)",
      }}
    >
      {/* Subtle ambient blobs — muted, not glowing */}
      <div
        className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(221,214,254,0.4) 0%, transparent 65%)",
          transform: "translate(25%, -25%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(207,250,254,0.35) 0%, transparent 65%)",
          transform: "translate(-25%, 25%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(252,231,243,0.3) 0%, transparent 65%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.22em] mb-3"
            style={{ color: "#a78bfa" }}
          >
            Career & Research
          </p>

          <h1
            className="text-5xl md:text-6xl font-bold leading-tight"
            style={{
              color: "#1f2937",
              letterSpacing: "-0.025em",
            }}
          >
            Experience
          </h1>

          {/* Slim accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 56 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="mt-4 h-0.5 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #c4b5fd, #f9a8d4)",
            }}
          />

          <p
            className="mt-4 text-sm"
            style={{ color: "#9ca3af" }}
          >
            Click any card to expand details
          </p>
        </motion.div>

        {/* ── YEAR GROUPS ── */}
        <div className="space-y-1">
          {yearGroups.map((group, gi) => (
            <div key={group.year}>
              {/* Year row */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: gi * 0.05 }}
                className="flex items-center gap-3 mb-3 mt-10 first:mt-0"
              >
                <span
                  className="text-xs font-bold font-mono tracking-widest"
                  style={{ color: "#c4b5fd" }}
                >
                  {group.year}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(196,181,253,0.4), transparent)",
                  }}
                />
              </motion.div>

              {/* Cards */}
              <div className="space-y-3">
                {experiences
                  .slice(group.range[0], group.range[1])
                  .map((exp, i) => (
                    <ExperienceCard
                      key={group.range[0] + i}
                      exp={exp}
                      index={group.range[0] + i}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 pt-8 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
        >
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#6ee7b7" }}
            />
            <p className="text-sm" style={{ color: "#9ca3af" }}>
              Actively researching · Open to collaboration
            </p>
          </div>

          <p className="text-xs font-mono" style={{ color: "#d1d5db" }}>
            {experiences.length} roles
          </p>
        </motion.div>

      </div>
    </div>
  );
}