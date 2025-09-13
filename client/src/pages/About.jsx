import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="w-full min-h-screen bg-purple-50 flex items-center py-20"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-6 md:px-12">
        
        {/* Left Image */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img
            src="hospitalImage.png"
            alt="Hospital"
            className="w-80 md:w-[450px] rounded-sm shadow-lg"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="md:w-1/2 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="uppercase text-purple-600 font-semibold tracking-wide">
            About Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900">
            Caring for You, Every Step of the Way
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At <span className="font-semibold text-purple-700">New Care</span>, 
            we combine advanced medical technology with a compassionate approach 
            to ensure the best outcomes for our patients. Our highly experienced 
            doctors and staff are committed to providing world-class healthcare 
            that is affordable and accessible.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-6 pt-4 text-gray-700 text-base md:text-lg">
            <div>
              <h3 className="font-semibold text-purple-700">15+ Years</h3>
              <p>of trusted service</p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-700">100+</h3>
              <p>Qualified Doctors</p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-700">50K+</h3>
              <p>Happy Patients</p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-700">24/7</h3>
              <p>Emergency Support</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
