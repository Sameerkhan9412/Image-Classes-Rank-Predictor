import React from "react";

const page = () => {
  return (
    <section className="py-12 px-6 bg-[#1a1a1a] text-center">
      <h2 className="text-2xl font-bold mb-4">Answer Keys</h2>

      <p className="text-gray-400 max-w-xl mx-auto mb-6">
        Answer keys for AMU & JMI entrance exams will be available soon. Stay
        tuned for accurate solutions and detailed analysis.
      </p>

      <div className="bg-[#0f0f0f] border border-[#2a2a2a] p-6 rounded-xl max-w-md mx-auto">
        <p className="text-yellow-400 font-medium">
          🚧 We are working on this feature
        </p>
        <p className="text-gray-500 text-sm mt-2">
          You will soon be able to check official answer keys here.
        </p>
      </div>
    </section>
  );
};

export default page;
