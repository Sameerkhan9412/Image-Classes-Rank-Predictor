"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await axios.post("/api/admin/logout");
    window.location.href = "/admin/login";
  };

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-primary text-white"
        : "hover:bg-gray-700"
    }`;

  return (
    <div className="w-64 bg-dark text-white p-4 flex flex-col justify-between min-h-screen">
      
      {/* Top Section */}
      <div>
        <h2 className="text-xl font-bold mb-6 text-primary">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-2">
          <Link href="/admin" className={linkClass("/admin")}>
            Dashboard
          </Link>
          <Link href="/admin/rules" className={linkClass("/admin/dataset")}>
            Rules
          </Link>

          <Link href="/admin/predictions" className={linkClass("/admin/predictions")}>
            Predictions
          </Link>

          <Link href="/admin/students" className={linkClass("/admin/users")}>
            Students
          </Link>
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg mt-6"
        >
          Logout
        </button>
      </div>
    </div>
  );
}