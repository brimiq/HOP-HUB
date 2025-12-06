import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center">
  
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">
          Welcome to HopHub
        </h1>
        <p className="text-gray-700 mb-8">
          Compare rides and choose the best price from multiple providers.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-orange-500 text-white rounded-lg p-4 w-48 hover:bg-orange-600 transition font-semibold"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
