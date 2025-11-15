export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-32 bg-gradient-to-r from-lavender via-powderBlue to-mint rounded-xl">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text animate-fadeIn">
        Hi, I'm Saumya Brahmbhatt
      </h1>
      <p className="text-gray500 text-xl md:text-2xl mb-8 animate-fadeIn">
        CS Student | AI/ML Enthusiast | Creator of Interactive Web Experiences
      </p>
      <a
        href="#projects"
        className="px-6 py-3 bg-peach text-gray500 rounded-full relative hover:bg-lavender transition-colors shadow-md hover:shadow-lg">
        <span className="relative z-10">See My Work</span>
        <span className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full opacity-50 bg-mint transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 hover:w-40 hover:h-40 pointer-events-none"></span>
      </a>
    </section>
  );
}


/*
export default function HeroSection() {
  return (
    <section className="h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
        Hi, I'm Saumya.
      </h1>
      <p className="max-w-2xl text-white/80 text-lg">
        A creative Computer Science student exploring AI, generative visuals, and software engineering —
        crafting beautiful digital experiences with code.
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href="/projects"
          className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-medium transition"
        >
          View Projects
        </a>

        <a
          href="/contact"
          className="px-6 py-3 border border-white/40 hover:border-pink-400 rounded-lg font-medium transition"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}
*/