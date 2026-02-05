import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { ShieldCheck, Stethoscope, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAdminAuth, isDoctorAuth } = useContext(AppContext);
  const id = localStorage.getItem("id");

  const handleAdminLogin = () => {
    if (isAdminAuth) {
      navigate("/user/admin/dashboard");
    } else {
      navigate("/user/admin/login");
    }
  };

  // Doctor login navigation
  const handleDoctorLogin = () => {
    if (isDoctorAuth) {
      navigate(`/user/doctor/${id}`);
    } else {
      navigate("/user/doctor/login");
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-[url('/hero.jpg')] bg-cover bg-center relative mt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-4xl px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Hospital Management Portal
          </h1>
          <p className="text-blue-100 text-lg">Select your role to access the dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admin Card */}
          <div
            onClick={handleAdminLogin}
            className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-white" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin Portal</h2>
            <p className="text-blue-200 mb-6 text-sm">Access system settings, manage users, and oversee hospital operations.</p>
            <button className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
              Login as Admin <ArrowRight size={18} />
            </button>
          </div>

          {/* Doctor Card */}
          <div
            onClick={handleDoctorLogin}
            className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <Stethoscope className="text-white" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Doctor Portal</h2>
            <p className="text-purple-200 mb-6 text-sm">Manage appointments, view patient records, and update schedules.</p>
            <button className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
              Login as Doctor <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} NewCare Hospital System. Secure Access Only.</p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
