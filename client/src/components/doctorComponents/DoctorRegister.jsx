import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setDocAvtar(e.target.files[0]);
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
      console.log("Doctor registered:", response);
      if (response.success) {
        navigate("/user/doctor/login");
      }
    } catch (error) {
      console.error("Doctor register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isAdminAuth && (
        <section className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 to-purple-200">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg"
            encType="multipart/form-data"
          >
            <h1 className="text-2xl font-bold text-purple-700 text-center mb-6">
              Doctor Registration
            </h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Upload Avatar
              </label>
              <input
                type="file"
                name="docAvtar"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={doctorData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={doctorData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={doctorData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={doctorData.phone}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  DOB
                </label>
                <input
                  type="date"
                  name="dob"
                  value={doctorData.dob}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Gender
                </label>
                <select
                  name="gender"
                  value={doctorData.gender}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Doctor Department
              </label>
              <select
                name="doctorDepartment"
                value={doctorData.doctorDepartment}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Radiology">Radiology</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="General Surgery">General Surgery</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Oncology">Oncology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Gynecology">Gynecology</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={doctorData.password}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-medium transition 
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
            >
              {loading ? "Registering..." : "Register Doctor"}
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default DoctorRegister;
