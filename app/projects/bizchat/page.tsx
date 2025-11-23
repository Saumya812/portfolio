"use client";
import { motion } from "framer-motion";

export default function BizChatPage() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-20">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h1 className="text-6xl font-extrabold text-black drop-shadow-md">
          BizChat
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A human-centered AI assistant that empowers entrepreneurs of all digital skill levels  
          to turn ideas into business plans — with clarity, confidence, and creativity.
        </p>
      </motion.div>

      {/* HERO IMAGE */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative group"
      >
        <motion.img
          src="/images/Bizchat_IMG.png"
          alt="BizChat"
          className="w-full h-96 object-cover rounded-3xl shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_20px_70px_rgba(80,70,255,0.25)]"
          whileHover={{ y: -8 }}
        />

        {/* Floating Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-xl px-4 py-2 rounded-xl text-sm shadow-lg"
        >
          AI + HCI + Human Empathy
        </motion.div>
      </motion.div>

      {/* ABOUT SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center space-y-6"
      >
        <h2 className="text-4xl font-bold text-gray-900">What is BizChat?</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          BizChat was born from a simple insight:  
          <span className="font-semibold">
            business planning is hard — even harder for entrepreneurs who struggle with digital tools.
          </span>
          <br /><br />
          Instead of expecting users to navigate complex AI interfaces, BizChat meets them where
          they are: their own website, their own ideas, their own pace.
        </p>
      </motion.section>

      {/* DESIGN PRINCIPLES — UPDATED TO ALL BLACK TEXT */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 text-center"> Human-Centered Design Principles</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Low Floor, High Ceiling",
              desc: "Simple enough for beginners. Powerful enough for experts. From voice-to-text to inline LLM editing — BizChat grows with the user.",
            },
            {
              title: "Just-in-Time Learning",
              desc: "BizChat teaches business skills at the exact moment users need them. Micro-examples, tooltips, guidance — all embedded in the workflow.",
            },
            {
              title: "Contextualized Technology",
              desc: "The AI disappears into the background. Users interact through their own business context — reducing anxiety and boosting confidence.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              className="p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all"
            >
              {/* ALL BLACK TITLE */}
              <h3 className="text-2xl font-semibold text-black mb-3">
                {item.title}
              </h3>

              {/* ALL BLACK DESCRIPTION */}
              <p className="text-black">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FEATURES */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-8"
      >
        <h2 className="text-4xl font-bold text-gray-800 text-center"> What BizChat Can Do</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Generate polished business plans from a website or chat.",
            "Click-to-apply AI suggestions for effortless editing.",
            "Voice-to-text for entrepreneurs who struggle with typing.",
            "Rich-text editor with inline LLM generation.",
            "SBA-sourced examples built directly into the interface.",
            "Export ready-to-submit plans for grants and funding."
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border hover:shadow-xl transition-all"
            >
              <p className="text-gray-700">{feature}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* USER STORY */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <h2 className="text-4xl font-bold text-gray-900"> A Real Story: José the Coffee Roaster</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          José is a talented coffee roaster with dreams of expanding —  
          but writing a business plan feels overwhelming.
          <br/><br/>
          BizChat takes his website, turns it into a draft, teaches him business concepts along the way,
          and lets him edit using voice instead of typing.
          <br/><br/>
          By the end, José has a professional plan, confidence in his ideas,  
          and a set of questions to ask real experts before submitting his grant application.
        </p>
      </motion.section>

      {/* IMPLEMENTATION DETAILS */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">🛠 Under the Hood</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg">
          <li>React + Next.js frontend with Firebase authentication</li>
          <li>GPT-4-Turbo for structured business plan generation</li>
          <li>GPT-3.5-Turbo for conversation & summarization tasks</li>
          <li>Whisper-1 for speech-to-text support</li>
          <li>Asynchronous section-level generation for speed</li>
          <li>Few-shot prompts sourced from SBA business plan examples</li>
        </ul>
      </motion.section>

      {/* GITHUB CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <motion.a
          href="https://github.com/Saumya812/portfolio-BizChat"
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all font-semibold tracking-wide"
        >
          🔗 Explore the GitHub Repository
        </motion.a>
      </motion.div>

    </div>
  );
}
