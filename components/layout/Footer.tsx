import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-[#2a2a2a] mt-10">

      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">

        {/* BRAND */}
        <div>
          <Link href="/" className="flex items-center bg-white rounded-md max-w-fit mb-2">
          <Image
            src="/logo.png"
            alt="Image Classes"
            width={140}
            height={45}
            className="object-contain"
            loading="eager"
          />
        </Link>
          <p className="text-gray-400 text-sm">
            Helping students achieve top ranks in AMU & JMI entrance exams.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-red-500">Home</Link>
            </li>
            <li>
              <Link href="/predict" className="hover:text-red-500">
                Rank Predictor
              </Link>
            </li>
            <li>
              <Link href="/check-rank" className="hover:text-red-500">
                Check Rank
              </Link>
            </li>
            <li>
              <Link href="/answer-keys" className="hover:text-red-500">
                Answer Keys
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-gray-400 text-sm">
            📧 support@imageclasses.com
          </p>
          <p className="text-gray-400 text-sm">
            📞 +91 XXXXX XXXXX
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-gray-500 text-sm border-t border-[#2a2a2a] py-3">
        © {new Date().getFullYear()} Image Classes. All rights reserved.
      </div>
    </footer>
  );
}