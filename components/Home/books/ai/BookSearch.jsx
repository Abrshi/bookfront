"use client";

import React, { useState, useEffect } from "react";
import api from "@/axios/axios";
import { ArrowUpRight, Loader2, X } from "lucide-react";

function BookSearch({ onSuggested }) {
  const [userPrompt, setUserPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    setIsLoading(true);
    setResult(null);
    setShowResult(false);

    try {
      const res = await api.post("/user/sugestBook", { userPrompt });
      setResult(res.data);
      setShowResult(true);

      if (res.data?.book?.id && onSuggested) {
        onSuggested([
          res.data.book.title,
          res.data.book.author,
          res.data.book.categoryId,
          res.data.book.description,
        ]);
      }

      // Hide error message automatically after 4 seconds
      if (!res.data?.book) {
        setTimeout(() => setShowResult(false), 4000);
      }
    } catch (error) {
      console.error("AI Book Suggestion Error:", error);
      setResult({ message: "Something went wrong. Please try again." });
      setShowResult(true);

      // Auto-hide error after 4 seconds
      setTimeout(() => setShowResult(false), 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-72 relative">
      {/* Search input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border border-yellow-600 rounded-full p-2 h-11"
      >
        <input
          type="text"
          placeholder="Serch book by AI..."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          disabled={isLoading}
          className="w-full text-white px-3 py-2 bg-transparent placeholder-gray-500 focus:outline-none h-1"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="p-2 text-white rounded-md  hover:bg-gray-700 transition disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <ArrowUpRight />}
        </button>
      </form>

      {/* Result box */}
      {showResult && result && (
        <div className="mt-4 p-4 border border-gray-200 bg-gray-50 rounded-lg relative animate-fadeIn">
          {/* Close button */}
          <button
            onClick={() => setShowResult(false)}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          {result.book ? (
            <>
              <h3 className="font-semibold text-lg text-gray-900 truncate">
                {result.book.title}
              </h3>

              <p className="text-sm text-gray-500 mb-2 truncate">
                by {result.book.author}
              </p>

              <div className="p-3 bg-gray-100 text-gray-700 text-sm rounded-md italic">
                "{result.ai_reasoning}"
              </div>
            </>
          ) : (
            <p className="text-red-500 font-medium">
              {result.message || "No relevant book found."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default BookSearch;
