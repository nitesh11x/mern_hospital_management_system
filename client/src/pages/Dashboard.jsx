import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { jwtDecode } from "jwt-decode";

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
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-purple-100">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-purple-900 mb-8">
          Welcome to Dashboard
        </h1>

        <div className="flex flex-col gap-6">
          {/* Admin Login Button */}
          <button
            onClick={handleAdminLogin}
            className="w-full bg-purple-600 text-white py-3 rounded-md text-lg font-medium hover:bg-purple-700 transition cursor-pointer"
          >
            Admin Login
          </button>

          {/* Doctor Login Button */}
          <button
            onClick={handleDoctorLogin}
            className="w-full bg-purple-600 text-white py-3 rounded-md text-lg font-medium hover:bg-purple-700 transition cursor-pointer"
          >
            Doctor Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
