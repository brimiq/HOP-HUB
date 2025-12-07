import React, { useState } from "react";
import Navbar from "../components/navbar";
export default function Compare() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("cheapest");

  const exampleRoutes = [
    { pickup: "Nairobi", destination: "Westlands" },
    { pickup: "Kilimani", destination: "CBD" },
    { pickup: "Gigiri", destination: "Karen" },
    { pickup: "Langata", destination: "Ngong Road" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setQuotes([]);

    try {
      const response = await fetch("http://127.0.0.1:8000/compare/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickup, destination, sort }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Failed to fetch quotes");
      }

      const data = await response.json();
      setQuotes(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyExampleRoute = (route) => {
    setPickup(route.pickup);
    setDestination(route.destination);
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">
            Compare Rides
          </h2>

          {/* Example Routes */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-600">
              Quick Picks:
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {exampleRoutes.map((r, i) => (
                <button
                  key={i}
                  className="bg-orange-100 p-2 rounded-lg hover:bg-orange-200 transition text-sm"
                  onClick={() => applyExampleRoute(r)}
                >
                  {r.pickup} → {r.destination}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
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

            {/* Sort Dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 focus:outline-none"
            >
              <option value="cheapest">Cheapest First</option>
              <option value="fastest">Fastest First</option>
            </select>

            <button
              type="submit"
              className="bg-orange-500 text-white rounded-lg p-3 hover:bg-orange-600 transition font-semibold"
              disabled={loading}
            >
              {loading ? "Comparing..." : "Compare"}
            </button>
          </form>

          {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}

          {/* Results */}
          {quotes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-orange-600 mb-2">Results:</h3>
              <ul className="space-y-3">
                {quotes.map((q, i) => (
                  <li
                    key={i}
                    className="border border-gray-300 p-4 rounded-lg flex justify-between items-center"
                  >
                    <div className="text-left">
                      <p className="font-semibold">{q.provider}</p>
                      <p className="text-sm text-gray-600">{q.eta} min away</p>
                    </div>
                    <span className="text-lg font-bold text-orange-600">
                      ${q.price.toFixed(2)}
                    </span>
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
