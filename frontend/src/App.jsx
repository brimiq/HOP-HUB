import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Compare from "./pages/compare";
import Results from "./pages/Results";
import Login from "./pages/Login";
import HowToUse from "./pages/HowToUse";
import FaqContact from "./pages/FaqContact";
import "./input.css"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/faq-contact" element={<FaqContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
