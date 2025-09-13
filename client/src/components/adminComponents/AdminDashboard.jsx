import React, { useContext } from "react";
import {
  FaUserMd,
  FaUserPlus,
  FaUserShield,
  FaStar,
  FaCalendarCheck,
} from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const COLORS = ["#00D10A", "#FAF300", "#D10000"]; // green, yellow, red

const AdminDashboard = () => {
  const {
    isAdminAuth,
    logoutAdmin,
    reviews,
    admin,
    doctor,
    patient,
    appointments,
  } = useContext(AppContext);
  const navigate = useNavigate();

  // Stats
  const stats = [
    { label: "Admins", value: admin.admin?.length || 0 },
    { label: "Patients", value: patient.patient?.length || 0 },
    { label: "Doctors", value: doctor.doctor?.length || 0 },
    { label: "Reviews", value: reviews.feedbacks?.length || 0 },
  ];

  // Appointment stats
  const appointmentStats = appointments?.appointments || [];

  const acceptedCount = appointmentStats.filter(
    (r) => r.status === "Accepted"
  ).length;
  const pendingCount = appointmentStats.filter(
    (r) => r.status === "Pending"
  ).length;
  const rejectedCount = appointmentStats.filter(
    (r) => r.status === "Rejected"
  ).length;

  const progressData = [
    { name: "Accepted", value: acceptedCount },
    { name: "Pending", value: pendingCount },
    { name: "Rejected", value: rejectedCount },
  ];

  // Doctor list
  const doctorList = doctor?.doctor || [];

  return (
    <>
      {!isAdminAuth ? (
        <div className="flex justify-center items-center w-screen h-screen bg-red-400">
          <h1 className="text-white font-bold text-lg">
            You are not Admin to access this route
          </h1>
        </div>
      ) : (
        <section className="w-full min-h-screen mt-18 bg-gradient-to-r from-purple-50 to-purple-100 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Logout buttons */}
            <div className="flex gap-4 mb-6">
              <button
                className="text-white bg-red-600 px-4 py-2 rounded-sm hover:bg-red-700"
                onClick={() => {
                  logoutAdmin();
                  navigate("/");
                }}
              >
                Logout Admin
              </button>
              <button
                onClick={() => navigate(`/user/admin/${admin?.admin?.[0]?._id}`)}
                className="text-white bg-green-600 px-4 py-2 rounded-sm hover:bg-green-700 cursor-pointer "
              >
                Admin Profile
              </button>
            </div>

            <h1 className="text-4xl font-bold text-purple-900 text-center mb-8">
              Admin Dashboard
            </h1>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
              <button
                onClick={() => navigate("/user/admin/register")}
                className="flex items-center cursor-pointer gap-2 bg-purple-600 text-white px-3 py-2 rounded-sm text-sm font-medium hover:bg-purple-700 transition"
              >
                <FaUserShield /> Add New Admin
              </button>
              <button
                onClick={() => navigate("/user/doctor/register")}
                className="flex items-center cursor-pointer gap-2 bg-purple-600 text-white px-3 py-2 rounded-sm text-sm font-medium hover:bg-purple-700 transition"
              >
                <FaUserPlus /> Add New Doctor
              </button>
              <button
                onClick={() => navigate("/user/doctor")}
                className="flex items-center cursor-pointer gap-2 bg-purple-600 text-white px-3 py-2 rounded-sm text-sm font-medium hover:bg-purple-700 transition"
              >
                <FaUserMd /> View All Doctors
              </button>
              <button
                onClick={() => navigate("/reviews")}
                className="flex items-center cursor-pointer gap-2 bg-purple-600 text-white px-3 py-2 rounded-sm text-sm font-medium hover:bg-purple-700 transition"
              >
                <FaStar /> View Reviews
              </button>
              <button
                onClick={() => navigate("/appointment")}
                className="flex items-center cursor-pointer gap-2 bg-purple-600 text-white px-3 py-2 rounded-sm text-sm font-medium hover:bg-purple-700 transition"
              >
                <FaCalendarCheck /> View Appointments
              </button>
              <button
                onClick={() => navigate("/patient/all")}
                className="flex items-center cursor-pointer gap-2 bg-purple-600 text-white px-3 py-2 rounded-sm text-sm font-medium hover:bg-purple-700 transition"
              >
                <FaCalendarCheck /> View All Patient
              </button>
            </div>

            {/* Stats */}
            <div className="grid cursor-pointer grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((item, i) => (
                <div
                  key={i}
                  className="bg-white shadow-md rounded-sm p-6 text-center hover:shadow-xl transition"
                >
                  <h2 className="text-3xl font-bold text-purple-700">
                    {item.value}
                  </h2>
                  <p className="text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 cursor-pointer lg:grid-cols-3 gap-8">
              {/* Appointment Overview */}
              <div className="bg-white shadow-md rounded-sm p-6">
                <h2 className="text-lg font-semibold text-purple-700 mb-4">
                  Weekly Appointments
                </h2>
                <button
                  onClick={() => navigate("/appointment")}
                  className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-sm text-sm font-medium hover:bg-purple-700 transition"
                >
                  <FaCalendarCheck /> View Appointments
                  <span>{appointmentStats.length}</span>
                </button>
                <h3 className="text-sm font-semibold text-purple-600 mt-4 mb-2">
                  Recent Accepted Appointments
                </h3>
                <ul className="space-y-2 max-h-40 overflow-y-auto">
                  {appointmentStats
                    .filter((app) => {
                      const appDate = new Date(app.appointment_date);
                      const today = new Date();
                      return app.status === "Accepted" && appDate >= today;
                    })
                    .slice(0, 5)
                    .map((app) => (
                      <li
                        key={app._id}
                        className="flex justify-between items-center bg-purple-50 px-3 py-2 rounded-sm"
                      >
                        <span className="capitalize">
                          Patient: {app.firstName} {app.lastName}
                        </span>
                        <span className="capitalize text-sm">
                          Doctor: {app.doctor.firstName} {app.doctor.lastName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(app.appointment_date).toLocaleDateString()}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Appointment Status Pie Chart */}
              <div className="bg-white shadow-md rounded-sm p-6 flex flex-col items-center">
                <h2 className="text-lg font-semibold text-purple-700 mb-4">
                  Appointment Status Overview
                </h2>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={progressData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                    >
                      {progressData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <ul className="flex gap-4 mt-4 text-sm">
                  {progressData.map((item, i) => (
                    <li key={i} className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[i] }}
                      ></span>
                      {item.name}: {item.value}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Doctors Summary */}
              <div className="bg-white shadow-md rounded-sm p-6">
                <h2 className="text-lg font-semibold text-purple-700 mb-4">
                  Doctors Overview
                </h2>
                {doctorList.length > 0 ? (
                  <ul className="space-y-2 max-h-64 overflow-y-auto">
                    {doctorList.slice(0, 6).map((doc) => (
                      <li
                        key={doc._id}
                        className="flex justify-between items-center bg-purple-50 px-3 py-2 rounded-sm"
                      >
                        <div>
                          <p className="font-semibold text-purple-700">
                            {doc.firstName} {doc.lastName}
                          </p>
                          <p className="text-xs text-gray-600">
                            {doc.department}
                          </p>
                        </div>
                        <div className="text-right text-xs text-gray-600">
                          <p>{doc.email}</p>
                          <p>{doc.phone}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No doctors available</p>
                )}
                <button
                  onClick={() => navigate("/user/doctor")}
                  className="mt-4 w-full bg-purple-600 text-white px-3 py-2 rounded-sm text-sm font-medium hover:bg-purple-700 transition"
                >
                  View All Doctors
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminDashboard;
