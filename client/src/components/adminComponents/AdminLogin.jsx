import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Mail, Lock, LogIn } from "lucide-react";

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
    <section className="min-h-screen flex items-center justify-center bg-[url('/hero.jpg')] bg-cover bg-center relative bg-fixed">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-10 rounded-3xl shadow-2xl mx-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-emerald-500/20 rounded-full border border-emerald-500/30 text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Admin Login</h2>
          <p className="text-gray-300 mt-2 text-sm text-center">Secure access for hospital administration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition [&>option]:text-gray-900"
            >
              <option value="Admin">Admin</option>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={LoggingIn}
            className={`w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 ${LoggingIn ? "opacity-75 cursor-wait" : ""
              }`}
          >
            {LoggingIn ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={20} /> Login Access
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/user/admin/register"
            className="text-emerald-400 hover:text-emerald-300 font-semibold transition hover:underline"
          >
            Register New Admin
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AdminLogin;
