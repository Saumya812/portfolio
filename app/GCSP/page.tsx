export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-4xl font-bold">About Me</h1>

      {/* Short Bio */}
      <p>
        My name is Saumya Brahmbhatt, and I am a Computer Science student with a
        focus on Artificial Intelligence and Machine Learning. I am passionate
        about applying technology to solve real-world challenges, particularly
        in finance, techonolgy and education, with solutions that are ethical, innovative, and impactful.
      </p>

      {/* Grand Challenge Selection */}
      <h2 className="text-2xl font-semibold mt-4">Chosen Grand Challenge</h2>
      <p>
        I have selected the <strong>Advancing Personalized Learning</strong> Grand Challenge.
        I chose this challenge because education and financial literacy are
        critical for empowering young adults. By leveraging AI, I aim to provide
        personalized guidance and resources that help students and young
        professionals make informed financial decisions.
      </p>

      {/* Motivation for Participating */}
      <h2 className="text-2xl font-semibold mt-4">Motivation</h2>
      <p>
        I am motivated to participate in the Grand Challenges Scholars Program
        because it merges technical innovation with societal impact. This
        program allows me to explore interdisciplinary approaches, lead
        technology-driven initiatives, and create solutions that positively
        affect communities.
      </p>

      {/* Experience */}
      <h2 className="text-2xl font-semibold mt-4">Relevant Experience</h2>
      <p>
        My primary experience relevant to this Grand Challenge is <strong>Broke2Broker</strong>,
        an AI-driven financial mentorship platform. The project provides
        students and young professionals with personalized investment guidance,
        interactive mentorship, and real-time market insights, aiming to
        improve financial literacy and decision-making.
      </p>
      <p className="italic">
        Reflection: Working on Broke2Broker strengthened my skills in AI/ML
        development, problem-solving, and human-centered design. It directly
        connects to the GCSP learning objectives by combining innovation,
        leadership, and interdisciplinary problem-solving to address a societal
        challenge.
      </p>

      {/* Additional experiences (optional) */}
      <ul className="list-disc pl-5 space-y-2 mt-4">
        <li>Teaching Fellow & Assistant for Computer Science courses</li>
        <li>AI/ML Curriculum Developer</li>
        <li>Other Projects: BizChat, Sliding Puzzle Game, MATLAB research</li>
      </ul>
    </div>
  );
}
