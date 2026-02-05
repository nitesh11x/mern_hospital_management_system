import React, { useContext } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";

const Hero = () => {
  const { isPatientAuth, isAdminAuth } = useContext(AppContext);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="w-full min-h-[calc(100vh-80px)] mt-20 bg-gradient-to-br from-white via-purple-50 to-indigo-50 flex items-center py-12 lg:py-0 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-purple-100/30 -skew-x-12 transform translate-x-20" />

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 gap-12 relative z-10">
        {/* Left Section (Text) */}
        <motion.div
          className="text-center lg:text-left lg:w-1/2 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
            Your Health, Our Priority
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight"
            variants={itemVariants}
          >
            Welcome To<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              New Care
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            variants={itemVariants}
          >
            Providing trusted doctors, advanced facilities, and compassionate
            care to keep you and your loved ones healthy. Experience the future of healthcare today.
          </motion.p>

          {/* Feature List */}
          <motion.ul variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-gray-700 font-medium">
            {[
              "24/7 Emergency",
              "Expert Doctors",
              "Modern Care",
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" fill="currentColor" size={20} color="white" />
                {feature}
              </li>
            ))}
          </motion.ul>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
            <button
              onClick={() => {
                if (!isPatientAuth && !isAdminAuth) {
                  toast.info("Please login to book appointments!");
                  setTimeout(() => navigate("/patient/login"), 2000);
                } else {
                  navigate("/appointment/send");
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1 transition-all w-full sm:w-auto font-bold flex items-center justify-center gap-2"
            >
              Get Appointment <ArrowRight size={20} />
            </button>
            <Link to={"/more"}>
              <button
                className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all w-full sm:w-auto font-semibold"
              >
                Learn More
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Section (Image) */}
        <motion.div
          className="lg:w-1/2 flex justify-center relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative z-10">
            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-10 -left-10 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-2xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ repeat: Infinity, duration: 10 }}
            />
            <motion.div
              className="absolute top-1/2 -right-10 w-32 h-32 bg-purple-600 rounded-full opacity-20 blur-3xl"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 8 }}
            />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm">
              <img
                src="/hero.jpg"
                alt="Doctor"
                className="w-full max-w-md lg:max-w-lg object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                <p className="font-bold text-lg">Dr. Sarah Johnson</p>
                <p className="text-sm opacity-90">Chief Surgeon, New Care</p>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 z-20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Patients</p>
                <p className="text-lg font-bold text-gray-800">10,000+ Verified</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
