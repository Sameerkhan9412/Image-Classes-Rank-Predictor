import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>

      {/* HERO */}
      <section className="text-center py-16 bg-gradient-to-br">
        <h1 className="text-4xl font-bold text-primary mb-4">
          IMAGE CLASSES
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Predict your rank instantly & check answer keys
        </p>

        <Link href="/rank-predictor">
          <button className="bg-primary text-white px-6 py-3 rounded-xl">
            Start Rank Prediction 🚀
          </button>
        </Link>
      </section>

      {/* 🔥 ANSWER KEYS SECTION */}
      <section id="answer-keys" className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          Answer Keys
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {/* AMU */}
          <div className=" shadow p-4 rounded-xl">
            <h3 className="font-bold text-primary mb-2">AMU</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Class 6 Answer Key</li>
              <li>Class 9 Answer Key</li>
              <li>Class 11 PCM</li>
            </ul>
          </div>

          {/* JMI */}
          <div className=" shadow p-4 rounded-xl">
            <h3 className="font-bold text-primary mb-2">JMI</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Class 9 Answer Key</li>
              <li>Class 11 Science</li>
              <li>Commerce</li>
            </ul>
          </div>

          {/* More */}
          <div className=" shadow p-4 rounded-xl">
            <h3 className="font-bold text-primary mb-2">More</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Previous Year Papers</li>
              <li>Sample Papers</li>
            </ul>
          </div>

        </div>
      </section>
    </>
  );
}