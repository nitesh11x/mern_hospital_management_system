import React, { useContext } from "react";
import {
  FaUserMd,
  FaUserPlus,
  FaUserShield,
  FaStar,
  FaCalendarCheck,
  FaChartPie,
  FaUsers,
} from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck } from "lucide-react";

const COLORS = ["#10B981", "#F59E0B", "#EF4444"]; // Emerald, Amber, Red

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
    { label: "Total Admins", value: admin.admin?.length || 0, icon: FaUserShield, color: "blue" },
    { label: "Total Patients", value: patient.patient?.length || 0, icon: FaUsers, color: "green" },
    { label: "Total Doctors", value: doctor.doctor?.length || 0, icon: FaUserMd, color: "purple" },
    { label: "Feedbacks", value: reviews.feedbacks?.length || 0, icon: FaStar, color: "yellow" },
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

  if (!isAdminAuth) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <h1 className="text-red-500 font-bold text-2xl mb-4">Access Denied</h1>
          <p className="text-gray-600">You must be an admin to view this page.</p>
          <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Go Home</button>
        </div>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-[url('/hero.jpg')] bg-cover bg-center relative bg-fixed">
      <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm"></div>

      <div className="relative z-10 p-6 md:p-10 lg:p-12 max-w-[1600px] mx-auto mt-16">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <ShieldCheck className="text-emerald-400" /> Admin Dashboard
            </h1>
            <p className="text-gray-300 mt-2 text-lg">Overview of hospital operations and statistics.</p>
          </div>

          <div className="flex bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => navigate(`/user/admin/${admin?.admin?.[0]?._id}`)}
              className="px-5 py-2.5 text-white font-medium hover:bg-white/10 rounded-lg transition flex items-center gap-2"
            >
              <FaUserShield /> My Profile
            </button>
            <button
              onClick={() => {
                logoutAdmin();
                navigate("/");
              }}
              className="px-5 py-2.5 bg-red-500/80 hover:bg-red-600 text-white font-medium rounded-lg transition ml-2 flex items-center gap-2 shadow-lg shadow-red-500/20"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {[
            { icon: FaUserPlus, label: "Add Admin", action: () => navigate("/user/admin/register"), color: "from-blue-500 to-blue-600" },
            { icon: FaUserMd, label: "Add Doctor", action: () => navigate("/user/doctor/register"), color: "from-purple-500 to-purple-600" },
            { icon: FaUsers, label: "All Doctors", action: () => navigate("/user/doctor"), color: "from-indigo-500 to-indigo-600" },
            { icon: FaUsers, label: "All Patients", action: () => navigate("/patient/all"), color: "from-teal-500 to-teal-600" },
            { icon: FaCalendarCheck, label: "Appointments", action: () => navigate("/appointment"), color: "from-emerald-500 to-emerald-600" },
            { icon: FaStar, label: "Reviews", action: () => navigate("/reviews"), color: "from-amber-500 to-amber-600" },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              className={`bg-gradient-to-r ${btn.color} hover:contrast-110 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center justify-center gap-3 border border-white/10`}
            >
              <btn.icon size={24} className="opacity-90" />
              <span className="font-semibold text-sm">{btn.label}</span>
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((item, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-center gap-5 hover:bg-white/10 transition group">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg 
                      ${item.color === "blue" ? "bg-blue-500/20 text-blue-400" :
                  item.color === "green" ? "bg-green-500/20 text-green-400" :
                    item.color === "purple" ? "bg-purple-500/20 text-purple-400" :
                      "bg-yellow-500/20 text-yellow-400"}`}
              >
                <item.icon />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">{item.value}</h3>
                <p className="text-gray-400 font-medium">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Appointments & Chart */}
          <div className="lg:col-span-2 space-y-8">

            {/* Chart Section */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaChartPie className="text-purple-400" /> Appointment Status Distribution
              </h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={progressData}
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {progressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0.1)" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaCalendarCheck className="text-emerald-400" /> Recent Appointments
                </h2>
                <button onClick={() => navigate("/appointment")} className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-sm uppercase">
                      <th className="py-4 px-2">Patient</th>
                      <th className="py-4 px-2">Doctor</th>
                      <th className="py-4 px-2">Date</th>
                      <th className="py-4 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {appointmentStats.slice(0, 5).map((app) => (
                      <tr key={app._id} className="hover:bg-white/5 transition">
                        <td className="py-4 px-2 font-medium text-white">{app.firstName} {app.lastName}</td>
                        <td className="py-4 px-2 text-gray-400">Dr. {app.doctor.firstName} {app.doctor.lastName}</td>
                        <td className="py-4 px-2">{new Date(app.appointment_date).toLocaleDateString()}</td>
                        <td className="py-4 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${app.status === "Accepted" ? "bg-emerald-500/20 text-emerald-400" :
                              app.status === "Pending" ? "bg-amber-500/20 text-amber-400" :
                                "bg-red-500/20 text-red-400"
                            }`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {appointmentStats.length === 0 && (
                      <tr><td colSpan="4" className="text-center py-6 text-gray-500">No appointments found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Doctors List */}
          <div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaUserMd className="text-purple-400" /> Available Doctors
                </h2>
                <button onClick={() => navigate("/user/doctor")} className="text-sm text-purple-400 hover:text-purple-300 font-medium">
                  See All
                </button>
              </div>

              <div className="space-y-4">
                {doctorList.slice(0, 6).map((doc) => (
                  <div key={doc._id} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition border border-white/5">
                    <img
                      src={doc.docAvtar?.url || "/default-avatar.png"}
                      alt="doc"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                    />
                    <div>
                      <h4 className="text-white font-semibold text-sm">Dr. {doc.firstName} {doc.lastName}</h4>
                      <p className="text-xs text-purple-300">{doc.department || doc.doctorDepartment}</p>
                    </div>
                  </div>
                ))}
                {doctorList.length === 0 && (
                  <div className="text-center text-gray-500 py-10">No doctors registered yet.</div>
                )}
              </div>

              <button
                onClick={() => navigate("/user/doctor/register")}
                className="w-full mt-8 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition border border-white/10 flex items-center justify-center gap-2"
              >
                <FaUserPlus /> Add New Doctor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
