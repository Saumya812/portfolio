"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Problem",
    content: [
      "Students often rely on handwritten notes or scanned materials, but:",
      "• They forget what's inside them.",
      "• Searching through messy handwriting or scanned files is frustrating.",
      "• Extracted text is unstructured and difficult to use.",
      "• Summarizing or understanding key concepts takes time and effort.",
    ],
  },
  {
    title: "Solution",
    content: [
      "ScholarSnap combines OCR and AI/NLP to offer a smarter study experience:",
      "• Converts scanned or handwritten content into structured, clean digital notes.",
      "• Detects key topics and auto-generates helpful tags.",
      "• Summarizes entire chapters or sections into digestible points.",
      "• Lets you ask questions about your notes — ChatGPT-style Q&A from your own content.",
    ],
  },
  {
    title: "Tech Stack",
    content: [
      "Frontend/UI: Streamlit (Interactive web interface)",
      "Backend Logic: Python (Core logic for OCR, NLP, UI integration)",
      "AI/NLP: Transformers (facebook/bart-large-cnn) for summarization, citation extraction, tagging",
      "OCR: pytesseract, PyMuPDF (fitz) for text extraction from images and PDFs",
      "PDF Export: fpdf (Generates structured, downloadable PDFs)",
      "File Handling: base64, Streamlit uploader (Upload, process, and download support)",
      "Deployment (Planned): Streamlit Cloud / Hugging Face Spaces",
    ],
  },
  {
    title: "How It Works",
    content: [
      "1. Upload a handwritten note, scanned image, or PDF file.",
      "2. The app uses OCR to extract raw text from the input.",
      "3. NLP modules process the content to detect topics, generate tags, and summarize.",
      "4. Interact with your notes via a chatbot-style Q&A interface.",
    ],
  },
  {
    title: "Use Cases",
    content: [
      "• Study smarter with AI-generated summaries and key points.",
      "• Convert handwritten class notes into clean digital notes.",
      "• Search and explore large scanned documents easily.",
      "• Get instant answers to questions based on your notes.",
    ],
  },
];

export default function ScholarSnapPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 px-6 md:px-20 py-16">
      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-bold text-center mb-12 text-black"
      >
        ScholarSnap
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-16 text-gray-700"
      >
        An AI-powered tool that transforms handwritten notes, scanned PDFs, and textbooks into clean, searchable, and interactive study material.
      </motion.p>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-xl p-6 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            onClick={() => toggleSection(index)}
          >
            {/* Section Heading */}
            <h2 className="text-2xl font-semibold text-black">{section.title}</h2>

            {/* Section Content */}
            <motion.div
              animate={{ height: expandedIndex === index ? "auto" : 0, opacity: expandedIndex === index ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mt-4 text-gray-800 space-y-2"
            >
              {section.content.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="text-center mt-16"
      >
        <p className="text-gray-500">
          Stay tuned for updates — ScholarSnap is under active development with advanced AI-powered features.
        </p>
      </motion.div>
    </div>
  );
}
