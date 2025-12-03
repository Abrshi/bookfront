"use client"; // if this is Next.js 13 app router

import React, { useState } from "react";
import AddBook from "@/components/Admin/AddBook";
import AddBookCategory from "@/components/Admin/AddBookCategory";
import DalitCategory from "@/components/Admin/DalitCategory";

export default function Page() {
  const [activeTab, setActiveTab] = useState("category"); // default tab

  return (
    <div className="p-4 min-h-screen bg-black">
      {/* Tab buttons */}
      <div className="flex space-x-4 mb-4 ">
        <button
          className={`px-4 py-2 rounded text-white ${
            activeTab === "category" ? "bg-yellow-900" : "bg-yellow-600"
          }`}
          onClick={() => setActiveTab("category")}
        >
          Add Category
        </button>
        <button
          className={`px-4 py-2 rounded text-white ${
            activeTab === "book" ? "bg-yellow-900" : "bg-yellow-600"
          }`}
          onClick={() => setActiveTab("book")}
        >
          Add Book
        </button>
         <button
          className={`px-4 py-2 rounded text-white ${
            activeTab === "dalitcategory" ? "bg-yellow-900" : "bg-yellow-600"
          }`}
          onClick={() => setActiveTab("dalitcategory")}
        >
          Dalit Category
        </button>
      </div>
      {/* Conditional rendering */}
      <div>
        {activeTab === "category" && <AddBookCategory />}
        {activeTab === "book" && <AddBook />}
        {activeTab === "dalitcategory" && <DalitCategory />}
      </div>
    </div>
  );
}
