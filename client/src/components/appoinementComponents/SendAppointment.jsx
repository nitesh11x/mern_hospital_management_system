import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

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
      const res = await postAppointment(
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
      console.log("Appointment response:", res);

      // reset form
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

  return (
    <>
      {!isPatientAuth && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-purple-50 to-white px-4">
          <div className="bg-white shadow-lg rounded-sm p-8 text-center max-w-md w-full border border-purple-200">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              Please Login or Register
            </h2>
            <p className="text-gray-600 mb-6">
              You must be logged in to book an appointment.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/patient/login")}
                className="px-6 py-2 bg-purple-600 text-white rounded-sm shadow hover:bg-purple-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/patient/register")}
                className="px-6 py-2 bg-purple-100 text-purple-700 border border-purple-300 rounded-sm hover:bg-purple-200 transition"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {isPatientAuth && (
        <section className="min-h-screen mt-10 flex items-center justify-center bg-gradient-to-br from-purple-200 via-purple-100 to-purple-50 px-4 py-10">
          <div className="w-full max-w-3xl bg-white/90 backdrop-blur-lg shadow-xl rounded-sm p-8 sm:p-12 border border-purple-200">
            <h2 className="text-3xl font-extrabold text-purple-800 text-center mb-10">
              Book Appointment
            </h2>

            {message && (
              <p
                className={`text-center mb-6 font-medium ${
                  message.includes("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={appointmentData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-sm border border-purple-300 focus:ring-2 focus:ring-purple-500 bg-purple-50/70"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={appointmentData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-sm border border-purple-300 focus:ring-2 focus:ring-purple-500 bg-purple-50/70"
                />
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={appointmentData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-sm border border-purple-300 focus:ring-2 focus:ring-purple-500 bg-purple-50/70"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={appointmentData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-sm border border-purple-300 focus:ring-2 focus:ring-purple-500 bg-purple-50/70"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={appointmentData.dob}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-sm border border-purple-300 focus:ring-2 focus:ring-purple-500 bg-purple-50/70"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={appointmentData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-sm border border-purple-300 focus:ring-2 focus:ring-purple-500 bg-purple-50/70"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Appointment Date */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Appointment Date
                </label>
                <input
                  type="date"
                  name="appointment_date"
                  value={appointmentData.appointment_date}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-sm border border-purple-300 focus:ring-2 focus:ring-purple-500 bg-purple-50/70"
                />
              </div>

              {/* Doctor Dropdown */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Select Doctor
                </label>
                <select
                  name="doctorId"
                  value={appointmentData.doctorId}
                  onChange={handleDoctorSelect}
                  required
                  className="w-full p-3 rounded-sm border border-purple-300 focus:ring-2 focus:ring-purple-500 bg-purple-50/70"
                >
                  <option value="">Select Doctor</option>
                  {doctorData.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.firstName} {d.lastName} — {d.doctorDepartment}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department (Auto-filled) */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={appointmentData.department}
                  readOnly
                  className="w-full p-3 rounded-sm border border-purple-300 bg-purple-100 text-gray-700"
                />
              </div>

              {/* Has Visited */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Have you visited before?
                </label>
                <select
                  name="hasVisited"
                  value={appointmentData.hasVisited}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-sm border border-purple-300 focus:ring-2 focus:ring-purple-500 bg-purple-50/70"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={appointmentData.address}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="w-full p-3 rounded-sm border border-purple-300 focus:ring-2 focus:ring-purple-500 bg-purple-50/70"
                ></textarea>
              </div>

              {/* Payment Mode */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Payment Mode
                </label>
                <select
                  name="paymentMode"
                  value={appointmentData.paymentMode}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-sm border border-purple-300 focus:ring-2 focus:ring-purple-500 bg-purple-50/70"
                >
                  <option value="">Select Payment Mode</option>
                  {paymentModes.map((mode, i) => (
                    <option key={i} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`sm:col-span-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 rounded-sm shadow-lg transition ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:from-purple-700 hover:to-purple-800 focus:ring-2 focus:ring-purple-400"
                }`}
              >
                {loading ? "Submitting..." : "Submit Appointment"}
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default SendAppointment;
