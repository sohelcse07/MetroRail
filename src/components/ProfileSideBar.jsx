import React from "react";
import { X } from "lucide-react";
import avatar from "../assets/profile.png";
import { useUser } from "../context/UserContext";

const ProfileSidebar = ({ onClose }) => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b bg-primary text-white">
        <h2 className="text-lg font-semibold">Profile Info</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary rounded focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Details */}
      <div className="p-4">
        <div className="text-center mt-2">
          <img
            src={avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-primary"
          />
          <h4 className="mt-2 mb-0 text-xl font-semibold text-primary">
            {user.name || "N/A"}
          </h4>

          <div className="mt-4 pt-4 border-t text-start space-y-3">
            <ProfileField label="NID" value={user.nid_no} color="warning" />
            <ProfileField label="Telegram" value={user.phone_number} color="success" />
            <ProfileField label="Date of Birth" value={user.date_of_birth} color="purple" />
            <ProfileField label="Gender" value={user.gender} color="pink" />
            <ProfileField label="Gender" value={user.blood_group} color="pink" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable field component
const ProfileField = ({ label, value, color }) => (
  <div className={`p-3 bg-${color}/10 rounded-lg`}>
    <p className={`text-sm text-${color}`}>{label}</p>
    <p className="text-sm text-gray-800">{value || "N/A"}</p>
  </div>
);

export default ProfileSidebar;
