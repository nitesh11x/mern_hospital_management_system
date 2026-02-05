import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import AppContext from "../../context/AppContext";
import {
  FaUserMd,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaTransgender,
  FaCalendarCheck,
} from "react-icons/fa";
import { Mail, Phone, User, Stethoscope } from "lucide-react";

const DoctorAbout = () => {
  const { doctor } = useContext(AppContext);
  const { id } = useParams();

  // ✅ find doctor by id
  const currentDoctor = doctor?.doctor?.find((item) => item._id === id);

  return (
    <section className="min-h-screen py-24 bg-[url('/hero.jpg')] bg-cover bg-center relative bg-fixed">
      <div className="absolute inset-0 bg-blue-900/70 backdrop-blur-sm"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {currentDoctor ? (
          <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/20">
            {/* Header / Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-40 md:h-52 relative">
              <div className="absolute -bottom-16 left-6 md:left-12">
                <div className="p-2 bg-white rounded-full">
                  <img
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg bg-gray-200"
                    src={currentDoctor.docAvtar?.url || "/default-avatar.png"}
                    alt="Doctor Avatar"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-20 px-6 md:px-12 pb-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Dr. {currentDoctor.firstName} {currentDoctor.lastName}
                  </h1>
                  <p className="text-xl text-purple-600 font-medium mt-1 flex items-center gap-2">
                    <Stethoscope size={20} />
                    {currentDoctor.doctorDepartment || "Specialist"}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Link to="/appointment" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-green-500/30 transition flex items-center gap-2">
                    <FaCalendarCheck /> Book Appointment
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - Details */}
                <div className="md:col-span-2 space-y-8">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FaBriefcase className="text-blue-500" /> About Doctor
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Dr. {currentDoctor.firstName} {currentDoctor.lastName} is a dedicated {currentDoctor.doctorDepartment} specialist with over {currentDoctor.exp || "5+"} years of experience in the medical field.
                      Committed to providing top-quality healthcare and ensuring patient well-being through advanced medical practices.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {(currentDoctor.skills || ["Patient Care", "Diagnosis", "Surgery", "Consultation"]).map((skill, index) => (
                        <span key={index} className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg border border-blue-100 shadow-sm text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Contact Card */}
                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 h-fit">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-blue-100 pb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                        <p className="text-gray-900 font-medium text-sm break-all">{currentDoctor.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Phone</p>
                        <p className="text-gray-900 font-medium text-sm">{currentDoctor.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Gender</p>
                        <p className="text-gray-900 font-medium text-sm capitalize">{currentDoctor.gender}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/95 backdrop-blur-xl p-12 text-center rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Doctor Not Found</h2>
            <p className="text-gray-500 mb-6">We couldn't find the doctor you're looking for.</p>
            <Link to="/user/doctor" className="text-blue-600 font-semibold hover:underline">
              Browse all doctors
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorAbout;
