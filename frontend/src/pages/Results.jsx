import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";

export default function Results() {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/results/");
        if (!response.ok) throw new Error("Failed to fetch results");
        const data = await response.json();
        setSearches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">
            Last 3 Searches
          </h2>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && searches.length === 0 && (
            <p>No recent searches found.</p>
          )}

          <ul className="space-y-3">
            {searches.map((s, i) => (
              <li
                key={i}
                className="border border-gray-300 p-4 rounded-lg flex justify-between items-center"
              >
                <span>{s.pickup} → {s.destination}</span>
                <span className="text-sm text-gray-500">
                  {new Date(s.timestamp * 1000).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
