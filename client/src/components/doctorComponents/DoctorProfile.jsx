import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";

const DoctorProfile = () => {
  const { appointments, doctor, isDoctorAuth } = useContext(AppContext);
  const { id } = useParams();

  // ✅ find doctor by id
  const currentDoctor = doctor?.doctor?.find((item) => item._id === id);
  const currentAppointment = appointments?.appointments?.find(
    (item) => item.doctorId === id
  );

  return (
    <>
      {isDoctorAuth && (
        <section className="md:mt-18 min-h-screen bg-gradient-to-r from-purple-100 to-purple-200 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side - Doctor Details */}
              <div className="bg-white shadow-lg roundes-sm p-8 flex flex-col items-center text-center hover:shadow-xl transition">
                {currentDoctor ? (
                  <>
                    <img
                      className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-purple-300 shadow-md"
                      src={currentDoctor.docAvtar?.url || "/default-avatar.png"}
                      alt="Doctor Avatar"
                    />
                    <h2 className="text-2xl font-bold text-purple-700">
                      Dr. {currentDoctor.firstName} {currentDoctor.lastName}
                    </h2>
                    <p className="text-gray-600">{currentDoctor.email}</p>
                    <p className="text-gray-600">{currentDoctor.phone}</p>
                    <p className="text-gray-600 capitalize">
                      Gender: {currentDoctor.gender}
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
                  </>
                ) : (
                  <p className="text-gray-500">No doctor found</p>
                )}
              </div>

              {/* Right Side - Appointment Details */}
              <div className="bg-white shadow-lg roundes-sm p-8 hover:shadow-xl transition">
                {currentAppointment ? (
                  <>
                    <h3 className="text-xl font-bold mb-6 text-purple-700 border-b pb-3">
                      Patient Appointment
                    </h3>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        <span className="font-medium text-purple-700">
                          Name:
                        </span>{" "}
                        {currentAppointment.firstName}{" "}
                        {currentAppointment.lastName}
                      </p>
                      <p>
                        <span className="font-medium text-purple-700">
                          Email:
                        </span>{" "}
                        {currentAppointment.email}
                      </p>
                      <p>
                        <span className="font-medium text-purple-700">
                          Phone:
                        </span>{" "}
                        {currentAppointment.phone}
                      </p>
                      <p>
                        <span className="font-medium text-purple-700">
                          Gender:
                        </span>{" "}
                        {currentAppointment.gender}
                      </p>
                      <p>
                        <span className="font-medium text-purple-700">
                          Address:
                        </span>{" "}
                        {currentAppointment.address}
                      </p>
                      <p>
                        <span className="font-medium text-purple-700">
                          Payment Mode:
                        </span>{" "}
                        {currentAppointment.paymentMode}
                      </p>
                      <p
                        className={`mt-2 inline-block px-4 py-1 rounded-full text-sm font-semibold shadow-md ${
                          currentAppointment.paymentStatus
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {currentAppointment.paymentStatus
                          ? "Payment Done"
                          : "Pending Payment"}
                      </p>
                      <p
                        className={`mt-2 inline-block px-4 py-1 rounded-full text-sm font-semibold shadow-md ${
                          currentAppointment.hasVisited
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {currentAppointment.hasVisited
                          ? "Visited"
                          : "Not Visited"}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">No appointment found</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DoctorProfile;
