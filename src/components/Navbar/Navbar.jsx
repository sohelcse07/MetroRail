import { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import metroIcon from "../../assets/metroIcon.png";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Notification", path: "/notification" },
    { name: "Permanent Ticket", path: "/permanent-ticket" },
    { name: "Profile", path: "/profile" },
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

  if (location.pathname === "/userdashboard") return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white  z-50 md:px-10">
      <div className="flex items-center justify-between px-6 md:px-12 h-20">
        {/* Logo */}
        <Link to="/">
          <img src={metroIcon} alt="Metro Icon" className="w-24 h-20" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-gray-800 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Navigation */}
        <ul ref={navRef} className="hidden md:flex relative space-x-6">
          {/* Hover Indicator */}
          <motion.div
            className="absolute bottom-0 h-0.5 bg-teal-500 rounded-sm transition-all duration-300"
            animate={{ left: hoverPosition.left, width: hoverPosition.width }}
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
                className="px-4 py-2 text-gray-800 hover:text-teal-500 transition duration-300"
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
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 left-0 w-full bg-white shadow-lg border-t md:hidden"
          >
            <ul className="flex flex-col text-center py-4 space-y-3">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="block py-3 text-gray-800 hover:text-teal-500 transition duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
