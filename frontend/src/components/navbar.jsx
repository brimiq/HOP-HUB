import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-orange-500 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">HopHub</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/compare" className="underline">Compare</Link>
          <Link to="/results" className="hover:underline">Results</Link>
        </div>
      </div>
    </nav>
  );
}
