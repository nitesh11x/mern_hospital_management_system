import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { User, Mail, Phone, MapPin, CreditCard, CheckCircle, Clock } from "lucide-react";

const DoctorProfile = () => {
  const { appointments, doctor, isDoctorAuth } = useContext(AppContext);
  const { id } = useParams();

  // ✅ find doctor by id
  const currentDoctor = doctor?.doctor?.find((item) => item._id === id);
  // NOTE: This logic might be flawed if 'appointments' defaults to empty for non-admins. 
  // Ideally, DoctorDashboard handles this. DoctorProfile might be legacy?
  // But let's style it anyway.
  const currentAppointment = appointments?.appointments?.find(
    (item) => item.doctorId === id
  );

  return (
    <>
      {isDoctorAuth && (
        <section className="min-h-screen pt-24 pb-12 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-purple-600 pl-4">
              Profile Overview
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Doctor Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-24 relative"></div>
                <div className="px-8 pb-8">
                  <div className="relative -mt-12 mb-6 text-center">
                    <img
                      className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg bg-white"
                      src={currentDoctor?.docAvtar?.url || "/default-avatar.png"}
                      alt="Doctor Avatar"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                    />
                  </div>

                  {currentDoctor ? (
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Dr. {currentDoctor.firstName} {currentDoctor.lastName}
                      </h2>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${currentDoctor.status === "Accepted" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                        {currentDoctor.status}
                      </span>

                      <div className="mt-8 space-y-4 text-left">
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                          <Mail className="text-purple-600" size={20} />
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="font-medium text-gray-900">{currentDoctor.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                          <Phone className="text-purple-600" size={20} />
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="font-medium text-gray-900">{currentDoctor.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                          <User className="text-purple-600" size={20} />
                          <div>
                            <p className="text-xs text-gray-500">Gender</p>
                            <p className="font-medium text-gray-900 capitalize">{currentDoctor.gender}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No doctor details found.</p>
                  )}
                </div>
              </div>

              {/* Right Side - Appointment Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  Latest Appointment Interest
                </h3>

                {currentAppointment ? (
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                          {currentAppointment.firstName[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{currentAppointment.firstName} {currentAppointment.lastName}</h4>
                          <p className="text-sm text-gray-500">Patient</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-medium text-sm">{currentAppointment.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-medium text-sm">{currentAppointment.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="font-medium text-sm">{currentAppointment.address}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Payment</p>
                        <p className="font-medium text-sm">{currentAppointment.paymentMode}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${currentAppointment.paymentStatus ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                        <CreditCard size={14} />
                        {currentAppointment.paymentStatus ? "Paid" : "Unpaid"}
                      </span>
                      <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${currentAppointment.hasVisited ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                        }`}>
                        {currentAppointment.hasVisited ? <CheckCircle size={14} /> : <Clock size={14} />}
                        {currentAppointment.hasVisited ? "Visited" : "Not Visited"}
                      </span>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p>No active appointment details found.</p>
                  </div>
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
