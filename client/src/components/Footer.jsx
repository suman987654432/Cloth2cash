import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-200 via-emerald-400 to-teal-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-green-950 bg-opacity-60"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>
      
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-6">
              Cloth2Cash
            </h2>
            <p className="text-gray-200 text-base leading-relaxed mb-6">
              Transform your unused clothes into cash! We make it easy to sell your pre-loved garments while contributing to sustainable fashion.
            </p>
           
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-orange-400">Our Services</h3>
            <ul className="space-y-4 text-base text-gray-200">
              <li><a href="#sell-clothes" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Sell Your Clothes</a></li>
              <li><a href="#pickup" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Free Pickup</a></li>
              <li><a href="#brands" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Accepted Brands</a></li>
              <li><a href="#how-it-works" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">How It Works</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-orange-400">Quick Links</h3>
            <ul className="space-y-4 text-base text-gray-200">
              <li><a href="#about" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#testimonials" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Customer Reviews</a></li>
              <li><a href="#faq" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">FAQ</a></li>
              <li><a href="#blog" className="hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Fashion Blog</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-orange-400">Get In Touch</h3>
            <div className="space-y-4 text-base text-gray-200 mb-8">
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-orange-400 flex-shrink-0 text-lg" />
                <span>support@cloth2cash.in</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaPhone className="text-orange-400 flex-shrink-0 text-lg" />
                <span>+91 6299974421</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-orange-400 flex-shrink-0 text-lg" />
                <span>Bhopal, Madhya Pradesh</span>
              </div>
            </div>
            
            <div>
              <p className="text-base text-gray-300 mb-4">Follow us for updates</p>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110">
                  <FaFacebookF className="text-lg" />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110">
                  <FaInstagram className="text-lg" />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110">
                  <FaTwitter className="text-lg" />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110">
                  <FaLinkedinIn className="text-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-base text-gray-300">
              © {new Date().getFullYear()} Cloth2Cash. All rights reserved.
            </div>
            <div className="flex space-x-6 text-base text-gray-300">
              <a href="#privacy" className="hover:text-orange-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#terms" className="hover:text-orange-400 transition-colors duration-300">Terms of Service</a>
              <a href="#refund" className="hover:text-orange-400 transition-colors duration-300">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
