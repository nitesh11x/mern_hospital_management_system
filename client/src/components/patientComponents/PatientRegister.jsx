import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, Lock, User, Calendar, ArrowRight } from "lucide-react";

const PatientRegister = () => {
  const navigate = useNavigate();
  const { registerPatient } = useContext(AppContext);
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
    role: "Patient",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (patientData.password !== patientData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    let res = await registerPatient(
      patientData.firstName,
      patientData.lastName,
      patientData.email,
      patientData.phone,
      patientData.dob,
      patientData.gender,
      patientData.password
    );
    if (res.success) navigate("/patient/login");
    return res;
  };

  return (
    <section className="min-h-screen py-10 flex items-center justify-center bg-[url('/hero.jpg')] bg-cover bg-center relative mt-16">
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm"></div>

      <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl w-full max-w-2xl p-8 relative z-10 border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-500">Join us to manage your health journey</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={patientData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
              placeholder="John"
              required
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={patientData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
              placeholder="Doe"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={patientData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                placeholder="john.doe@example.com"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="tel"
                name="phone"
                value={patientData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                placeholder="+1 234 567 890"
                required
              />
            </div>
          </div>

          {/* DOB */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Date of Birth</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="date"
                name="dob"
                value={patientData.dob}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Gender</label>
            <select
              name="gender"
              value={patientData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Role (ReadOnly) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Account Role</label>
            <input
              type="text"
              name="role"
              value={patientData.role}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
            />
          </div>


          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="password"
                name="password"
                value={patientData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="password"
                name="confirmPassword"
                value={patientData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="md:col-span-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2 mt-4"
          >
            Create Account <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/patient/login"
            className="text-purple-600 font-bold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PatientRegister;
