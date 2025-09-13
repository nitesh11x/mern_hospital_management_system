import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const DoctorLogin = () => {
  const { loginDoctor } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Doctor");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginDoctor(email, password, role);
      if (res?.data?.token) {
        const decoded = jwtDecode(res.data.token);
        const id = decoded.id || decoded._id; 
        console.log(decoded);
        
        console.log("Decoded Doctor ID:", id);
        if (res.data.success) {
          console.log("Login successful");
          navigate(`${id}`);
        }
      } else {
        console.error("No token returned from server");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-purple-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-purple-900 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
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
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
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
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Register
          </a>
        </p>
      </div>
    </section>
  );
};

export default DoctorLogin;
