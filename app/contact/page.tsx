export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 text-gray-900">
      <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Get in Touch
      </h1>

      <p className="text-center text-lg">
        I love connecting with fellow developers, AI enthusiasts, and creative minds.  
        Whether it’s collaboration, questions, or just a hello, feel free to reach out!
      </p>

      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-around items-center">
        {/* Email */}
        <a
          href="mailto:saumyabrahmbhatt812@gmail.com"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-md font-semibold"
        >
          📧 Email Me
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Saumya812"
          target="_blank"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-green-400 hover:bg-green-500 hover:text-white transition-all duration-300 shadow-md font-semibold"
        >
          💻 GitHub
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/saumyabrahmbhatt"
          target="_blank"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-md font-semibold"
        >
          🔗 LinkedIn
        </a>
      </div>

      <p className="text-center text-sm text-gray-500">
        I look forward to connecting and sharing ideas! 🚀
      </p>
    </div>
  );
}
