"use client";

import { motion } from "framer-motion";

export default function SlidingPuzzlePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#fdf6ff] via-[#f5ebff] to-[#f0f0ff] text-gray-900 font-sans">

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">

        {/* HEADER */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 max-w-4xl mx-auto"
        >
          <h1 className="text-6xl font-extrabold text-black drop-shadow-md">
            Sliding Puzzle Game (C++)
          </h1>
          <p className="text-lg text-gray-700">
            Welcome to the Sliding Puzzle Game, a console-based logic game that challenges your brain and reflexes. Slide the tiles until every tile is in numerical order, with the empty space at the bottom-right corner.
          </p>
        </motion.section>

        {/* FEATURES */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto space-y-10"
        >
          <h2 className="text-4xl font-bold text-black text-center mb-6">Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Customizable Grid Size", desc: "Choose board dimensions between 3x3 and 10x10." },
              { title: "Color-coded Tiles", desc: "Green: correct, Red: incorrect, Yellow: empty space." },
              { title: "Randomized Scrambling", desc: "Ensures the board starts in a valid, solvable state." },
              { title: "Intuitive Controls", desc: "Use W, A, S, D keys to slide tiles." },
              { title: "Win Detection", desc: "Automatically detects when the puzzle is solved." },
              { title: "Clean Memory Handling", desc: "Dynamically allocated memory is released properly in the destructor." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, y: -2 }}
                className="p-6 border rounded-xl shadow-md bg-white/80 backdrop-blur-xl transition-all"
              >
                <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
                <p className="text-black">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* GETTING STARTED */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <h2 className="text-4xl font-bold text-black text-center">Getting Started</h2>
          <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-md space-y-4">
            <h3 className="text-xl font-semibold text-black">Prerequisites</h3>
            <ul className="list-disc ml-6 text-black">
              <li>Windows OS (required for &lt;Windows.h&gt; and &lt;conio.h&gt;)</li>
              <li>C++ Compiler (MSVC, MinGW, or any supporting C++11)</li>
            </ul>

            <h3 className="text-xl font-semibold text-black">Build and Run</h3>
            <pre className="bg-black text-white rounded-md p-4 overflow-x-auto">
{`git clone https://github.com/yourusername/sliding-puzzle.git
cd sliding-puzzle
g++ main.cpp SlidingPuzzle.cpp -o SlidingPuzzle.exe
SlidingPuzzle.exe`}
            </pre>
          </div>
        </motion.section>

        {/* INSTRUCTIONS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <h2 className="text-4xl font-bold text-black text-center">Game Instructions</h2>
          <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-md text-black">
            <p>Move tiles using the following keys:</p>
            <pre className="bg-black text-white rounded-md p-4 overflow-x-auto">
{`W → UP
A → LEFT
S → DOWN
D → RIGHT
Q → Quit the game`}
            </pre>
            <p>Tiles slide into the empty space (*) if the move is valid. The board is solved when all numbers are in ascending order, ending with the empty space.</p>
          </div>
        </motion.section>

        {/* PROJECT STRUCTURE */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <h2 className="text-4xl font-bold text-black text-center">Project Structure</h2>
          <pre className="bg-white/70 backdrop-blur-xl text-black rounded-xl p-6 overflow-x-auto">
{`sliding-puzzle/
├── main.cpp         # Main program with user interaction and game loop
├── SlidingPuzzle.h  # Class declaration
├── SlidingPuzzle.cpp# Class implementation
├── README.md        # Project documentation
├── LICENSE          # License information
└── .gitignore       # Ignored files and folders`}
          </pre>
        </motion.section>

        {/* AUTHOR */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-4"
        >
          <h2 className="text-3xl font-bold text-black">Author</h2>
          <p>Saumya Brahmbhatt</p>
          <p>Computer Science Major</p>
          <p>
            LinkedIn: <a className="text-blue-600 underline" href="https://www.linkedin.com/in/saumyabrahmbhatt/" target="_blank">https://www.linkedin.com/in/saumyabrahmbhatt/</a>
          </p>
          <p>Email: <a className="text-blue-600 underline" href="mailto:saumyabrahmbhatt812@gmail.com">saumyabrahmbhatt812@gmail.com</a></p>
        </motion.section>

        {/* ACKNOWLEDGMENTS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-2 text-black"
        >
          <h2 className="text-2xl font-semibold">Acknowledgments</h2>
          <p>Special thanks to Harford Community College for inspiring this academic project.</p>
          <p>Built as a demonstration of imperative programming, arrays, pointers, and dynamic memory in C++.</p>
        </motion.section>

      </div>
    </div>
  );
}
