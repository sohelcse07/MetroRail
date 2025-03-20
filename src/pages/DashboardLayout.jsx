import { useState } from "react";
import LeftSidePanel from "../components/LeftSidePanel";
import { Outlet } from "react-router-dom";
import Topbar from "../components/TopBar";
import ProfileSidebar from "../components/ProfileSideBar";

// Dashboard Layout Component
const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleProfileSidebar = () => {
    setIsProfileSidebarOpen(!isProfileSidebarOpen);
  };

  const profileInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    nid: "9876543210987",
    telegram: "@johndoe",
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? "w-16" : "w-64"
        } bg-white shadow-lg`}
      >
        <LeftSidePanel isCollapsed={isSidebarCollapsed} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar
          onToggleSidebar={toggleSidebar}
          onToggleFullscreen={toggleFullscreen}
          onToggleProfileSidebar={toggleProfileSidebar}
          isFullscreen={isFullscreen}
        />

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* This will render the nested routes */}
        </div>
      </div>

      {/* Profile Sidebar */}
      {isProfileSidebarOpen && (
        <ProfileSidebar
          onClose={() => setIsProfileSidebarOpen(false)}
          profileInfo={profileInfo}
        />
      )}
    </div>
  );
};

export default DashboardLayout;