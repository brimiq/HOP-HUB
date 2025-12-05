import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkClasses = (path) =>
    `px-4 py-2 rounded hover:bg-orange-100 transition ${
      location.pathname === path ? "bg-orange-200 font-bold" : ""
    }`;

  return (
    <nav className="bg-white shadow-md w-full py-4 px-6 flex justify-center gap-4">
      <Link to="/" className={linkClasses("/")}>
        Home
      </Link>
      <Link to="/compare" className={linkClasses("/compare")}>
        Compare
      </Link>
      <Link to="/results" className={linkClasses("/results")}>
        Results
      </Link>
      <Link to="/how-to-use" className={linkClasses("/how-to-use")}>
        How to Use
      </Link>
      <Link to="/faq-contact" className={linkClasses("/faq-contact")}>
        FAQ / Contact
      </Link>
      <Link to="/login" className={linkClasses("/login")}>
        Login
      </Link>
    </nav>
  );
}
