import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const results = location.state?.results || [];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="text-blue-500 underline mb-4"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Results</h1>

      {results.length === 0 && <p>No results to show.</p>}

      {results.map((item, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg shadow mb-3"
        >
          <h2 className="text-xl font-semibold">{item.provider}</h2>
          <p className="text-gray-600">KES {item.price}</p>
          <p className="text-gray-500">ETA: {item.eta} min</p>
        </div>
      ))}
    </div>
  );
}
