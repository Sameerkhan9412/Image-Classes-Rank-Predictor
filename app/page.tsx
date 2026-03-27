import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#0f0f0f] text-white">
      {/* 🔥 HERO SECTION */}
      <section className="text-center py-20 px-6 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]">
        <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">
          IMAGE CLASSES
        </h1>

        <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto">
          Predict your rank instantly for AMU & JMI entrance exams and boost
          your preparation with accurate insights.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/rank-predictor">
            <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold">
              🚀 Predict Rank
            </button>
          </Link>

          <Link href="/rank-predictor">
            <button className="border border-red-500 px-6 py-3 rounded-xl hover:bg-red-600 transition">
              🔍 Check Rank
            </button>
          </Link>
        </div>
      </section>

      {/* 🔥 FEATURES */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2a2a2a] text-center">
            <h3 className="text-red-500 font-bold mb-2">Accurate Prediction</h3>
            <p className="text-gray-400 text-sm">
              Get rank prediction based on real data & analysis.
            </p>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2a2a2a] text-center">
            <h3 className="text-red-500 font-bold mb-2">Instant Result</h3>
            <p className="text-gray-400 text-sm">
              No waiting. Get your predicted rank instantly.
            </p>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#2a2a2a] text-center">
            <h3 className="text-red-500 font-bold mb-2">Trusted by Students</h3>
            <p className="text-gray-400 text-sm">
              Used by hundreds of students preparing for AMU & JMI.
            </p>
          </div>
        </div>
      </section>

      {/* 🔥 ANSWER KEYS */}
      <section className="py-12 px-6 bg-[#1a1a1a]">
        <h2 className="text-2xl font-bold text-center mb-8">Answer Keys</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* AMU */}
          <div className="border border-[#2a2a2a] p-5 rounded-xl hover:border-red-500 transition">
            <h3 className="font-bold text-red-500 mb-3">AMU</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>Class 6 Answer Key</li>
              <li>Class 9 Answer Key</li>
              <li>Class 11 PCM</li>
            </ul>
          </div>

          {/* JMI */}
          <div className="border border-[#2a2a2a] p-5 rounded-xl hover:border-red-500 transition">
            <h3 className="font-bold text-red-500 mb-3">JMI</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>Class 9 Answer Key</li>
              <li>Class 11 Science</li>
              <li>Commerce</li>
            </ul>
          </div>

          {/* MORE */}
          <div className="border border-[#2a2a2a] p-5 rounded-xl hover:border-red-500 transition">
            <h3 className="font-bold text-red-500 mb-3">More</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>Previous Year Papers</li>
              <li>Sample Papers</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Check Your Selection</h2>

        <p className="text-gray-400 max-w-xl mx-auto mb-6">
          Soon, you will be able to check your selection status instantly using
          your roll number. No need to scroll through long PDFs.
        </p>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl max-w-lg mx-auto">
          <p className="text-red-500 font-semibold mb-2">🚀 Coming Soon</p>

          <p className="text-gray-400 text-sm">
            Enter your roll number and get:
          </p>

          <ul className="text-gray-500 text-sm mt-3 space-y-1">
            <li>✔ Selection Status</li>
            <li>✔ Rank / Serial Number</li>
            <li>✔ List Type (Selected / Waiting)</li>
          </ul>
        </div>
      </section>

      {/* 🔥 CTA */}
      <section className="text-center py-16 px-6">
        <h2 className="text-2xl font-bold mb-4">Ready to Check Your Rank?</h2>

        <Link href="/rank-predictor">
          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold">
            Start Now 🚀
          </button>
        </Link>
      </section>
    </div>
  );
}
