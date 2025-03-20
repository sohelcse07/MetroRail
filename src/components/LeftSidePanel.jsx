import { Link } from "react-router-dom";
import user from "../assets/profile.png";
import {
  Wallet,
  Zap,
  Repeat,
  Ticket,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

const LeftSidePanel = ({ isCollapsed }) => {
  return (
    <div className="w-full h-full bg-white shadow-lg rounded-lg p-4">
      {/* User Info */}
      <div className="flex items-center space-x-3 border-b pb-3">
        <img
          src={user}
          className={`rounded-full transition-all duration-300 ${
            isCollapsed ? "w-8 h-8" : "w-12 h-12"
          }`}
          alt="User Avatar"
        />

        {!isCollapsed && (
          <div className="flex-1">
            <h5 className="text-lg font-semibold text-primary">Shreyu N</h5>
            <span className="text-gray-500 text-sm cursor-pointer hover:text-danger flex items-center">
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 space-y-2 text-gray-700">
        {[
          { name: "Balance", icon: Wallet, path: "balance", color: "text-primary" },
          { name: "Recharge", icon: Zap, path: "recharge", color: "text-secondary" },
          { name: "Balance Transfer", icon: Repeat, path: "balance-transfer", color: "text-success" },
          { name: "Permanent Ticket", icon: Ticket, path: "permanent-ticket", color: "text-danger" },
          { name: "History", icon: Ticket, path: "history", color: "text-teal-500" },
          { name: "Settings", icon: Settings, path: "settings", color: "text-warning" },
          { name: "Help", icon: HelpCircle, path: "help", color: "text-info" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center p-2 rounded-md hover:bg-gray-200 ${item.color}`}
          >
            <item.icon className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3 text-slate-600">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default LeftSidePanel;