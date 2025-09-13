import React, { useContext } from "react";
import { motion } from "framer-motion";
import AppContext from "../context/AppContext";

const BioGraphy = () => {
  const { doctor } = useContext(AppContext);
  const doc = doctor?.doctor?.[0]; // ✅ Get the first doctor safely

  if (!doc) {
    return (
      <section className="w-full bg-white py-16 flex items-center justify-center">
        <p className="text-gray-600 text-lg">No doctor data available.</p>
      </section>
    );
  }

  return (
    <section
      id="biography"
      className="w-full bg-gradient-to-r from-purple-50 to-purple-100 py-16 md:py-20 flex items-center"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-12 px-6 md:px-12">
        {/* Left: Image */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img
            src={doc.docAvtar?.url || "mdoc1.jpg"} // fallback image
            alt={`${doc.firstName} ${doc.lastName}`}
            className="w-64 sm:w-72 md:w-80 lg:w-[400px] rounded-xl shadow-xl border-4 border-purple-200"
          />
        </motion.div>

        {/* Right: Text */}
        <motion.div
          className="md:w-1/2 space-y-5 sm:space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="uppercase text-purple-600 font-semibold tracking-wide text-sm sm:text-base">
            Biography
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-900 leading-snug">
            Dr. {doc.firstName} {doc.lastName}
          </h2>
          <h4 className="text-base sm:text-lg md:text-xl text-gray-700 font-medium">
            {doc.department || "Specialist"}, New Care Hospital
          </h4>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
            Dr. {doc.firstName} {doc.lastName} has{" "}
            <span className="font-semibold">{doc.exp || "several years"}</span>{" "}
            of experience. Known for expertise in{" "}
            {doc.department || "multiple disciplines"} and dedication to
            patients, Dr. {doc.lastName} is committed to providing excellent
            care by combining modern technology with compassion.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 text-gray-700">
            <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-purple-700 font-bold text-xl">
                {doc.exp || "5+"}
              </h3>
              <p className="text-sm mt-1">Years of Experience</p>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-purple-700 font-bold text-xl mb-2">
                Research & Projects
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {doc.projects?.slice(0, 3).map((proj, idx) => (
                  <li key={idx}>{proj}</li>
                )) || (
                  <>
                    <li>Advanced Heart Surgery Study</li>
                    <li>AI in Cardiac Care</li>
                  </>
                )}
              </ul>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-purple-700 font-bold text-xl mb-2">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {doc.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {skill}
                  </span>
                )) || (
                  <>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      Cardiac Rehab
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      Surgery
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col justify-center">
              <h3
                className={`font-bold text-xl ${
                  doc.status === "Active"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {doc.status || "Inactive"}
              </h3>
              <p className="text-sm mt-1">Profile Status</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BioGraphy;
