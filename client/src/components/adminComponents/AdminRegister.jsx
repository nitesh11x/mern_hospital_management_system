import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const { registerAdmin, isAdminAuth } = useContext(AppContext);
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    let res = await registerAdmin(
      adminData.firstName,
      adminData.lastName,
      adminData.email,
      adminData.phone,
      adminData.dob,
      adminData.gender,
      adminData.password
    );
    if (res.success) {
      navigate("/user/admin/login");
    }
    setCreating(false);
    return;
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // ✅ fixed typo
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {isAdminAuth && (
        <section className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 to-purple-200">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg"
          >
            <h1 className="text-2xl font-bold text-purple-700 text-center mb-6">
              Admin Registration
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={adminData.firstName}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={adminData.lastName}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                value={adminData.email}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={adminData.phone}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  value={adminData.dob}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Gender
                </label>
                <select
                  name="gender"
                  value={adminData.gender}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={adminData.password}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 
            focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              disabled={creating}
              className={`w-full bg-purple-600 text-white py-2 rounded-lg font-medium 
          hover:bg-purple-700 transition  ${
            creating
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
            >
              Register
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default AdminRegister;
