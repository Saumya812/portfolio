"use client";

import { motion } from "framer-motion";

export default function CreativePage() {
  const pictures = [
     { src: "/images/Flower.jpg", alt: "Flower Image", side: "left" },
    { src: "/images/HCC_Honors_Pic.jpg", alt: "Honors Council HCC", side: "right" },
     { src: "/images/Philly_Pic.jpg", alt: "Philly Goat Project", side: "right" },
  ];

  const doodles = ["★","♪","✦","✧","★","♪","✦","✧","★","♪"];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-100 to-gray-200 py-20 px-8 flex justify-center items-start">

      {/* Page Floating Doodles */}
      {doodles.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-gray-400/70 text-3xl select-none"
          animate={{
            y: [0, -15, 15, 0],
            x: [0, 10, -10, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 6 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: `${5 + i * 6}%`, left: `${5 + i * 7}%` }}
        >
          {icon}
        </motion.div>
      ))}

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        whileHover={{ scale: 1.02, rotate: 0.5, transition: { duration: 0.4 } }}
        className="relative z-20 max-w-5xl bg-white/70 backdrop-blur-xl p-12 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.1)] border border-gray-300 mx-8"
      >
        <motion.h1
          className="text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text text-transparent"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          The Creative Side of Me
        </motion.h1>

        <div className="space-y-12 text-gray-900 leading-relaxed text-lg">

          {/* Paragraph 1 with image */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="relative flex items-start gap-8">
            <div className="relative flex-shrink-0 w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
              <img src={pictures[0].src} alt={pictures[0].alt} className="w-full h-full object-cover"/>
            </div>
            <p>
              Outside academics, I’m someone who expresses creativity everywhere I go. 
              From leadership to music to community work, these parts of me shape how I think, build, and connect.
            </p>
          </motion.div>

          {/* Paragraph 2 with image */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }} className="relative flex items-start gap-8 flex-row-reverse">
            <div className="relative flex-shrink-0 w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
              <img src={pictures[1].src} alt={pictures[1].alt} className="w-full h-full object-cover"/>
            </div>
            <p>
              As the <strong>Vice President of the Honors Council</strong> and a 
              <strong> Senator in SGA</strong>, I discovered that leadership isn’t just about decisions — 
              it’s about imagination, vision, and creating spaces where people feel seen and inspired.
            </p>
          </motion.div>

          {/* Paragraph 3 */}

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }} className="relative flex items-start gap-8 flex-row-reverse">
            <div className="relative flex-shrink-0 w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
              <img src={pictures[2].src} alt={pictures[2].alt} className="w-full h-full object-cover"/>
            </div>
            <p>
            Volunteering at the <strong>Philly Goat Project</strong> grounded me in a different rhythm — 
            soft, calm, and real. Spending time with animals taught me patience, warmth, 
            and the simple joy of being present.
            </p>
          </motion.div>


          {/* Paragraph 4 */}
          <motion.p initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.6 }}>
            Music has also been a major part of my world. I’m trained in 
            <strong> Indian Classical Music</strong>, having completed my <em>Madhyama Visharad</em>. 
            Years of riyaaz strengthened my discipline, intuition, and sense of pattern — 
            the same instincts I bring into AI and problem-solving.
          </motion.p>

          {/* Paragraph 5 */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8 }}>
            And when I’m not lost in creativity, I’m probably on the badminton court — 
            recharged, competitive, and fully alive.
          </motion.p>

          {/* Quote */}
          <motion.p className="italic text-center text-gray-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            “Creativity isn’t something I do — it’s how I live.”
          </motion.p>

        </div>
      </motion.div>

    </div>
  );
}
