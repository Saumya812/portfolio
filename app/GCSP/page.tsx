"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";

// ── PILLAR DATA (from proposals) ──────────────────────────────────────────────
const gcspPillars = [
  {
    title: "Research",
    icon: "🔬",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.3)",
    desc: "Engaged in research addressing a Grand Challenge",
    experience: {
      heading: "Post-Quantum Computing Research",
      subheading: "QuPIDC & AIM-PQC Summer Internships",
      level: "GOLD — 270+ hours",
      tieScore: "3 / 3 — Strongly Tied",
      summary:
        "My research experience consists of two complementary summer research engagements focused on post-quantum computing and its applications to AI and machine learning systems. The first is a summer research internship with QuPIDC (Quantum and Post-Quantum Innovation in Data and Computing), where I conduct supervised research under Prof. Lei Zhang, investigating how post-quantum cryptographic methods and quantum-informed algorithms can be applied to problems in computing, data security, and AI system design. The second component is a summer internship with AIM-PQC (AI and Machine Learning for Post-Quantum Computing), which situates post-quantum methods within AI/ML systems. Together these experiences provide a gold-level research commitment spanning May–August.",
      whyLinked:
        "Post-quantum computing and AI/ML systems are foundational technologies that will shape the future of personalized learning platforms. As personalized learning systems become more sophisticated, they will rely on secure data infrastructure, privacy-preserving AI models, and computationally efficient algorithms — all domains directly addressed by this research.",
      highlights: [
        "Submitted a formal research proposal to QuPIDC demonstrating independent initiative",
        "Working under Prof. Lei Zhang with immersion in quantum/PQC research culture",
        "Bridging quantum physics, computer science, and mathematics across AIM-PQC & QuPIDC",
        "Developing skills in formulating research questions, hypotheses, and technical writing",
        "Engaging with ethics of PQC — cybersecurity, data privacy, and AI reliability implications",
      ],
      challenges:
        "PQC is technically demanding, requiring background in linear algebra, number theory, and cryptography. Managing two simultaneous programs may create scheduling conflicts. Uncertainty inherent in frontier research demands resilience and adaptability.",
    },
  },
  {
    title: "Interdisciplinary",
    icon: "🔀",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.08)",
    border: "rgba(236,72,153,0.3)",
    desc: "Bridged technical + social dimensions",
    experience: {
      heading: "Numerical & Experimental Study of 1D Falling Disks",
      subheading: "Maryland Collegiate STEM Conference 2024 — Harford Community College",
      level: "GOLD / SILVER — ~168 hours",
      tieScore: "3 / 3 — Strongly Tied",
      summary:
        "This project required bridging three distinct disciplines: classical physics (aerodynamics, drag mechanics, free-fall dynamics), computational mathematics (numerical simulation via MATLAB's ode45 solver), and data science / experimental engineering (sensor automation via PASCO Capstone, statistical analysis in Excel). Neither discipline alone could produce meaningful results — the project's value came from integrating all three into a unified, mutually validating framework. I designed and ran 100+ high-accuracy time-of-flight trials achieving 99% timing accuracy, and developed a calibrated MATLAB model achieving <5% simulation error.",
      whyLinked:
        "Although grounded in physics, this project models the kind of inquiry-based, self-directed STEM learning that personalized learning frameworks seek to enable. The computational and data-analysis skills developed (MATLAB, sensor automation, statistical validation) are directly applicable to building and evaluating personalized learning technologies.",
      highlights: [
        "100+ experimental trials with 99% timing accuracy using PASCO Capstone sensors",
        "MATLAB ode45 numerical model achieving <5% error vs. real-world measurements",
        "Identified 6–11% velocity slowdown attributable to aerodynamic drag",
        "Presented at Maryland Collegiate STEM Conference 2024 to a multi-disciplinary audience",
        "Bridging strategy: iterative feedback loop — theory → simulation → experiment → back",
      ],
      challenges:
        "Maintaining experimental precision across 100+ trials, managing the PASCO/MATLAB interface, parameter-tuning ode45 to avoid overfitting, and crafting a narrative accessible across disciplinary backgrounds without sacrificing technical accuracy.",
    },
  },
  {
    title: "Entrepreneurship",
    icon: "🚀",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.3)",
    desc: "Innovation thinking applied to Grand Challenges",
    experience: {
      heading: "Budget2Broker — Alex Brown Idea & Innovation Challenge",
      subheading: "UMBC Fall 2026 — 4th Place, Innovation in Technology Track",
      level: "GOLD — Listed on GCSP website",
      tieScore: "2 / 3 — Moderately Tied",
      summary:
        "I co-developed and pitched Budget2Broker, a fintech platform designed to improve financial literacy and democratize access to investing tools for underserved and first-time investors. The platform bridges the gap between basic budgeting knowledge and more sophisticated investment strategies. The competition required developing a comprehensive business concept including market research, value proposition, financial modeling, and a polished pitch presentation — earning 4th place for innovation.",
      whyLinked:
        "Budget2Broker delivers a personalized learning experience in financial literacy, meeting users where they are and guiding them step-by-step toward greater financial competency — a direct embodiment of the Grand Challenge of Advance Personalized Learning. The Innovation in Technology recognition affirmed the genuine creativity of our approach.",
      highlights: [
        "4th place — Innovation in Technology track, Alex Brown Idea & Innovation Challenge",
        "Developed full business concept: market research, value proposition, financial modeling",
        "Applied entrepreneurial frameworks to financial exclusion affecting low-income communities",
        "Practiced pitch communication, distilling complex fintech into a compelling presentation",
        "Built risk assessment framework covering regulatory, technical, and market adoption risks",
      ],
      challenges:
        "Managing competing academic demands during a busy fall semester, team coordination across different schedules and skill sets, receiving and rapidly implementing critical feedback from judges under time pressure, and developing a viable prototype within competition constraints.",
    },
  },
  {
    title: "Global Dimension",
    icon: "🌐",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.3)",
    desc: "Cross-cultural international perspective",
    experience: {
      heading: "NAE GCSP International Conference — Rome, Italy",
      subheading: "Represented UMBC at the Annual Grand Challenges Scholars Convening",
      level: "GOLD — ~168 hours (travel, presentation, conference, networking)",
      tieScore: "3 / 3 — Strongly Tied",
      summary:
        "I traveled to Rome, Italy to attend and present at the international annual conference of the Grand Challenges Scholars Program. The conference provided a unique opportunity to engage with scholars, researchers, and practitioners from across the world working on challenges at the intersection of technology, education, and innovation. I represented UMBC and presented research to an international audience, requiring me to communicate complex technical and pedagogical ideas clearly across cultural and disciplinary boundaries.",
      whyLinked:
        "This conference directly engaged with themes of technology, innovation, and education on a global scale — all central to Advance Personalized Learning. Presenting internationally required framing my work across cultural and national contexts, deepening understanding of how personalized learning tools must be designed with global diversity in mind.",
      highlights: [
        "Presented research to an international audience at the NAE GCSP global convening",
        "Engaged with scholars from diverse countries on education, technology, and innovation",
        "Attended panels and workshops exposing global perspectives on personalized learning",
        "Navigated cross-cultural communication and professional norms as a linguistic minority",
        "Strengthened global citizenship: understanding how educational challenges vary by geography",
      ],
      challenges:
        "Logistical and financial barriers (covered by UMBC), language and cultural barriers in informal networking, framing U.S.-specific academic contexts for a global audience, and resilience around visa requirements, travel disruptions, and time-zone adjustment.",
    },
  },
  {
    title: "Service Learning",
    icon: "❤️",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.3)",
    desc: "Giving back through engineering",
    experience: {
      heading: "AI/ML Curriculum for Maryland Community Colleges",
      subheading: "In collaboration with Prof. Mark Dencler — Harford Community College",
      level: "GOLD — ~270 hours",
      tieScore: "3 / 3 — Strongly Tied",
      summary:
        "I am designing and developing a comprehensive AI and Machine Learning course curriculum for community colleges in Maryland, in collaboration with Prof. Mark Dencler at Harford Community College (HCC). This project addresses a significant equity gap: many community college students — disproportionately first-generation, low-income, or career-changing adults — currently lack access to structured, high-quality AI/ML education that could dramatically improve their career prospects. Upon completion, this curriculum will be proposed to the Maryland State Government for adoption across the community college system, potentially reaching thousands of students statewide.",
      whyLinked:
        "This is perhaps the most direct embodiment of Advance Personalized Learning of all five GCSP experiences. Developing an AI/ML curriculum for community colleges creates personalized learning pathways at varied knowledge levels for historically underserved populations. Proposing it to the Maryland State Government enables systemic, scalable impact far beyond any single classroom.",
      highlights: [
        "Full course design: structure, learning objectives, instructional content, assessments",
        "Tailored for community college students with varying levels of programming experience",
        "Proposal submitted to Maryland State Government for statewide adoption",
        "Supervised by Prof. Mark Dencler with pedagogical and institutional mentorship",
        "Civic agency: treating student service as meaningful contribution to public education policy",
      ],
      challenges:
        "Complexity of designing a full course requiring deep technical and pedagogical expertise, navigating the institutional/political process of a state government curriculum proposal, time management competing with research and other GCSP commitments, and ensuring the curriculum genuinely serves community college students rather than reproducing the four-year university experience.",
    },
  },
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
  { src: "/images/Pic1.jpeg", alt: "Rome conference" },
  { src: "/images/Pic2.jpeg", alt: "Vatican City" },
  { src: "/images/Pic3.jpeg", alt: "NAE Summit" },
  { src: "/images/Pic6.jpeg", alt: "Grand Challenges" },
  { src: "/images/Pic5.jpeg", alt: "Rome, Italy" },
  { src: "/images/Pic4.jpeg", alt: "GCSP Scholars" },
  { src: "/images/Pic7.jpeg", alt: "GCSP Scholars" },
  { src: "/images/Pic8.jpeg", alt: "GCSP Scholars" },
  { src: "/images/Pic9.jpeg", alt: "GCSP Scholars" },
  { src: "/images/Pic10.jpeg", alt: "GCSP Scholars" },
  { src: "/images/Pic11.jpeg", alt: "GCSP Scholars" },
  { src: "/images/Pic12.jpeg", alt: "GCSP Scholars" },
  { src: "/images/Pic14.jpeg", alt: "GCSP Scholars" },
  { src: "/images/Pic15.jpeg", alt: "GCSP Scholars" },
  { src: "/images/Pic16.jpeg", alt: "GCSP Scholars" },
];

const floatingOrbs = [
  { size: 300, top: "3%", left: "70%", color: "rgba(251,191,36,0.08)", delay: 0 },
  { size: 220, top: "35%", left: "2%", color: "rgba(236,72,153,0.06)", delay: 2 },
  { size: 180, top: "68%", left: "75%", color: "rgba(124,58,237,0.05)", delay: 4 },
  { size: 150, top: "88%", left: "20%", color: "rgba(59,130,246,0.06)", delay: 1.5 },
];

// ── PILLAR DETAIL PANEL ───────────────────────────────────────────────────────
function PillarDetail({ pillar, onClose }: { pillar: (typeof gcspPillars)[0]; onClose: () => void }) {
  const exp = pillar.experience;
  return (
    <AnimatePresence>
      <motion.div
        key="pillar-detail"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mt-6 rounded-3xl overflow-hidden"
        style={{
          background: pillar.bg,
          border: `1.5px solid ${pillar.border}`,
          boxShadow: `0 16px 48px ${pillar.bg}`,
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-8 py-5"
          style={{ borderBottom: `1px solid ${pillar.border}` }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{pillar.icon}</span>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-0.5"
                style={{ color: pillar.color }}
              >
                {pillar.title} Experience
              </p>
              <h3 className="text-lg font-bold text-gray-900 leading-snug">{exp.heading}</h3>
              <p className="text-sm text-gray-500">{exp.subheading}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-white/60 transition-all shrink-0"
            style={{ border: "1px solid rgba(0,0,0,0.08)" }}
          >
            ✕
          </button>
        </div>

        <div className="px-8 py-7 space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: `${pillar.color}18`, color: pillar.color, border: `1px solid ${pillar.border}` }}
            >
              {exp.level}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: "rgba(107,114,128,0.08)", color: "#6b7280", border: "1px solid rgba(107,114,128,0.2)" }}
            >
              GC Tie: {exp.tieScore}
            </span>
          </div>

          {/* Summary */}
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Overview</p>
            <p className="text-gray-600 text-sm leading-relaxed">{exp.summary}</p>
          </div>

          {/* Why linked */}
          <div
            className="p-5 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.55)", border: `1px solid ${pillar.border}` }}
          >
            <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: pillar.color }}>
              Connection to Grand Challenge
            </p>
            <p className="text-gray-600 text-sm leading-relaxed italic">{exp.whyLinked}</p>
          </div>

          {/* Highlights */}
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">Key Highlights</p>
            <ul className="space-y-2">
              {exp.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex items-start gap-3 text-sm text-gray-600"
                >
                  <span
                    className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                    style={{ background: pillar.color }}
                  />
                  {h}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="p-4 rounded-xl" style={{ background: "rgba(0,0,0,0.03)" }}>
            <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Challenges & Growth</p>
            <p className="text-gray-500 text-sm leading-relaxed">{exp.challenges}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function GCSPRomePage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 70, damping: 18 });
  const spotY = useSpring(mouseY, { stiffness: 70, damping: 18 });
  const [activePillar, setActivePillar] = useState<number | null>(null);
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
      if (e.key === "Escape") {
        setLightbox(null);
        setActivePillar(null);
      }
      if (e.key === "ArrowRight" && lightbox !== null)
        setLightbox((lightbox + 1) % romePhotos.length);
      if (e.key === "ArrowLeft" && lightbox !== null)
        setLightbox((lightbox - 1 + romePhotos.length) % romePhotos.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  // ── FIX: typed as Variants with "as const" on ease ──
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  const handlePillarClick = (i: number) => {
    setActivePillar(activePillar === i ? null : i);
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
          className="fixed inset-0 z-100 flex items-center justify-center"
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
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              ✕
            </button>
            <button
              onClick={() => setLightbox((lightbox - 1 + romePhotos.length) % romePhotos.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              ‹
            </button>
            <button
              onClick={() => setLightbox((lightbox + 1) % romePhotos.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              ›
            </button>
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
              className="md:w-2/5 shrink-0 relative"
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

          {/* ── EXPERIENCE & REFLECTION — Five Pillars (clickable) ── */}
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
              <p className="text-sm text-gray-400 mt-2">Click a competency to explore the project behind it</p>
            </div>

            {/* Pillar cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {gcspPillars.map((p, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -6, scale: 1.04 }}
                  onClick={() => handlePillarClick(i)}
                  className="p-5 rounded-2xl text-center cursor-pointer relative"
                  style={{
                    background: activePillar === i ? p.bg : "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(16px)",
                    border: activePillar === i ? `1.5px solid ${p.border}` : "1px solid rgba(255,255,255,0.5)",
                    boxShadow: activePillar === i ? `0 8px 32px ${p.bg}` : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  {activePillar === i && (
                    <motion.div
                      layoutId="pillar-active"
                      className="absolute inset-0 rounded-2xl"
                      style={{ background: p.bg, border: `1.5px solid ${p.border}` }}
                    />
                  )}
                  <span className="text-2xl block mb-3 relative z-10">{p.icon}</span>
                  <h3
                    className="text-sm font-bold mb-1 relative z-10"
                    style={{ color: activePillar === i ? p.color : "#111827" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-snug relative z-10">{p.desc}</p>
                  {/* Active indicator dot */}
                  {activePillar === i && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ background: p.color }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Pillar detail panel */}
            <AnimatePresence mode="wait">
              {activePillar !== null && (
                <PillarDetail
                  key={activePillar}
                  pillar={gcspPillars[activePillar]}
                  onClose={() => setActivePillar(null)}
                />
              )}
            </AnimatePresence>

            {/* Empty state hint */}
            {activePillar === null && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm text-gray-300 italic"
              >
                ↑ Select any of the five GCSP competencies above to explore that project
              </motion.p>
            )}
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
                  <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
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

            <div style={{ columns: "3", columnGap: "12px" }} className="[&>*]:break-inside-avoid">
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
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.3)" }}
                  >
                    <span className="text-white text-2xl">🔍</span>
                  </div>
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