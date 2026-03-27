import React from "react";

const page = () => {
  return (
    <section className="py-16 px-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Check Your Selection</h2>

      <p className="text-gray-400 max-w-xl mx-auto mb-6">
        Soon, you will be able to check your selection status instantly using
        your roll number. No need to scroll through long PDFs.
      </p>

      <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl max-w-lg mx-auto">
        <p className="text-red-500 font-semibold mb-2">🚀 Coming Soon</p>

        <p className="text-gray-400 text-sm">Enter your roll number and get:</p>

        <ul className="text-gray-500 text-sm mt-3 space-y-1">
          <li>✔ Selection Status</li>
          <li>✔ Rank / Serial Number</li>
          <li>✔ List Type (Selected / Waiting)</li>
        </ul>
      </div>
    </section>
  );
};

export default page;
