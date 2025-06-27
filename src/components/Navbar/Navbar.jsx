import { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import metroIcon from "../../assets/metroIcon.png";
import { motion, AnimatePresence } from "framer-motion";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/dashboard" },
    { name: "Sign In", path: "/login" },
  ];

  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  if (location.pathname === "/userdashboard" || location.pathname.startsWith("/dashboard")) return null;

  return (
    <NavigationMenu.Root className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="z-50 flex-shrink-0">
            <img src={metroIcon} alt="Metro Icon" className="w-20 h-16 md:w-24 md:h-20" />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu.List
            ref={navRef}
            className="hidden md:flex relative space-x-1"
          >
            {navItems.map((item, index) => (
              <NavigationMenu.Item key={index} className="relative">
                <NavigationMenu.Trigger
                  className={`px-4 py-2 text-gray-800 hover:text-teal-500 transition duration-200 ${
                    location.pathname === item.path ? "text-teal-500 font-medium" : ""
                  }`}
                >
                  <Link to={item.path}>{item.name}</Link>
                </NavigationMenu.Trigger>
                <NavigationMenu.Indicator className="absolute bottom-0 h-0.5 bg-teal-500 rounded-sm transition-all duration-300 ease-in-out" />
              </NavigationMenu.Item>
            ))}
            <NavigationMenu.Indicator className="absolute bottom-0 h-0.5 bg-teal-500 rounded-sm transition-all duration-300 ease-in-out" />
          </NavigationMenu.List>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-800 focus:outline-none z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <Cross1Icon className="h-6 w-6" />
            ) : (
              <HamburgerMenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
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
              <NavigationMenu.List className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    <NavigationMenu.Item>
                      <NavigationMenu.Link asChild>
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
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  </motion.li>
                ))}
              </NavigationMenu.List>
              
              {/* Close button for mobile */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <Cross1Icon className="h-6 w-6" />
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </NavigationMenu.Root>
  );
};

export default Navbar;