import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

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
    <section className="flex mt-18 justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-sm p-6 w-full max-w-lg border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-purple-800 text-center mb-6 tracking-wide">
          Patient Registration
        </h1>

        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={patientData.firstName}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter first name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={patientData.lastName}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter last name"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={patientData.email}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter email"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={patientData.phone}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter phone number"
            required
          />
        </div>

        {/* DOB & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={patientData.dob}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={patientData.gender}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={patientData.password}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter password"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={patientData.confirmPassword}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Confirm password"
            required
          />
        </div>

        {/* Role (ReadOnly) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={patientData.role}
            readOnly
            className="mt-1 w-full border border-gray-200 bg-gray-100 rounded-sm px-3 py-2 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-sm font-medium hover:bg-purple-700 transition shadow-sm"
        >
          Register
        </button>

        {/* Extra link */}
        <p className="text-sm text-gray-600 text-center mt-5">
          Already have an account?{" "}
          <a
            href="/patient/login"
            className="text-purple-600 hover:text-purple-800 font-semibold"
          >
            Login
          </a>
        </p>
      </form>
    </section>
  );
};

export default PatientRegister;
