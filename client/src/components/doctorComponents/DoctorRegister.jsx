import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Calendar, Lock, Stethoscope, Upload, CheckCircle } from "lucide-react";

const DoctorRegister = () => {
  const { registerDoctor, isAdminAuth } = useContext(AppContext);
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    role: "Doctor",
    doctorDepartment: "",
    status: "Accepted",
  });

  const [docAvtar, setDocAvtar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const departments = [
    "Cardiology", "Neurology", "Radiology", "Pharmacy",
    "General Surgery", "Orthopedics", "Pediatrics",
    "Dermatology", "Oncology", "Psychiatry", "Gynecology"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDocAvtar(file);
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (docAvtar) {
      formData.append("docAvtar", docAvtar);
    }
    Object.entries(doctorData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      let response = await registerDoctor(formData);
      if (response && response.success) { // Fixed: Ensure success check
        navigate("/user/doctor/login");
      }
    } catch (error) {
      console.error("Doctor register error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdminAuth) return null;

  return (
    <section className="min-h-screen py-20 bg-[url('/hero.jpg')] bg-cover bg-center relative bg-fixed flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-4xl p-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">

          <div className="bg-gradient-to-r from-purple-600/80 to-blue-600/80 p-8 text-center border-b border-white/10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <Stethoscope size={32} /> Register New Doctor
            </h1>
            <p className="text-gray-200">Add a new specialist to the medical team</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">

            {/* Avatar Upload */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-32 h-32 rounded-full border-4 border-white/30 bg-white/10 flex items-center justify-center overflow-hidden mb-4 relative group">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-gray-400" />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="text-white" size={24} />
                </div>
              </div>
              <label className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/20 transition text-sm font-medium">
                Upload Profile Picture
                <input type="file" name="docAvtar" accept="image/*" onChange={handleFileChange} required className="hidden" />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="firstName"
                    value={doctorData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                    placeholder="John"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="lastName"
                    value={doctorData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={doctorData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                    placeholder="auth@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={doctorData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                    placeholder="+1234567890"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    type="date"
                    name="dob"
                    value={doctorData.dob}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Gender</label>
                <select
                  name="gender"
                  value={doctorData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition [&>option]:text-gray-900"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Department</label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <select
                    name="doctorDepartment"
                    value={doctorData.doctorDepartment}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition [&>option]:text-gray-900"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    type="password"
                    name="password"
                    value={doctorData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 transition transform hover:-translate-y-0.5 mt-8 ${loading ? "opacity-75 cursor-wait" : ""
                }`}
            >
              {loading ? "Registering..." : "Register Doctor"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DoctorRegister;
