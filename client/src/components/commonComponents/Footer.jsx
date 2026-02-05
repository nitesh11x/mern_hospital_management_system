import React from "react";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm shadow-lg">
              NC
            </div>
            New<span className="text-purple-400">Care</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Leading the way in medical excellence. Trusted by thousands for our compassionate care and state-of-the-art facilities.
          </p>
          <div className="flex gap-4 pt-2">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all transform hover:scale-110"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6 border-b border-purple-900 pb-2 inline-block">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {["Home", "About", "Services", "Doctors", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-purple-400 transition flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6 border-b border-purple-900 pb-2 inline-block">
            Contact Us
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-4">
              <MapPin size={20} className="text-purple-400 flex-shrink-0 mt-1" />
              <span>123 Healthcare Avenue, Medical District, New Delhi, India</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone size={20} className="text-purple-400 flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail size={20} className="text-purple-400 flex-shrink-0" />
              <span>support@newcare.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6 border-b border-purple-900 pb-2 inline-block">
            Newsletter
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to get the latest health tips and news.
          </p>
          <form className="flex flex-col gap-3">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all text-sm"
              />
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium">
              Subscribe <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6 text-center text-gray-500 text-xs border-t border-gray-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} NewCare Hospital. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-purple-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
