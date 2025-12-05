// pages/Login.jsx
import React, { useState } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";

export default function Login() {
  const [tab, setTab] = useState("signIn");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-4">
        <button
          className={`px-4 py-2 ${tab === "signIn" ? "bg-orange-200 font-bold" : ""}`}
          onClick={() => setTab("signIn")}
        >
          Sign In
        </button>
        <button
          className={`px-4 py-2 ${tab === "signUp" ? "bg-orange-200 font-bold" : ""}`}
          onClick={() => setTab("signUp")}
        >
          Sign Up
        </button>
      </div>

      <div className="w-full max-w-md">
        {tab === "signIn" ? <SignIn redirectUrl="/compare" /> : <SignUp redirectUrl="/compare" />}
      </div>
    </div>
  );
}
