import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { FaEdit, FaTrash, FaCalendarCheck, FaUserMd, FaStethoscope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ShowDoctor = () => {
  const { doctor, isAdminAuth, isPatientAuth, deleteDoctorById } = useContext(AppContext);
  const navigate = useNavigate();
  const docList = doctor?.doctor || [];

  const handleDeleteDoctor = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmDelete) return;
    const result = await deleteDoctorById(id);
    if (result && result.success) {
      // Optional: refresh or update state
      window.location.reload();
    }
  };

  const handleBookAppointment = (e) => {
    if (!isPatientAuth && !isAdminAuth) {
      e.preventDefault();
      toast.info("Please login to book appointments!");
      // Optional: Redirect to login after toast
      setTimeout(() => navigate("/patient/login"), 2000);
    }
  };

  return (
    <section className="min-h-screen py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Meet Our <span className="text-blue-600">Specialists</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experienced medical professionals dedicated to providing excellent care.
          </p>
        </div>

        {docList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xl">No doctors available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {docList.map((data) => (
              <div
                key={data._id}
                className="group bg-white rounded-3xl p-6 shadow-lg shadow-gray-100 border border-gray-100 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition duration-300 flex flex-col"
              >
                {/* Header / Avatar */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-cyan-400 mb-4">
                      <img
                        src={data.docAvtar?.url || "/default-avatar.png"}
                        alt={`${data.firstName} ${data.lastName}`}
                        className="w-full h-full rounded-full object-cover border-4 border-white bg-white"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                      />
                    </div>
                    <span className="absolute bottom-4 right-0 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Dr. {data.firstName} {data.lastName}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                    <FaStethoscope className="text-xs" /> {data.doctorDepartment}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-500 border-b border-gray-100 pb-2">
                    <span>Gender</span>
                    <span className="font-medium text-gray-700 capitalize">{data.gender}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 border-b border-gray-100 pb-2">
                    <span>Experience</span>
                    <span className="font-medium text-gray-700">5+ Years</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 gap-3 mt-auto">
                  <Link
                    to={"/appointment/send"}
                    onClick={handleBookAppointment}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-blue-500/20"
                  >
                    <FaCalendarCheck /> Book Appointment
                  </Link>

                  <Link
                    to={`/user/doctor/about/${data._id}`}
                    className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-medium transition border border-gray-200"
                  >
                    <FaUserMd /> View Profile
                  </Link>

                  {isAdminAuth && (
                    <div className="grid grid-cols-2 gap-3 mt-2 pt-4 border-t border-gray-100">
                      <Link
                        to={`/user/doctor/edit/${data._id}`}
                        className="flex items-center justify-center gap-1 bg-amber-50 text-amber-600 hover:bg-amber-100 py-2 rounded-lg text-sm font-medium transition"
                      >
                        <FaEdit /> Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteDoctor(data._id)}
                        className="flex items-center justify-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-lg text-sm font-medium transition"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShowDoctor;
