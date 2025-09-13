import React from "react";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-gray-200 py-12">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            New<span className="text-purple-300">Care</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Providing quality healthcare with modern facilities and compassionate care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-purple-300 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-purple-300 transition">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-purple-300 transition">
                Services
              </a>
            </li>
            <li>
              <a href="/doctors" className="hover:text-purple-300 transition">
                Doctors
              </a>
            </li>
            <li>
              <a href="/contacts" className="hover:text-purple-300 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-purple-300" />
              <span>123 Healthcare Street, New Delhi, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-purple-300" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-purple-300" />
              <span>support@newcare.com</span>
            </li>
          </ul>
          {/* Social Links */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-purple-300">
              <Facebook size={22} />
            </a>
            <a href="#" className="hover:text-purple-300">
              <Twitter size={22} />
            </a>
            <a href="#" className="hover:text-purple-300">
              <Instagram size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-purple-700 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} NewCare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
