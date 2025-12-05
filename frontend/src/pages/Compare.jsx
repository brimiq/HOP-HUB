import React, { useState } from "react";
import Navbar from "../components/navbar";

export default function Compare() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setQuotes([]);

    try {
      const response = await fetch("http://127.0.0.1:8000/compare/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickup, destination }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Failed to fetch quotes");
      }

      const data = await response.json();
      if (data.length === 0) {
        setError("No quotes found for this route.");
      } else {
        setQuotes(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">
            Compare Rides
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-orange-500 text-white rounded-lg p-3 hover:bg-orange-600 transition font-semibold"
              disabled={loading}
            >
              {loading ? "Comparing..." : "Compare"}
            </button>
          </form>

          {error && (
            <p className="mt-4 text-red-500 font-semibold">{error}</p>
          )}

          {quotes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-orange-600 mb-2">
                Quotes:
              </h3>
              <ul className="space-y-2">
                {quotes.map((q, index) => (
                  <li
                    key={index}
                    className="border border-gray-300 p-3 rounded-lg flex justify-between"
                  >
                    <span>{q.provider}</span>
                    <span>${q.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
