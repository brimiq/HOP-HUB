import React, { useState } from "react";
import Navbar from "../components/navbar";

export default function FaqContact() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    setSuccess("Message sent! We'll get back to you soon.");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center">
      <Navbar />

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-3xl mt-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          FAQ & Contact Us
        </h2>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>How do I compare rides? → Use the Compare page and enter pickup/destination.</li>
            <li>Is there a mobile version? → Yes, fully responsive design.</li>
            <li>Can I see all providers? → Yes, they are listed on the Compare page.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">Send us a Message</h3>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <textarea
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 focus:outline-none"
              rows={4}
            />
            <button
              type="submit"
              className="bg-orange-500 text-white rounded-lg p-3 hover:bg-orange-600 transition font-semibold"
            >
              Send
            </button>
          </form>
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </section>
      </div>
    </div>
  );
}
