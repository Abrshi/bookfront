"use client";

import React, { useState } from "react";
import AddBook from "@/components/Admin/AddBook";
import AddBookCategory from "@/components/Admin/AddBookCategory";
import DalitCategory from "@/components/Admin/DalitCategory";
import User from "@/components/Admin/User";
import HeroSECtionControle from "@/components/Admin/HeroSECtionControle";

export default function Page() {
  const [activeTab, setActiveTab] = useState("category");

  const tabs = [
    { key: "category", label: "Add Category" },
    { key: "book", label: "Add Book" },
    { key: "dalitcategory", label: "Dalit Category" },
    { key: "user", label: "User" },
    { key: "HeroSECtionControle", label: "Hero Control" },
  ];

  return (
    <div className="p-4 min-h-screen bg-black text-white">
      {/* Tab Container */}
      <div className="flex flex-wrap gap-3 mb-6 bg-white/5 p-3 rounded-xl border border-white/10 shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all 
              ${
                activeTab === tab.key
                  ? "bg-yellow-600 text-black shadow-md"
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white/5 p-5 rounded-xl border border-white/10 shadow-xl min-h-[400px]">
        {activeTab === "category" && <AddBookCategory />}
        {activeTab === "book" && <AddBook />}
        {activeTab === "dalitcategory" && <DalitCategory />}
        {activeTab === "user" && <User />}
        {activeTab === "HeroSECtionControle" && <HeroSECtionControle />}
      </div>
    </div>
  );
}
