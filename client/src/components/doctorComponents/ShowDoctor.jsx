import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { FaEdit, FaTrash, FaCalendarCheck, FaUserMd } from "react-icons/fa";
import { Link } from "react-router-dom";
const ShowDoctor = () => {
  const { doctor, isAdminAuth, deleteDoctorById } = useContext(AppContext);
  const docList = doctor?.doctor || [];
  const handleDeleteDoctor = async (id) => {
    const confirmDelete = window.confirm("Are You Sure to Delete This Doctor ");
    if (!confirmDelete) return;
    const result = await deleteDoctorById(id);
    return result;
  };

  return (
    <section className="p-6 md:p-12 mt-20 bg-gradient-to-r from-purple-50 to-purple-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-900 mb-10">
        Our Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {docList.map((data) => (
          <div
            key={data._id}
            className="bg-white shadow-lg rounded-sm p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition transform"
          >
            {/* Doctor Image */}
            <Link to={`/user/doctor/about/${data._id}`}>
              <img
                src={data.docAvtar?.url}
                alt={`${data.firstName} ${data.lastName}`}
                className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-purple-200"
              />
            </Link>

            <h2 className="text-xl capitalize font-semibold text-purple-800">
              {data.firstName} {data.lastName}
            </h2>
            <p className="text-sm font-medium uppercase text-purple-600 mb-1">
              {data.doctorDepartment}
            </p>
            <p className="text-sm text-gray-600">{data.gender}</p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {isAdminAuth && (
                <>
                  <Link
                    to={data._id}
                    className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-sm hover:bg-blue-200 transition text-sm cursor-pointer"
                  >
                    <FaUserMd /> View Doctor Details
                  </Link>
                  <Link
                    to={`/user/doctor/edit/${data._id}`}
                    className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-sm hover:bg-purple-200 transition text-sm cursor-pointer"
                  >
                    <FaEdit /> Edit
                  </Link>
                  <button
                    onClick={() => {
                      handleDeleteDoctor(data._id), window.location.reload();
                    }}
                    className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-sm hover:bg-red-200 transition text-sm cursor-pointer"
                  >
                    <FaTrash /> Delete
                  </button>
                </>
              )}

              {/* Appointment */}
              <Link
                to={"/appointment/send"}
                className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-sm hover:bg-green-200 transition text-sm cursor-pointer"
              >
                <FaCalendarCheck />
                Get Appointment
              </Link>

              {/* Doctor Details */}
              <Link
                to={`/user/doctor/about/${data._id}`}
                className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-sm hover:bg-blue-200 transition text-sm cursor-pointer"
              >
                <FaUserMd /> More About Doctor
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShowDoctor;
