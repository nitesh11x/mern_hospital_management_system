import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const PatientLogin = () => {
  const navigate = useNavigate();
  const { loginPatient } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient"); // ✅ default role

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await loginPatient(email, password, role);
    if (res.data.success) {
      navigate("/");
    }
    return;
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-purple-200">
      <div className="bg-white shadow-md rounded-sm w-full max-w-md p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-purple-800 mb-6 tracking-wide">
          Patient Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-sm px-3 py-2 text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-sm px-3 py-2 text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-sm hover:bg-purple-700 transition font-medium shadow-sm"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-sm text-gray-600 text-center mt-5">
          Don’t have an account?{" "}
          <a
            href="/patient/register"
            className="text-purple-600 hover:text-purple-800 font-semibold"
          >
            Register
          </a>
        </p>
      </div>
    </section>
  );
};

export default PatientLogin;
