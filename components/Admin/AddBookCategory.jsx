"use client";

import { useState } from "react";
import api from "@/axios/axios";

export default function AddBookCategory() {
  const [catagory, setCatagory] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!catagory.trim()) {
      setIsSuccess(false);
      setMessage("Category is required");
      return;
    }

    try {
      const res = await api.post("/admin/addbookcatagory", { catagory });

      setIsSuccess(true);
      setMessage(res.data.message || "Category added successfully!");
      setCatagory("");

    } catch (error) {
      console.error("Error:", error);

      setIsSuccess(false);
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-xl">
      <h2 className="text-2xl font-semibold mb-4 text-yellow-500">
        Add Book Category
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="catagory"
          value={catagory}
          onChange={(e) => setCatagory(e.target.value)}
          placeholder="Enter category name"
          className="bg-black/20 border border-white/20 text-white p-3 rounded-lg outline-none focus:border-yellow-500 transition"
        />

        <button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-700 text-black font-medium py-2 rounded-lg transition shadow"
        >
          Add Category
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm font-medium ${
            isSuccess ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
