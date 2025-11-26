"use client";
import { motion } from "framer-motion";

export default function Broke2BrokerPage() {
  return (
    <div className="max-w-6xl mx-auto p-10 space-y-20 font-sans text-gray-900">

      {/* ---------------- HERO ---------------- */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold">
          Budget2Broker
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
          Turning financial literacy into financial freedom. Personalized financial plans, investing guidance, and interactive education — all in one platform.
        </p>

        {/* ---------------- AWARD / RECOGNITION ---------------- */}
        <div className="mt-4 inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-medium text-sm shadow-sm">
          🏆 4th Place – Alex and Brown Center for Entrepreneurship & Innovation 2025, Technology & Innovation Track
        </div>
      </motion.section>

      {/* ---------------- HERO IMAGE ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <img
          src="/images/budget2broker.png"
          alt="Budget2Broker"
          className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-lg"
        />
        <div className="absolute bottom-6 right-6 bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium">
          AI + Finance + Education
        </div>
      </motion.div>

      {/* ---------------- FEATURES ---------------- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[ 
            {
              title: "Personalized Financial Plan",
              desc: "Enter your financial history and goals to get a clear, actionable plan including debt payoff and 5-year net-worth projections."
            },
            {
              title: "Education Hub",
              desc: "Learn investing, saving, and risk management with bite-sized lessons embedded in the platform."
            },
            {
              title: "Investment Explorer",
              desc: "Understand different investment types like Index Funds, ETFs, and Stocks — with AI explanations and visual guides."
            },
            {
              title: "Compound Interest Simulator",
              desc: "See how your contributions grow over time by adjusting variables in a simple, interactive calculator."
            },
            {
              title: "HYSA Rates 2025",
              desc: "Quickly compare top high-yield savings accounts from different financial institutions."
            },
            {
              title: "Interactive Stock Chart",
              desc: "Explore live stock data with simple visualizations. AI chatbot helps explain trends and terms."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ---------------- COMPETITIVE ADVANTAGE ---------------- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold">Why Budget2Broker?</h2>
        <p className="text-gray-700 text-lg">
          Unlike traditional apps that focus on only budgeting or investing, Budget2Broker unifies financial education, personalized planning, and guidance — helping users build confidence before they start investing.
        </p>
      </motion.section>

      {/* ---------------- TECH STACK ---------------- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">Tech Stack</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: "React", desc: "Component-based frontend library for building dynamic UIs." },
            { name: "Next.js", desc: "Framework for server-side rendering and static site generation." },
            { name: "Tailwind CSS", desc: "Utility-first CSS framework for responsive design." },
            { name: "OpenAI API", desc: "Generative AI for personalized financial guidance." },
            { name: "Yahoo Finance API", desc: "Real-time stock and financial data integration." },
            { name: "Chart.js", desc: "Interactive charts for visualizing investments." },
            { name: "Framer Motion", desc: "Smooth animations and interactive UI effects." },
            { name: "Firebase", desc: "Authentication and backend services for user data." },
          ].map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, y: -2 }}
              className="p-5 bg-white rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-800">{tech.name}</h3>
              <p className="text-gray-600 mt-2 text-sm">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ---------------- CALL TO ACTION ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-12"
      >
        <motion.a
          href="https://github.com/Saumya812"
          target="_blank"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 bg-black text-white rounded-full shadow-md hover:shadow-lg transition-all font-semibold"
        >
          View GitHub Repository
        </motion.a>
      </motion.div>

    </div>
  );
}
