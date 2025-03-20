import React from "react";

const SettingsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-warning mb-4">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Notifications</label>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Email Notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Push Notifications</span>
            </label>
          </div>
        </div>
        <button className="w-full bg-warning text-white p-2 rounded-md hover:bg-warning/90">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;