"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav 
      className="
        w-full fixed top-0 z-50 
        bg-white/40 backdrop-blur-xl 
        border-b border-black/10
      "
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="text-xl font-bold text-gray-900 tracking-wide hover:text-pink-700 transition-all duration-300"
        >
          Saumya Brahmbhatt
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-900 text-2xl hover:scale-110 transition-all"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Nav Links (NO BORDERS ANYMORE) */}
        <div
          className={`
            md:flex gap-6 md:items-center
            absolute md:static top-16 right-6 
            ${open ? "flex flex-col" : "hidden md:flex"}
            bg-transparent 
            p-0
          `}
        >
          {[
            ["About", "/about"],
            ["Experience", "/Experience"],
            ["Projects", "/projects"],
            ["GCSP", "/GCSP"],
            ["Skills", "/skills"],
            ["Creative", "/creative"],
            ["Contact", "/contact"],
          ].map(([label, url], i) => (
            <Link
              key={i}
              href={url}
              className="
                text-gray-900 font-medium
                px-4 py-2 rounded-xl
                hover:text-pink-600
                hover:bg-pink-200/40
                transition-all duration-300
                hover:shadow-[0_0_12px_rgba(255,160,200,0.4)]
                active:scale-95
              "
            >
              {label}
            </Link>
          ))}
        </div>

      </div>
    </nav>
  );
}
