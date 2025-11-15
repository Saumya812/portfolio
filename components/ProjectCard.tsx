"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({ title, description, imageUrl, link, reverse }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 180 }}
      className={`
        flex flex-col md:flex-row items-center gap-6
        p-6
        rounded-2xl
        bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50
        border border-gray-300
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        w-full
        min-h-[250px]
        overflow-hidden
        ${reverse ? "md:flex-row-reverse" : ""}
      `}
    >
      {/* Project Image */}
      <div className="w-full md:w-2/5 flex-shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Text Content */}
      <div className="w-full md:w-3/5 flex flex-col justify-center">
        <h3 className={`text-2xl font-bold mb-2 ${reverse ? "text-right" : "text-left"}`}>
          {title}
        </h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <Link href={link}>
          <button className="px-5 py-2 bg-gray-200 text-gray-900 rounded-full border border-gray-400 hover:bg-gray-300 transition-all">
            View Project →
          </button>
        </Link>
      </div>
    </motion.div>
  );
}




/*
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({ title, description, image, link, reverse }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`flex flex-col md:flex-row items-center gap-8 p-6 rounded-2xl border-2 border-peach bg-cream shadow-md hover:shadow-xl transition-all
      ${reverse ? "md:flex-row-reverse" : ""}`}
    >
      <img
        src={image}
        alt={title}
        className="w-full md:w-1/2 rounded-xl shadow-md"
      />

      <div className="w-full md:w-1/2">
        <h3 className="text-3xl font-bold text-gray700 mb-4">{title}</h3>
        <p className="text-gray600 mb-6">{description}</p>

        <Link href={link}>
          <button className="px-5 py-2 bg-lavender text-gray700 rounded-full border border-mint hover:bg-mint hover:text-gray800 transition-all">
            View Project →
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
*/


/*
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ProjectCard({ title, description, image, link }: ProjectCardProps) {
  return (
    <a href={link} className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </a>
  );
}
*/