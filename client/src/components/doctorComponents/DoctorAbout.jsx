import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import {
  FaUserMd,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaTransgender,
} from "react-icons/fa";

const DoctorAbout = () => {
  const { doctor } = useContext(AppContext);
  const { id } = useParams();

  // ✅ find doctor by id
  const currentDoctor = doctor?.doctor?.find((item) => item._id === id);

  return (
    <section className="md:mt-18 min-h-screen bg-gradient-to-r from-purple-100 to-purple-200 p-6">
      <div className="max-w-5xl mx-auto">
        {currentDoctor ? (
          <div className="bg-white shadow-lg rounded-sm p-8 hover:shadow-2xl transition">
            {/* Doctor Avatar and Basic Info */}
            <div className="flex flex-col items-center text-center">
              <img
                className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-purple-300 shadow-md"
                src={currentDoctor.docAvtar?.url || "/default-avatar.png"}
                alt="Doctor Avatar"
              />
              <h2 className="text-3xl font-bold text-purple-700">
                Dr. {currentDoctor.firstName} {currentDoctor.lastName}
              </h2>
              <p className="text-gray-600 text-lg capitalize mt-1">
                {currentDoctor.doctorDepartment || "General Specialist"}
              </p>
              <p
                className={`mt-3 px-4 py-1 rounded-full text-sm font-semibold shadow-md ${
                  currentDoctor.status === "Accepted"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {currentDoctor.status}
              </p>
            </div>

            {/* Doctor Details */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-semibold text-purple-700 border-b pb-2">
                  About Doctor
                </h3>
                <p>
                  Dr. {currentDoctor.firstName} {currentDoctor.lastName} is a{" "}
                  {currentDoctor.department || "specialized"} doctor with{" "}
                  {currentDoctor.exp || "several"} years of experience. Known
                  for providing exceptional care and compassionate treatment.
                </p>
              </div>

              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-semibold text-purple-700 border-b pb-2">
                  Contact Information
                </h3>
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-purple-600" />{" "}
                  {currentDoctor.email}
                </p>
                <p className="flex items-center gap-2">
                  <FaPhone className="text-purple-600" /> {currentDoctor.phone}
                </p>
                <p className="flex items-center gap-2 capitalize">
                  <FaTransgender className="text-purple-600" />{" "}
                  {currentDoctor.gender}
                </p>
              </div>
            </div>

            {/* Skills & Experience */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 text-gray-700">
                <h3 className="text-xl font-semibold text-purple-700 border-b pb-2">
                  Skills & Expertise
                </h3>
                <ul className="list-disc ml-6 space-y-2">
                  {(currentDoctor.skills && currentDoctor.skills.length > 0
                    ? currentDoctor.skills
                    : ["Patient Care", "Diagnosis", "Treatment Planning"]
                  ).map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 text-gray-700">
                <h3 className="text-xl font-semibold text-purple-700 border-b pb-2">
                  Professional Experience
                </h3>
                <p className="flex items-center gap-2">
                  <FaBriefcase className="text-purple-600" />{" "}
                  {currentDoctor.exp || "5+ years"} of medical practice
                </p>
                <p>
                  Has worked with reputed hospitals and clinics delivering
                  high-quality medical care.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No doctor found</p>
        )}
      </div>
    </section>
  );
};

export default DoctorAbout;
