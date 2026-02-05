import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Users, ClipboardList, LogOut, Clock, MapPin, Mail, Phone } from "lucide-react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorDashboard = () => {
  const { id } = useParams();
  const { logoutDoctor, isDoctorAuth, url } = useContext(AppContext);
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use the same URL as AppState
  // const url = "https://new-care-healtcare.onrender.com/api";

  useEffect(() => {
    if (!isDoctorAuth) {
      navigate("/user/doctor/login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Doctor Profile
        const docRes = await axios.get(`${url}/user/doctor/${id}`);
        if (docRes.data.success) {
          setDoctor(docRes.data.doctor);
        }

        // Fetch Appointments (Filter by doctor ID locally or via API if supported)
        // Since we don't have a specific "get appointments by doctor" API in the list, 
        // we might need to fetch all and filter, OR use the doctor's specific endpoint if it returns appointments.
        // For now preventing over-fetching, assuming the doctor object might contain appointments or we need to fetch all.
        // Let's try fetching all appointments if the user is a doctor and filter client side for now 
        // (Not efficient for prod but works for this scale)
        const appRes = await axios.get(`${url}/appointment/all-appointments`, {
          withCredentials: true
        });

        if (appRes.data.success) {
          const myAppointments = appRes.data.appointments.filter(app => app.doctorId === id);
          setAppointments(myAppointments);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isDoctorAuth, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-xl font-semibold">
        Doctor not found or Access Denied
      </div>
    );
  }

  // Calculate stats
  const pendingAppointments = appointments.filter(a => a.status === "Pending").length;
  const acceptedAppointments = appointments.filter(a => a.status === "Accepted").length;

  return (
    <section className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={doctor.docAvtar?.url || "/default-avatar.png"}
                alt="Doctor Avatar"
                className="w-24 h-24 rounded-2xl object-cover shadow-lg border-4 border-white"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></span>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Dr. {doctor.firstName} {doctor.lastName}
              </h1>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {doctor.doctorDepartment}
              </span>
              <div className="flex items-center gap-4 text-gray-500 text-sm pt-2">
                <span className="flex items-center gap-1"><Mail size={14} /> {doctor.email}</span>
                <span className="flex items-center gap-1"><Phone size={14} /> {doctor.phone}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => { logoutDoctor(); navigate("/"); }}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium border border-red-100"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Appointments", value: appointments.length, icon: Calendar, color: "blue" },
            { label: "Pending Requests", value: pendingAppointments, icon: ClipboardList, color: "yellow" },
            { label: "Accepted Patients", value: acceptedAppointments, icon: Users, color: "green" },
            { label: "Todays Visits", value: 0, icon: Clock, color: "purple" } // Placeholder logic for today
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Appointments</h2>
          </div>

          <div className="overflow-x-auto">
            {appointments.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No appointments found.
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {appointments.map((appt) => (
                    <tr key={appt._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                            {appt.firstName[0]}{appt.lastName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{appt.firstName} {appt.lastName}</p>
                            <p className="text-xs text-gray-500">{appt.gender}, {new Date().getFullYear() - new Date(appt.dob).getFullYear()}y</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${appt.status === "Pending" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                          appt.status === "Accepted" ? "bg-green-50 text-green-700 border-green-200" :
                            "bg-red-50 text-red-700 border-red-200"
                          }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex flex-col">
                          <span className="font-medium">{new Date(appt.appointment_date).toLocaleDateString()}</span>
                          {/* <span className="text-xs">10:00 AM (Placeholder)</span> */}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1"><Mail size={12} /> {appt.email}</span>
                          <span className="flex items-center gap-1"><Phone size={12} /> {appt.phone}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDashboard;
