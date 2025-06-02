import { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import metroIcon from "../../assets/metroIcon.png";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Notification", path: "/notification" },
    { name: "Permanent Ticket", path: "/permanent-ticket" },
    { name: "Profile", path: "/dashboard" },
    { name: "Sign In", path: "/login" },
  ];

  const location = useLocation();
  const [hoverPosition, setHoverPosition] = useState({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  const handleMouseEnter = (e) => {
    if (navRef.current) {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const offsetLeft = left - navRef.current.getBoundingClientRect().left;
      setHoverPosition({ left: offsetLeft, width });
    }
  };

  if (location.pathname === "/userdashboard" || location.pathname.startsWith("/dashboard")) return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="flex items-center justify-between px-6 h-16 md:h-20 md:px-12">
        {/* Logo */}
        <Link to="/" className="z-50">
          <img src={metroIcon} alt="Metro Icon" className="w-20 h-16 md:w-24 md:h-20" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-800 focus:outline-none z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              ☰
            </motion.span>
          )}
        </button>

        {/* Desktop Navigation */}
        <ul ref={navRef} className="hidden md:flex relative space-x-6">
          {/* Hover Indicator */}
          <motion.div
            className="absolute bottom-0 h-0.5 bg-teal-500 rounded-sm"
            animate={{ left: hoverPosition.left, width: hoverPosition.width }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          {navItems.map((item, index) => (
            <li
              key={index}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setHoverPosition({ left: 0, width: 0 })}
            >
              <Link
                to={item.path}
                className={`px-4 py-2 text-gray-800 hover:text-teal-500 transition duration-200 ${
                  location.pathname === item.path ? "text-teal-500 font-medium" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 w-full bg-white shadow-xl rounded-b-2xl z-50 pt-20 pb-6 px-6 md:hidden"
            >
              <ul className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    <Link
                      to={item.path}
                      className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? "bg-teal-50 text-teal-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              {/* Close button for mobile */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;