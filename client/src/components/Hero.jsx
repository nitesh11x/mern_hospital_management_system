import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 gap-12">
        {/* Left Section */}
        <motion.div
          className="text-center md:text-left md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="uppercase tracking-wide text-purple-600 font-semibold text-sm sm:text-base">
            Your Health, Our Priority
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-purple-900 leading-tight">
            Welcome To{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">
              New Care
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
            Providing trusted doctors, advanced facilities, and compassionate
            care to keep you and your loved ones healthy.
          </p>

          {/* Feature List */}
          <ul className="space-y-3 text-gray-700 text-sm sm:text-base md:text-lg">
            {[
              "24/7 Emergency Services",
              "Experienced & Caring Doctors",
              "Modern Medical Equipment",
            ].map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-2 justify-center md:justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <CheckCircle className="text-purple-600 w-5 h-5 flex-shrink-0" />
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
            <motion.button
              onClick={() => navigate("/appointment/send")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              Get Appointment
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-purple-600 text-purple-700 rounded-lg hover:bg-purple-50 transition-all w-full sm:w-auto"
            >
              <Link to={"/more"}>Learn More</Link>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative">
            <motion.div
              className="absolute -top-6 -left-6 w-24 h-24 bg-purple-200 rounded-full blur-2xl opacity-70"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 6 }}
            />
            <motion.div
              className="absolute -bottom-8 -right-6 w-32 h-32 bg-purple-300 rounded-full blur-3xl opacity-60"
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ repeat: Infinity, duration: 8 }}
            />
            <img
              src="/hero.jpg"
              alt="Doctor"
              className="relative z-10 w-72 sm:w-96 md:w-[430px] rounded-xl shadow-2xl border-4 border-white"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
