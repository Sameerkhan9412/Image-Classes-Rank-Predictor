import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const socialLinks = [
  { icon: <FaFacebookF />, url: "https://facebook.com" },
  { icon: <FaInstagram />, url: "https://instagram.com" },
  { icon: <FaTwitter />, url: "https://twitter.com" },
  { icon: <FaYoutube />, url: "https://youtube.com" },
];
export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & About */}
          <div className="md:col-span-2">
            {/* BRAND */}
            <div>
              <Link
                href="/"
                className="flex items-center bg-white rounded-md max-w-fit mb-4"
              >
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

            <p className="text-gray-400 mb-6 max-w-md">
              Your trusted partner for AMU & JMI entrance exam preparation.
              Accurate predictions, expert guidance, and comprehensive
              resources.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-all hover:scale-110"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              {[
                "Rank Predictor",
                "Answer Keys",
                "Study Material",
                "Contact Us",
              ].map((link, i) => (
                <li
                  key={i}
                  className="hover:text-red-400 cursor-pointer transition-colors"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Exams</h4>
            <ul className="space-y-2 text-gray-400">
              {[
                "AMU Class 6",
                "AMU Class 9",
                "AMU Class 11",
                "JMI Entrance",
              ].map((link, i) => (
                <li
                  key={i}
                  className="hover:text-red-400 cursor-pointer transition-colors"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2026 Image Classes. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
