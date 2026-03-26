export default function Footer() {
  return (
    <footer className="bg-dark text-white py-6 mt-10">
      <div className="text-center">
        
        <h2 className="text-lg font-bold mb-2">Image Classes</h2>

        <p className="text-sm text-gray-300">
          Helping students achieve their dream ranks 🚀
        </p>

        <div className="mt-3 text-sm text-gray-400">
          © {new Date().getFullYear()} Image Classes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}