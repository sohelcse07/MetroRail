import React from "react";
import { X } from "lucide-react";

// images
import avatar from "../assets/profile.png"; // Update the path as needed

const ProfileSidebar = ({ onClose, profileInfo }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50">
      {/* Close Button */}
      <div className="p-4 flex justify-between items-center border-b bg-primary text-white">
        <h2 className="text-lg font-semibold">Profile Info</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary rounded focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Content */}
      <div className="p-4">
        <div className="text-center mt-2">
          {/* Profile Picture */}
          <img
            src={avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-primary"
          />

          {/* Name */}
          <h4 className="mt-2 mb-0 text-xl font-semibold text-primary">
            {profileInfo.name}
          </h4>

          {/* Profile Details */}
          <div className="mt-4 pt-4 border-t text-start">
            <div className="space-y-3">
              {/* Email */}
              <div className="p-3 bg-info/10 rounded-lg">
                <p className="text-sm text-info">Email</p>
                <p className="text-sm text-gray-800">{profileInfo.email}</p>
              </div>

              {/* NID */}
              <div className="p-3 bg-warning/10 rounded-lg">
                <p className="text-sm text-warning">NID</p>
                <p className="text-sm text-gray-800">{profileInfo.nid}</p>
              </div>

              {/* Telegram */}
              <div className="p-3 bg-success/10 rounded-lg">
                <p className="text-sm text-success">Telegram</p>
                <p className="text-sm text-gray-800">{profileInfo.telegram}</p>
              </div>

              {/* Date of Birth */}
              <div className="p-3 bg-purple-100 rounded-lg">
                <p className="text-sm text-purple-600">Date of Birth</p>
                <p className="text-sm text-gray-800">{profileInfo.dateOfBirth}</p>
              </div>

              {/* Gender */}
              <div className="p-3 bg-pink-100 rounded-lg">
                <p className="text-sm text-pink-600">Gender</p>
                <p className="text-sm text-gray-800">{profileInfo.gender}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;