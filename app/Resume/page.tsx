"use client";

import { motion } from "framer-motion";

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 text-gray-700">

      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-gray-800"
      >
        My Resume
      </motion.h1>

      {/* Subtitle */}
      <p className="text-center text-gray-600">
        You can view or download my resume below.
      </p>

      {/* Download Button */}
      <div className="flex justify-center">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/Resume/Resume.pdf"   // MUST start with /
          download
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block px-8 py-4 bg-gray-800 text-white rounded-full font-semibold overflow-hidden shadow-lg"
        >
          <span className="relative z-10">Download Resume</span>
          <span className="absolute inset-0 bg-blue-400 rounded-full opacity-30 blur-xl animate-pulse"></span>
        </motion.a>
      </div>

      {/* Embedded PDF Viewer */}
      <div className="mt-12 border rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="/Resume/Resume.pdf"   // MUST start with /
          className="w-full h-[800px]"
          title="Resume"
        />
      </div>
    </div>
  );
}
