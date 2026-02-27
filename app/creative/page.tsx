"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const interests = [
  { icon: "🎵", label: "Indian Classical Music" },
  { icon: "🏸", label: "Badminton" },
  { icon: "🌿", label: "Volunteering" },
  { icon: "🎓", label: "SGA Senator" },
  { icon: "🏛️", label: "Honors Council VP" },
  { icon: "💡", label: "AI & Innovation" },
];

const sections = [
  {
    src: "/images/Flower.jpg",
    alt: "A quiet moment of beauty",
    side: "left" as const,
    text: (
      <>
        Outside academics, I'm someone who expresses creativity everywhere I go.
        From leadership to music to community work, these parts of me shape how I{" "}
        <strong>think, build, and connect</strong> — with people, with ideas, and with the world.
      </>
    ),
  },
  {
    src: "/images/HCC_Honors_Pic.jpg",
    alt: "Honors Council, HCC",
    side: "right" as const,
    text: (
      <>
        As the <strong>Vice President of the Honors Council</strong> and a{" "}
        <strong>Senator in SGA</strong>, I discovered that leadership isn't just about
        decisions — it's about imagination, vision, and creating spaces where people
        feel <em>seen and inspired</em>.
      </>
    ),
  },
  {
    src: "/images/Philly_Pic.jpg",
    alt: "Philly Goat Project",
    side: "left" as const,
    text: (
      <>
        Volunteering at the <strong>Philly Goat Project</strong> grounded me in a
        different rhythm — soft, calm, and real. Spending time with animals taught me
        patience, warmth, and the simple joy of being <em>fully present</em>.
      </>
    ),
  },
];

function PhotoCard({
  src,
  alt,
  side,
  text,
  index,
}: {
  src: string;
  alt: string;
  side: "left" | "right";
  text: React.ReactNode;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const isLeft = side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: "easeOut", delay: index * 0.1 }}
      className={`flex items-center gap-10 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col`}
    >
      {/* Image */}
      <div
        className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
        style={{ width: "14rem", height: "17rem" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {/* Caption overlay */}
        <motion.div
          className="absolute inset-0 bg-pink-900/40 flex items-end p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-white text-sm font-medium italic">{alt}</p>
        </motion.div>
        {/* Pink corner accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-pink-300/80" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-pink-300/80" />
      </div>

      {/* Text */}
      <p className="text-gray-700 leading-relaxed text-lg">{text}</p>
    </motion.div>
  );
}

export default function CreativePage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const spotY = useSpring(mouseY, { stiffness: 80, damping: 20 });

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
        {/* Soft pink blob — top right */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(251,207,232,0.35) 0%, transparent 70%)",
            transform: "translate(20%, -20%)",
          }}
        />
        {/* Soft purple blob — bottom left */}
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(233,213,255,0.3) 0%, transparent 70%)",
            transform: "translate(-20%, 20%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto space-y-20">

          {/* ── HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center space-y-5"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-pink-500 font-medium">
              Beyond the Code
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              The Creative Side{" "}
              <span className="italic text-pink-600">of Me</span>
            </h1>
            <motion.div
              className="mx-auto h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
          </motion.div>

          {/* ── INTEREST PILLS ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {interests.map((item, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.08, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-700 border border-pink-200 bg-white/70 backdrop-blur-sm shadow-sm cursor-default hover:bg-pink-50 hover:shadow-[0_0_12px_rgba(255,160,200,0.3)] transition-all duration-300"
              >
                <span>{item.icon}</span>
                {item.label}
              </motion.span>
            ))}
          </motion.div>

          {/* ── PHOTO SECTIONS ── */}
          <div className="space-y-16">
            {sections.map((s, i) => (
              <div key={i}>
                <PhotoCard {...s} index={i} />
                {i < sections.length - 1 && (
                  <div className="mt-16 border-t border-dashed border-pink-200" />
                )}
              </div>
            ))}
          </div>

          {/* ── MUSIC SECTION ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative bg-white/60 backdrop-blur-sm border border-pink-100 rounded-3xl p-10 shadow-md hover:shadow-[0_0_20px_rgba(255,160,200,0.25)] transition-shadow duration-300"
          >
            <div className="absolute -top-4 left-10 bg-pink-500 text-white text-xs font-semibold px-4 py-1 rounded-full tracking-wide uppercase">
              🎵 Music
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Music has been a defining part of my world. Trained in{" "}
              <strong>Indian Classical Music</strong>, I completed my{" "}
              <em>Madhyama Visharad</em>. Years of riyaaz sharpened my discipline,
              intuition, and sense of pattern — the same instincts I carry into{" "}
              <strong>AI and problem-solving</strong>.
            </p>
          </motion.div>

          {/* ── BADMINTON ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative bg-white/60 backdrop-blur-sm border border-purple-100 rounded-3xl p-10 shadow-md hover:shadow-[0_0_20px_rgba(200,160,255,0.25)] transition-shadow duration-300"
          >
            <div className="absolute -top-4 left-10 bg-purple-500 text-white text-xs font-semibold px-4 py-1 rounded-full tracking-wide uppercase">
              🏸 On the Court
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              And when I'm not lost in creativity, I'm probably on the{" "}
              <strong>badminton court</strong> — recharged, competitive, and fully
              alive. Sport keeps me grounded in the same way music does: presence,
              rhythm, and flow.
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
              Creativity isn't something I do —<br />it's how I live.
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