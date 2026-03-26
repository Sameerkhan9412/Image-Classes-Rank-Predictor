"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className=" shadow-md px-6 py-3 flex justify-between items-center">
      
      {/* Logo */}
      <h1 className="text-xl font-bold text-primary">
        IMAGE CLASSES
      </h1>

      {/* Links */}
      <div className="flex gap-6 items-center">
        <Link href="/" className="hover:text-primary">Home</Link>
        <Link href="/rank-predictor" className="hover:text-primary">
          Rank Predictor
        </Link>
        <Link href="#answer-keys" className="hover:text-primary">
          Answer Keys
        </Link>

        {/* CTA */}
        <Link href="/rank-predictor">
          <button className="bg-primary text-white px-4 py-2 rounded-lg">
            Predict Rank
          </button>
        </Link>
      </div>
    </nav>
  );
}