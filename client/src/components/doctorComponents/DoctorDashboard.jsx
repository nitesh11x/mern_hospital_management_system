import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Users, ClipboardList, LogOut } from "lucide-react";
import AppContext from "../../context/AppContext";

const DoctorDashboard = () => {
  const { id } = useParams();
 

  // Dummy doctors data
  const doctorsData = [
    {
      _id: "68baac380a38dd50050d5778",
      profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      department: "Cardiology",
      totalPatients: 120,
      pendingReports: 5,
    },
    {
      _id: "2",
      profileImg: "https://randomuser.me/api/portraits/women/44.jpg",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      department: "Neurology",
      totalPatients: 80,
      pendingReports: 2,
    },
  ];

  // Dummy appointments data
  const appointmentsData = [
    {
      _id: "a1",
      doctorId: "1",
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice@example.com",
      phone: "9876543210",
      appointment_time: "10:30 AM",
    },
    {
      _id: "a2",
      doctorId: "1",
      firstName: "Bob",
      lastName: "Williams",
      email: "bob@example.com",
      phone: "8765432109",
      appointment_time: "12:00 PM",
    },
    {
      _id: "a3",
      doctorId: "2",
      firstName: "Charlie",
      lastName: "Brown",
      email: "charlie@example.com",
      phone: "7654321098",
      appointment_time: "02:00 PM",
    },
  ];
//  const { doctor, appointments } = useContext(AppContext);
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate data fetching
    setLoading(true);
    const foundDoctor = doctorsData.find((doc) => doc._id === id);
    setDoctor(foundDoctor || null);

    const doctorAppointments = appointmentsData.filter(
      (appt) => appt.doctorId === id
    );
    setAppointments(doctorAppointments);

    setTimeout(() => setLoading(false), 800); // simulate delay
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-purple-700 text-xl">
        Loading Dashboard...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-xl">
        Doctor not found
      </div>
    );
  }

  return (
    <section className="min-h-screen mt-18 bg-gradient-to-r from-purple-100 to-purple-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <img
              src={doctor.profileImg || "/default-avatar.png"}
              alt="Doctor Avatar"
              className="w-16 h-16 rounded-full border-2 border-purple-600"
            />
            <div>
              <h1 className="text-3xl font-bold text-purple-700">
                Dr. {doctor.firstName} {doctor.lastName}
              </h1>
              <p className="text-gray-600">{doctor.department}</p>
              <p className="text-gray-600">{doctor.email}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            <LogOut size={18} /> Logout
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4">
            <Calendar className="text-purple-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Today’s Appointments</h2>
              <p className="text-2xl font-bold text-purple-700">
                {appointments.length}
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4">
            <Users className="text-purple-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Total Patients</h2>
              <p className="text-2xl font-bold text-purple-700">
                {doctor.totalPatients}
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4">
            <ClipboardList className="text-purple-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Pending Reports</h2>
              <p className="text-2xl font-bold text-purple-700">
                {doctor.pendingReports}
              </p>
            </div>
          </div>
        </div>

        {/* Today's Appointments */}
        <div>
          <h2 className="text-xl font-bold text-purple-700 mb-4">
            Today’s Appointments
          </h2>
          {appointments.length === 0 ? (
            <p className="text-gray-600">No appointments today.</p>
          ) : (
            <div className="bg-white shadow-md rounded-xl p-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-purple-700 border-b">
                    <th className="p-2">Patient Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Phone</th>
                    <th className="p-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt._id} className="border-b last:border-none">
                      <td className="p-2">
                        {appt.firstName} {appt.lastName}
                      </td>
                      <td className="p-2">{appt.email}</td>
                      <td className="p-2">{appt.phone}</td>
                      <td className="p-2">{appt.appointment_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DoctorDashboard;
