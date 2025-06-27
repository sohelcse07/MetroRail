import { Link, useNavigate } from "react-router-dom";
import * as Separator from "@radix-ui/react-separator";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Wallet,
  Zap,
  Repeat,
  Ticket,
  Settings,
  HelpCircle,
  LogOut,
  User,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Home,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import MetroImageLogo from "../assets/Logo.jpg"

const LeftSidePanel = ({ isCollapsed, toggleCollapse, closeSidebar }) => {
  const { setToken } = useAuth();

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken("");
  };

  const navItems = [
    { name: "Home", icon: Home, path: "/", color: "text-slate-600" },
    { name: "Profile", icon: User, path: "/dashboard", color: "text-blue-600" },
    {
      name: "Wallet",
      icon: Wallet,
      path: "recharge",
      color: "text-purple-600",
    },
    {
      name: "Permanent Ticket",
      icon: Ticket,
      path: "permanent-ticket",
      color: "text-red-500",
    },
    { name: "History", icon: Ticket, path: "history", color: "text-teal-500" },
    {
      name: "Settings",
      icon: Settings,
      path: "settings",
      color: "text-yellow-500",
    },
    { name: "Help", icon: HelpCircle, path: "help", color: "text-indigo-500" },
  ];

  return (
    <div
      className={`h-full flex flex-col bg-white border-r rounded-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <header className="p-4 border-b flex items-center justify-between">
        {!isCollapsed ? (
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold">D</span>
          </div>
        )}

        <button
          onClick={toggleCollapse}
          className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
        ></button>
      </header>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    closeSidebar(); // close sidebar on mobile
                  }
                }}
                className={`flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                  item.color
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && (
                  <span className="ml-3 text-gray-700">{item.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer with user dropdown */}
      <footer className="border-t p-4">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                {!isCollapsed && (
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-gray-700">
                      User Profile
                    </p>
                    <p className="text-xs text-gray-500">View account</p>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={5}
              className="min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 p-1 z-50"
            >
              <DropdownMenu.Item className="text-sm p-2 rounded hover:bg-gray-100 cursor-pointer outline-none">
                <Link to="/dashboard/profile" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-sm p-2 rounded hover:bg-gray-100 cursor-pointer outline-none">
                <Link to="/dashboard/settings" className="flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-px bg-gray-200 m-1" />
              <DropdownMenu.Item
                onClick={logout}
                className="text-sm p-2 rounded hover:bg-red-50 text-red-600 cursor-pointer outline-none flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </footer>
    </div>
  );
};

export default LeftSidePanel;
