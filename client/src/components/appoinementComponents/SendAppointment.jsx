import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate, Link } from "react-router-dom";
import { Calendar, User, Mail, Phone, MapPin, CreditCard, Stethoscope, Clock, ShieldAlert } from "lucide-react";

const SendAppointment = () => {
  const { doctor, postAppointment, isPatientAuth } = useContext(AppContext);
  const doctorData = doctor?.doctor || [];
  const navigate = useNavigate();

  const [appointmentData, setAppointmentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    appointment_date: "",
    department: "",
    doctorId: "",
    doctor_firstName: "",
    doctor_lastName: "",
    hasVisited: "",
    address: "",
    paymentMode: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const paymentModes = ["Online", "Offline"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDoctorSelect = (e) => {
    const selectedDoctor = doctorData.find((d) => d._id === e.target.value);
    if (selectedDoctor) {
      setAppointmentData((prev) => ({
        ...prev,
        doctorId: selectedDoctor._id,
        doctor_firstName: selectedDoctor.firstName,
        doctor_lastName: selectedDoctor.lastName,
        department: selectedDoctor.doctorDepartment,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await postAppointment(
        appointmentData.firstName,
        appointmentData.lastName,
        appointmentData.email,
        appointmentData.phone,
        appointmentData.dob,
        appointmentData.gender,
        appointmentData.appointment_date,
        appointmentData.department,
        appointmentData.doctor_firstName,
        appointmentData.doctor_lastName,
        appointmentData.hasVisited,
        appointmentData.address,
        appointmentData.paymentMode
      );

      setMessage("✅ Appointment booked successfully!");

      setAppointmentData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        appointment_date: "",
        department: "",
        doctorId: "",
        doctor_firstName: "",
        doctor_lastName: "",
        hasVisited: "",
        address: "",
        paymentMode: "",
      });
    } catch (error) {
      setMessage("❌ Failed to book appointment. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isPatientAuth) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[url('/hero.jpg')] bg-cover bg-center relative bg-fixed p-6">
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>
        <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl text-center">
          <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
            <ShieldAlert size={40} className="text-amber-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-gray-300 mb-8 text-lg">You must be logged in as a patient to schedule a medical appointment with our specialists.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/patient/login")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition transform hover:-translate-y-1"
            >
              Login Now
            </button>
            <button
              onClick={() => navigate("/patient/register")}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl transition transform hover:-translate-y-1"
            >
              Register
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[url('/hero.jpg')] bg-cover bg-center relative bg-fixed py-20 px-4">
      <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-[3px]"></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/50 to-purple-600/50 p-8 text-center border-b border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Calendar className="text-emerald-400" /> Book An Appointment
          </h2>
          <p className="text-gray-200">Fill out the form below to schedule your visit.</p>
        </div>

        <div className="p-8 md:p-12">
          {message && (
            <div className={`p-4 rounded-xl mb-8 text-center font-bold text-lg border ${message.includes("✅") ? "bg-green-500/20 border-green-500/30 text-green-300" : "bg-red-500/20 border-red-500/30 text-red-300"
              }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Personal Info Group */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2 mb-4">Personal Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">First Name</label>
                  <input type="text" name="firstName" value={appointmentData.firstName} onChange={handleChange} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Last Name</label>
                  <input type="text" name="lastName" value={appointmentData.lastName} onChange={handleChange} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" name="email" value={appointmentData.email} onChange={handleChange} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Phone</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="phone" value={appointmentData.phone} onChange={handleChange} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Date of Birth</label>
                  <input type="date" name="dob" value={appointmentData.dob} onChange={handleChange} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Gender</label>
                  <select name="gender" value={appointmentData.gender} onChange={handleChange} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition [&>option]:text-gray-900"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Appointment Info Group */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2 mb-4">Appointment Details</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Appointment Date</label>
                <div className="relative">
                  <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="date" name="appointment_date" value={appointmentData.appointment_date} onChange={handleChange} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Select Doctor</label>
                <div className="relative">
                  <Stethoscope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select name="doctorId" value={appointmentData.doctorId} onChange={handleDoctorSelect} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition [&>option]:text-gray-900"
                  >
                    <option value="">Choose a specialist</option>
                    {doctorData.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.firstName} {d.lastName} — {d.doctorDepartment}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Department</label>
                <input type="text" name="department" value={appointmentData.department} readOnly
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-gray-300 cursor-not-allowed"
                  placeholder="Auto-filled based on doctor"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Have you visited before?</label>
                <select name="hasVisited" value={appointmentData.hasVisited} onChange={handleChange} required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition [&>option]:text-gray-900"
                >
                  <option value="">Select status</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            {/* Address & Payment - Full Width */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Address</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-4 text-gray-400" />
                  <textarea name="address" value={appointmentData.address} onChange={handleChange} rows="3" required
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Payment Mode</label>
                <div className="relative">
                  <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select name="paymentMode" value={appointmentData.paymentMode} onChange={handleChange} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition [&>option]:text-gray-900"
                  >
                    <option value="">Select Payment Mode</option>
                    {paymentModes.map((mode, i) => (
                      <option key={i} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className={`w-full py-4 text-lg font-bold text-white rounded-xl shadow-lg transition transform hover:-translate-y-1 ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-emerald-500/20"
                  }`}
              >
                {loading ? "Processing..." : "Confirm Appointment"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default SendAppointment;
