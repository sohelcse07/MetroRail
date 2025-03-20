import React from "react";

const PermanentTicketPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-danger mb-4">Permanent Ticket</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ticket Type</label>
          <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            <option>General Support</option>
            <option>Technical Issue</option>
            <option>Billing Inquiry</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            placeholder="Describe your issue"
          />
        </div>
        <button className="w-full bg-danger text-white p-2 rounded-md hover:bg-danger/90">
          Submit Ticket
        </button>
      </div>
    </div>
  );
};

export default PermanentTicketPage;