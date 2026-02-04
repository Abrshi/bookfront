"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/axios/axios";
import { useAuth } from "@/context/AuthContext";

export default function CommentSection() {
  const [type, setType] = useState("suggest_book");
  const [comment, setComment] = useState("");

  const { user, loading } = useAuth();
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    // If user is not logged in → redirect
    if (!user) {
      router.push("/login");
      return;
    }

    const data = {
      type,
      comment,
      userId: user.user.id,
    };

    try {
      await api.post("/user/comment", data);
      console.log("Submitted:", data);
      alert("Thanks for your feedback!");
      setComment("");
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  if (loading) return null;

  return (
    <div className="w-full p-6 rounded-xl shadow-xl max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Send us your Feedback</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        {/* Select Type */}
        <div>
          <label className="block mb-2 text-sm">Feedback Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 rounded border border-gray-700"
          >
            <option value="suggest_book">Suggest New Book Upload</option>
            <option value="interface_improvement">
              Interface Improvement
            </option>
            <option value="bug">Bug / Anomaly</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Text Input */}
        <div>
          <label className="block mb-2 text-sm">Your Message</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            placeholder="Write your comment here..."
            className="w-full p-3 rounded border border-gray-700 resize-none"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded button1 hover:bg-button2 font-semibold transition"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
