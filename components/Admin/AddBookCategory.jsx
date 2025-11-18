"use client";

import { useState } from "react";
import api from "@/axios/axios";

export default function AddBookCategory() {
  const [catagory, setCatagory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!catagory.trim()) {
      setMessage("Category is required");
      return;
    }

    try {
      const res = await api.post("/admin/addbookcatagory", { catagory });

      setMessage(res.data.message);
      setCatagory("");

    } catch (error) {
      console.error("Error:", error);

      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-2">Add Book Category</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="catagory"
          value={catagory}
          onChange={(e) => setCatagory(e.target.value)}
          placeholder="Enter category name"
          className="border p-2 rounded"
        />

        <button className="bg-yellow-600 text-white py-2 rounded" type="submit">
          Add Category
        </button>
      </form>

      {message && (
        <p className="mt-3 text-sm text-red-600">{message}</p>
      )}
    </div>
  );
}
