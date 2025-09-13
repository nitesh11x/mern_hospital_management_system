import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const {
    isPatientAuth,
    logoutPatient,
    isAdminAuth,
    isDoctorAuth,
    logoutDoctor,
    logoutAdmin,
  } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to={"/"} className="text-2xl font-bold text-green-600">
          New <span className="text-red-600">Care</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-purple-600 transition">Home</Link>
          <Link to="/about" className="hover:text-purple-600 transition">About</Link>
          <Link to="/user/doctor" className="hover:text-purple-600 transition">Doctors</Link>
          {isAdminAuth && (
            <Link to="/reviews" className="hover:text-purple-600 transition">
              Reviews
            </Link>
          )}
          <Link to="/contact" className="hover:text-purple-600 transition">Contact</Link>
        </ul>

        {/* Desktop CTA + Auth */}
        <div className="hidden lg:flex items-center gap-4">
          <Link to={"/appointment/send"} className="px-5 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition">
            Get Appointment
          </Link>
          <Link to={"/hospital"} className="px-5 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition">
            Management Login
          </Link>
          {isAdminAuth && (
            <Link to={"/user/admin/dashboard"} className="px-5 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition">
              Dashboard
            </Link>
          )}
          {isAdminAuth && (
            <button
              onClick={() => { logoutAdmin(); navigate("/"); }}
              className="px-4 py-2 border border-red-600 text-red-700 rounded-sm hover:bg-red-100 transition"
            >
              Logout Admin
            </button>
          )}
          {isDoctorAuth && (
            <button
              onClick={() => { logoutDoctor(); navigate("/"); }}
              className="px-4 py-2 border border-red-600 text-red-700 rounded-sm hover:bg-red-100 transition"
            >
              Logout Doctor
            </button>
          )}
          {isPatientAuth ? (
            <button
              onClick={() => { logoutPatient(); navigate("/"); }}
              className="px-4 py-2 border border-red-600 text-red-700 rounded-sm hover:bg-red-100 transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/patient/login" className="px-4 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            className="text-purple-700 focus:outline-none text-2xl"
            onClick={() => setShow(!show)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {show && (
        <div className="lg:hidden bg-white shadow-lg">
          <ul className="flex flex-col gap-4 px-6 py-4 text-gray-700 font-medium">
            {/* Nav Links */}
            <Link to="/" onClick={() => setShow(false)}>Home</Link>
            <Link to="/about" onClick={() => setShow(false)}>About</Link>
            <Link to="/user/doctor" onClick={() => setShow(false)}>Doctors</Link>
            {isAdminAuth && (
              <Link to="/reviews" onClick={() => setShow(false)}>Reviews</Link>
            )}
            <Link to="/contact" onClick={() => setShow(false)}>Contact</Link>

            {/* CTA */}
            <Link to="/appointment/send" onClick={() => setShow(false)} className="px-4 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition">
              Get Appointment
            </Link>
            <Link to="/hospital" onClick={() => setShow(false)} className="px-4 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition">
              Management Login
            </Link>

            {/* Dashboard */}
            {isAdminAuth && (
              <Link to="/user/admin/dashboard" onClick={() => setShow(false)} className="px-4 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition">
                Dashboard
              </Link>
            )}

            {/* Auth Section */}
            {isAdminAuth && (
              <button
                onClick={() => { logoutAdmin(); setShow(false); navigate("/"); }}
                className="px-4 py-2 border border-red-600 text-red-700 rounded-sm hover:bg-red-50 transition"
              >
                Logout Admin
              </button>
            )}
            {isDoctorAuth && (
              <button
                onClick={() => { logoutDoctor(); setShow(false); navigate("/"); }}
                className="px-4 py-2 border border-red-600 text-red-700 rounded-sm hover:bg-red-50 transition"
              >
                Logout Doctor
              </button>
            )}
            {isPatientAuth ? (
              <button
                onClick={() => { logoutPatient(); setShow(false); navigate("/"); }}
                className="px-4 py-2 border border-red-600 text-red-700 rounded-sm hover:bg-red-50 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/patient/login"
                onClick={() => setShow(false)}
                className="px-4 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition"
              >
                Patient Login
              </Link>
            )}
          </ul>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
