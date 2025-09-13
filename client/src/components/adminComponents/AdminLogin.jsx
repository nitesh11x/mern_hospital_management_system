import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { loginAdmin } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const navigate = useNavigate();
  const [LoggingIn, setLoggingIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    try {
      console.log(email, password, role);
      let res = await loginAdmin(email, password, role);
      console.log(res.data);
      if (res.data.success) {
        console.log("done");
        setTimeout(() => {
          navigate("/user/admin/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Message send error:", error);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-purple-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-purple-900 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
          <button
            type="submit"
            disabled={LoggingIn}
            className={`w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition 
              ${
                LoggingIn
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }
              `}
          >
            Login
          </button>
        </form>
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

export default AdminLogin;
