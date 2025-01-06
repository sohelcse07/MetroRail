import React from 'react';

const Form = () => {
  return (
    <div className="bg-blue-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Plan Your Journey</h2>
      <a href="#" className="text-blue-500 mb-4 block">Click here to plan through <span className="underline">Interactive Map</span></a>
      <form className="space-y-4">
        <div>
          <label className="block text-red-600 mb-1">From</label>
          <input type="text" placeholder="Type station name or click to select" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block text-red-600 mb-1">To</label>
          <input type="text" placeholder="Type station name or click to select" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block text-red-600 mb-1">Leaving</label>
          <div className="flex items-center">
            <input type="text" value="Now" readOnly className="w-full p-2 border border-gray-300 rounded mr-2" />
            <a href="#" className="text-blue-500">Change Time</a>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-red-600 mb-1">Advanced Filter</label>
          <div className="flex space-x-2">
            <button type="button" className="flex-1 p-2 bg-red-500 text-white rounded">Shortest Route</button>
            <button type="button" className="flex-1 p-2 bg-white text-black border border-gray-300 rounded">Minimum Interchange</button>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button type="reset" className="text-blue-500">Reset</button>
          <button type="submit" className="p-2 bg-red-500 text-white rounded">Show Route & Fare</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
