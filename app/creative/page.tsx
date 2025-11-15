"use client";

import { motion } from "framer-motion";

export default function CreativePage() {
  const floatingShapes = [
    "bg-pink-300/40",
    "bg-purple-300/40",
    "bg-blue-300/40",
    "bg-green-300/40",
    "bg-yellow-300/40",
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-gray-100 to-gray-200 flex items-center justify-center py-20 px-8">

      {/* ✨ PARALLAX FLOATING SHAPES */}
      {floatingShapes.map((color, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -30, 30, 0],
            rotate: [0, 20, -20, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full ${color}`}
          style={{
            width: `${130 + i * 40}px`,
            height: `${130 + i * 40}px`,
            top: `${10 + i * 12}%`,
            left: `${5 + i * 15}%`,
            filter: "blur(35px)",
          }}
        />
      ))}

      {/* ✨ FLOATING DOODLES (STARS, NOTES, SPARKLES) */}
      {["✨", "★", "♪", "✦", "✧"].map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-gray-500/60 text-4xl select-none"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            y: [-20, 20, -20],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: `${20 + i * 12}%`,
            right: `${10 + i * 10}%`,
          }}
        >
          {icon}
        </motion.div>
      ))}

      {/* ✨ MAIN CONTENT CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        whileHover={{
          scale: 1.02,
          rotate: 0.5,
          transition: { duration: 0.4 },
        }}
        className="relative z-20 max-w-4xl bg-white/70 backdrop-blur-xl p-12 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.1)] border border-gray-300"
      >
        {/* TITLE WITH SHIMMER EFFECT */}
        <motion.h1
          className="text-5xl font-extrabold text-center bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          The Creative Side of Me
        </motion.h1>

        <div className="space-y-6 mt-10 text-lg text-gray-900 leading-relaxed">

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            I’m someone who lives at the intersection of logic and imagination. While I build
            intelligent systems and AI models, the creative world is what gives me color,
            rhythm, and purpose.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            As the <strong>Vice President of the Honors Council</strong> and a 
            <strong> Senator of the SGA</strong>, I learned how creativity powers leadership—
            not just the ability to solve problems, but the ability to see possibilities
            where others see limits.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4 }}
          >
            Volunteering at the <strong>Philly Goat Project</strong> taught me the kind of joy and grounding
            that only nature can give. Working with animals has a slow, peaceful rhythm —
            one that balances out the fast-moving world of computing.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.6 }}
          >
            I’m also trained in <strong>Indian Classical Music</strong> — both vocals and instruments —
            having completed my <em>Madhyama Visharad</em>. Years of riyaaz shaped my discipline,
            intuition, and ability to feel patterns deeply — the same instincts that guide
            my work in AI.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8 }}
          >
            And when I’m not coding or creating, you’ll probably find me on a badminton
            court — where every swing is a mix of strategy, reflex, and joy.
          </motion.p>

          <motion.p
            className="italic text-center text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            “Creativity is not an activity — it’s a way of living.”
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}



/*
"use client";
import { useEffect, useRef } from "react";

export default function CreativePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    let animationFrame: number;

    const draw = () => {
      ctx.fillStyle = `rgba(0,0,0,0.05)`;
      ctx.fillRect(0, 0, width, height);

      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillStyle = `hsl(${Math.random()*360}, 80%, 60%)`;
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 20, 0, Math.PI*2);
      ctx.fill();

      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-screen" />;
}
*/