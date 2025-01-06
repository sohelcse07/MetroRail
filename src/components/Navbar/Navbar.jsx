import { useState, useRef } from "react";
import { useLocation } from "react-router-dom"; // React Router equivalent of usePathname
import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Notification", path: "/notfication" },
    { name: "Permanent ticket", path: "/permanent-ticket" },
    { name: "Profile", path: "/profile" },
    { name: "Sign in", path: "/login" },
  ];

  const location = useLocation(); // Get the current path
  const [hoverPosition, setHoverPosition] = useState({ left: 0, width: 0 });
  const navRef = useRef(null);

  const handleMouseEnter = (e) => {
    if (navRef.current) {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const offsetLeft = left - navRef.current.getBoundingClientRect().left;
      setHoverPosition({ left: offsetLeft, width });
    }
  };

  if (location.pathname === "/userdashboard") {
    return null;
  }

  return (
    <nav className="bg-gray-900  h-24 border-b border-slate-800 text-white w-full py-3 shadow-md">
      <div className="w-full mx-auto flex justify-between sm:justify-around items-center px-[calc(10%+1rem)] sm:px-0">
      <div className="text-4xl w-36 h-auto font-bold mt-2">
  <Link to="/" className="text-teal-400 hover:text-teal-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 250"
      className="w-full h-full"
    >
      {/* Body of the Bullet Train */}
      <path
        d="M10 150 Q80 60 250 60 H550 Q580 60 580 100 V150 H10 Z"
        fill="#181c1c"
        stroke="teal"
        strokeWidth="6"
      />

      {/* Train Windows */}
      <rect x="270" y="90" width="50" height="35" rx="5" ry="5" fill="cyan" />
      <rect x="340" y="90" width="50" height="35" rx="5" ry="5" fill="cyan" />
      <rect x="410" y="90" width="50" height="35" rx="5" ry="5" fill="cyan" />
      <rect x="480" y="90" width="50" height="35" rx="5" ry="5" fill="cyan" />

      {/* Headlight */}
      <circle cx="560" cy="110" r="10" fill="yellow" />

      {/* Train Tracks */}
      <line x1="20" y1="160" x2="570" y2="160" stroke="teal" strokeWidth="4" />
      <line x1="20" y1="175" x2="570" y2="175" stroke="teal" strokeWidth="4" />

      {/* Wheels */}
      <circle cx="100" cy="190" r="12" fill="gray" />
      <circle cx="250" cy="190" r="12" fill="gray" />
      <circle cx="400" cy="190" r="12" fill="gray" />
      <circle cx="550" cy="190" r="12" fill="gray" />

      {/* Train Name */}
      <text
        x="100"
        y="240"
        fill="teal"
        fontSize="4rem"
        fontFamily="Arial"
        fontWeight="bold"
      >
        Metro Rail
      </text>
    </svg>
  </Link>
</div>


        <button
          className="md:hidden text-2xl text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          &#9776;
        </button>

        <ul
          ref={navRef}
          className="hidden md:flex relative lg:-right-24 xl:-right-32 space-x-4 text-center"
        >
          <div
            className="absolute top-0 h-full border-b border-b-slate-200 underline opacity-65 rounded-sm transition-all duration-300"
            style={{ left: hoverPosition.left, width: hoverPosition.width }}
          ></div>

          {navItems.map((item, index) => (
            <li
              key={index}
              className="relative z-10"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setHoverPosition({ left: 0, width: 0 })}
            >
              <Link
                to={item.path}
                className="block px-4 py-2 text-white hover:text-teal-500 transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;