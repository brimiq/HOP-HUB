import ResultCard from "../components/ResultCard";

// Inside map for currentResults:
{currentResults.map((r, idx) => (
  <ResultCard
    key={idx}
    provider={r.provider}
    price={r.price}
    eta={r.eta}
    score={r.score}
  />
))}

// Inside map for lastSearches.results:
{search.results.map((r, i) => (
  <ResultCard
    key={i}
    provider={r.provider}
    price={r.price}
    eta={r.eta}
    score={r.score}
  />
))}
