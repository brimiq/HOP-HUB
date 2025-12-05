import { BrowserRouter, Routes, Route } from "react-router-dom";
import Compare from "./pages/compare";
import Results from "./pages/Results";
import "./input.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Compare />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
