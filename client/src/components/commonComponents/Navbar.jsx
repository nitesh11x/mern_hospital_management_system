import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppContext from "../../context/AppContext";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    isPatientAuth,
    logoutPatient,
    isAdminAuth,
    isDoctorAuth,
    logoutDoctor,
    logoutAdmin,
  } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Doctors", path: "/user/doctor" },
    { name: "Reviews", path: "/reviews", adminOnly: true },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-white/90 backdrop-blur-md shadow-lg py-3"
        : "bg-white/50 backdrop-blur-sm py-5"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-purple-500/30 transition-all">
            NC
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            New<span className="text-purple-600">Care</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 font-medium text-gray-600">
          {navLinks.map((link) => (
            (!link.adminOnly || isAdminAuth) && (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="relative px-1 py-2 hover:text-purple-600 transition group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
                </Link>
              </li>
            )
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Public Actions */}
          {!isPatientAuth && !isDoctorAuth && !isAdminAuth && (
            <Link
              to="/patient/login"
              className="text-gray-600 hover:text-purple-600 font-medium transition"
            >
              Login
            </Link>
          )}

          <button
            onClick={() => {
              if (!isPatientAuth && !isAdminAuth) {
                toast.info("Please login to book appointments!");
                setTimeout(() => navigate("/patient/login"), 2000);
              } else {
                navigate("/appointment/send");
              }
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Get Appointment
          </button>

          {/* Auth Dropdown or Buttons could go here, simplified for now */}
          {isAdminAuth ? (
            <button
              onClick={() => { logoutAdmin(); navigate("/"); }}
              className="px-5 py-2.5 border border-red-500 text-red-600 rounded-full font-medium hover:bg-red-50 transition"
            >
              Logout Admin
            </button>
          ) : isDoctorAuth ? (
            <button
              onClick={() => { logoutDoctor(); navigate("/"); }}
              className="px-5 py-2.5 border border-red-500 text-red-600 rounded-full font-medium hover:bg-red-50 transition"
            >
              Logout Doctor
            </button>
          ) : isPatientAuth ? (
            <button
              onClick={() => { logoutPatient(); navigate("/"); }}
              className="px-5 py-2.5 border border-red-500 text-red-600 rounded-full font-medium hover:bg-red-50 transition"
            >
              Logout
            </button>
          ) : null}

          {/* Management Link only if not logged in or Admin/Doctor */}
          {!isPatientAuth && !isDoctorAuth && !isAdminAuth && (
            <Link to="/hospital" className="text-sm text-gray-400 hover:text-purple-500">
              Staff
            </Link>
          )}
          {isAdminAuth && (
            <Link to="/user/admin/dashboard" className="px-5 py-2.5 bg-gray-900 text-white rounded-full font-medium shadow-md hover:bg-gray-800 transition">
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-gray-700 p-2"
          onClick={() => setShow(!show)}
        >
          {show ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <ul className="flex flex-col gap-4 p-6 text-gray-700 font-medium">
              {navLinks.map((link) => (
                (!link.adminOnly || isAdminAuth) && (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setShow(false)}
                    className="block py-2 hover:text-purple-600"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <hr className="border-gray-100 my-2" />
              <button
                onClick={() => {
                  setShow(false);
                  if (!isPatientAuth && !isAdminAuth) {
                    toast.info("Please login to book appointments!");
                    setTimeout(() => navigate("/patient/login"), 2000);
                  } else {
                    navigate("/appointment/send");
                  }
                }}
                className="block text-center w-full py-3 bg-purple-600 text-white rounded-xl shadow-md"
              >
                Get Appointment
              </button>

              {isAdminAuth && (
                <button onClick={() => { logoutAdmin(); setShow(false); navigate("/"); }} className="w-full py-3 text-red-600 bg-red-50 rounded-xl">Logout Admin</button>
              )}
              {isDoctorAuth && (
                <button onClick={() => { logoutDoctor(); setShow(false); navigate("/"); }} className="w-full py-3 text-red-600 bg-red-50 rounded-xl">Logout Doctor</button>
              )}
              {isPatientAuth && (
                <button onClick={() => { logoutPatient(); setShow(false); navigate("/"); }} className="w-full py-3 text-red-600 bg-red-50 rounded-xl">Logout</button>
              )}
              {!isAdminAuth && !isDoctorAuth && !isPatientAuth && (
                <Link to="/patient/login" onClick={() => setShow(false)} className="block text-center w-full py-3 bg-gray-100 text-gray-700 rounded-xl">Patient Login</Link>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
