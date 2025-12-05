import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

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
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/how-to-use" element={<HowToUse />} />
      <Route path="/faq-contact" element={<FaqContact />} />

      {/* Protected pages */}
      <Route
        path="/compare"
        element={
          <SignedIn>
            <Compare />
          </SignedIn>
        }
      />
      <Route
        path="/results"
        element={
          <SignedIn>
            <Results />
          </SignedIn>
        }
      />

      {/* Redirect to login if not signed in */}
      <Route
        path="/compare"
        element={
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        }
      />
      <Route
        path="/results"
        element={
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        }
      />
    </Routes>
  );
}

export default App;
