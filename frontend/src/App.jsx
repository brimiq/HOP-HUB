import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import Results from "./pages/Results";
import Login from "./pages/Login";
import HowToUse from "./pages/HowToUse";
import FaqContact from "./pages/FaqContact";
import "./input.css";



function App() {
  return (
    <>
    

      <div className="pt-20 px-4">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/faq-contact" element={<FaqContact />} />

          {/* Protected: Compare */}
          <Route
            path="/compare"
            element={
              <>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>

                <SignedIn>
                  <Compare />
                </SignedIn>
              </>
            }
          />

          {/* Protected: Results */}
          <Route
            path="/results"
            element={
              <>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>

                <SignedIn>
                  <Results />
                </SignedIn>
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
