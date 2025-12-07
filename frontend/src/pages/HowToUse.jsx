import React from "react";
import Navbar from "../components/navbar";

export default function HowToUse() {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-3xl mt-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          How to Use HopHub
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>Go to the Compare page.</li>
          <li>Enter your pickup and destination locations.</li>
          <li>Click "Compare" to view quotes from different providers.</li>
          <li>Select your preferred ride based on price and provider.</li>
        </ol>
      </div>
    </div>
  );
}
