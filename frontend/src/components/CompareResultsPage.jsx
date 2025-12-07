// pages/CompareResultsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ResultCard from "../components/ResultCard";
import { Clock, DollarSign, User, ArrowRight } from "lucide-react";

export default function CompareResultsPage() {
  const [currentResults, setCurrentResults] = useState([]);
  const [lastSearches, setLastSearches] = useState([]);

  // Example: Replace with actual pickup/destination state
  const pickup = "Nairobi";
  const destination = "Westlands";

  useEffect(() => {
    // Fetch current comparison
    axios
      .post("http://localhost:8000/compare/", { pickup, destination, sort: "cheapest" })
      .then((res) => setCurrentResults(res.data.results))
      .catch((err) => console.error(err));

    // Fetch last 3 searches
    axios
      .get("http://localhost:8000/results/", { params: { user_id: "user123" } })
      .then((res) => setLastSearches(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Current Results */}
      <section>
        <h2 className="text-xl font-bold mb-4">Current Comparison</h2>
        <div className="space-y-2">
          {currentResults.length > 0 ? (
            currentResults.map((r, idx) => (
              <ResultCard
                key={idx}
                provider={r.provider}
                price={r.price}
                eta={r.eta}
                score={r.score}
              />
            ))
          ) : (
            <p>No results found for this route.</p>
          )}
        </div>
      </section>

      {/* Last 3 Searches */}
      <section>
        <h2 className="text-xl font-bold mb-4">Your Last 3 Searches</h2>
        <div className="space-y-4">
          {lastSearches.length > 0 ? (
            lastSearches.map((search, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg border">
                <p className="font-medium mb-2">
                  <User size={16} /> {search.pickup} <ArrowRight size={16} /> {search.destination} 
                  <span className="text-sm text-gray-500 ml-2">({new Date(search.timestamp).toLocaleString()})</span>
                </p>
                <div className="space-y-2">
                  {search.results?.map((r, i) => (
                    <ResultCard
                      key={i}
                      provider={r.provider}
                      price={r.price}
                      eta={r.eta}
                      score={r.score}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>You have no previous searches.</p>
          )}
        </div>
      </section>
    </div>
  );
}
