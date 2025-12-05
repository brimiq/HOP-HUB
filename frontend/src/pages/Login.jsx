import React, { useState } from "react";
import Navbar from "../components/navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple front-end check for now
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // TODO: connect to backend authentication
    alert(`Logged in as ${email}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50">
      <Navbar />
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-6">Login</h2>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-orange-500 text-white rounded-lg p-3 hover:bg-orange-600 transition font-semibold"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
