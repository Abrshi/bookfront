"use client";

import { useState } from "react";

export default function CommentSection() {
  const [type, setType] = useState("suggest_book");
  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      type,
      comment,
    };

    console.log("Submitted:", data);
    alert("Thanks for your feedback!");
    
    setComment(""); // reset
  };

  return (
    <div className="w-full bg-black text-white p-6 rounded-xl shadow-xl max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Send us your Feedback</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        
        {/* Select Type */}
        <div>
          <label className="block mb-2 text-sm">Feedback Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
          >
            <option value="suggest_book">📚 Suggest New Book Upload</option>
            <option value="interface_improvement">✨ Interface Improvement</option>
            <option value="bug">🐞 Bug / Anomaly</option>
            <option value="other">💬 Other</option>
          </select>
        </div>

        {/* Text Input */}
        <div>
          <label className="block mb-2 text-sm">Your Message</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="5"
            placeholder="Write your comment here..."
            className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
