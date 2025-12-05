import React, { useState } from "react";
import Navbar from "../components/navbar";

export default function Compare() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ pickup, destination });
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
            Compare Rides
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white rounded-lg p-3 hover:bg-orange-600 transition font-semibold"
            >
              Compare
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
