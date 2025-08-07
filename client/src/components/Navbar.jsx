import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-[0_4px_12px_rgba(34,197,94,0.3)] border-b border-green-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          
          {/* Logo + Brand Name */}
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="Cloth2Cash Logo" 
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto mr-2 sm:mr-3 drop-shadow-md hover:scale-105 transition-transform duration-300"

            />
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
  Cloth<span className="text-green-600">2</span>Cash
</span>

          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-4 xl:space-x-8 text-gray-700 font-medium text-base xl:text-lg">
            {[
              { to: "/", label: "Home" },
              { to: "/schedule", label: "Schedule Pickup" },
              { to: "/how-it-works", label: "How It Works" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative group px-2 xl:px-3 py-2 rounded-lg hover:text-green-600 transition-all duration-300 hover:bg-green-50"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 xl:px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm xl:text-base"
            >
              Login
            </Link>
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden space-x-3 text-gray-700 font-medium text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/schedule", label: "Pickup" },
              { to: "/how-it-works", label: "How" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative group px-2 py-2 rounded-lg hover:text-green-600 transition-all duration-300 hover:bg-green-50"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-xs"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-1.5 sm:p-2 text-gray-700 hover:text-green-600 focus:outline-none bg-gray-50 rounded-lg hover:bg-green-50 transition duration-200"
            >
              <svg
                className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden lg:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "max-h-screen opacity-100 visible pb-4 sm:pb-6"
              : "max-h-0 opacity-0 invisible pb-0"
          } overflow-hidden`}
        >
          <div className="px-2 sm:px-3 pt-3 sm:pt-4 space-y-1 bg-white shadow-2xl rounded-xl sm:rounded-2xl mt-3 sm:mt-4 mx-1 border border-green-200">
            {[
              { to: "/", label: "Home" },
              { to: "/schedule", label: "Schedule Pickup" },
              { to: "/how-it-works", label: "How It Works" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 sm:px-4 py-3 sm:py-4 text-gray-800 font-medium hover:text-green-600 hover:bg-green-50 rounded-lg sm:rounded-xl transition-all duration-200 text-base sm:text-lg"
              >
                {item.label}
              </Link>
            ))}
            <div className="px-1 sm:px-2 pt-2 sm:pt-3 pb-3 sm:pb-4">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg font-semibold text-base sm:text-lg"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
