"use client";

import React, { useEffect, useState } from "react";
import api from "@/axios/axios";
import { redirect } from "next/navigation";
import { useAI } from "@/context/AIContext";
import BookReviews from "./ai/BookReview";
import { ExternalLink } from "lucide-react";
/* --------------------- BOOK CARD ----------------------- */
function BookCard({ book }) {
  return (
    <div className="glass rounded-2xl p-4 transition-all duration-300 hover:border-primary/30 glass-hover">
      
      {/* Image Section */}
      <div 
          className="relative aspect-[3/4] w-full overflow-hidden rounded-xl mb-4"
      >
        <img
          src={book.coverUrl}
          alt={book.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105 w-full"
          onError={(e) => (e.target.style.display = "none")}
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent rounded-2xl"></div> */}

        {/* <span className="absolute bottom-3 left-3 bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow">
          Book
        </span> */}
      </div>

   
  {/* Title + Author */}
  <div className="mt-2">
    <h3 className="text-lg font-bold text-white truncate">{book.title}</h3>
    <p className="text-yellow-500 text-sm mt-1 truncate">{book.author}</p>
  </div>

  {/* Description (optional, uncomment if needed) */}
  {/* {book.description && (
    <p className="text-gray-300 text-sm mt-2 line-clamp-3">
      {book.description}
    </p>
  )} */}

  {/* Actions */}
  <div className="flex gap-4 mt-4">
    {book.fileUrl && (
      <a
        href={book.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className=" px-4 mt-4 w-30 flex items-center justify-center gap-2 bg-yellow-600 text-white py-2 rounded-xl font-semibold hover:bg-gray-900 transition"
      >
        <ExternalLink size={16} />
            <span className="">Read</span>
      </a>
    )}
    <BookReviews bookId={book} />
  </div>
    </div>
  );
}
/* ---------------------- MAIN PAGE ---------------------- */
function Books() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const { title, setTitle } = useAI()
  const [activeCat, setActiveCat] = useState("all");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get("/user/getBookList");
        if (Array.isArray(res.data.categories)) setCategories(res.data.categories);
      } catch (err) {
        console.error("Error loading categories:", err);
        setMessage("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const isEmpty = title.length === 0;
        const res = isEmpty
          ? await api.get("/user/getBookList")
          : await api.get(
              `/user/getBookList/${title[0]}/${title[1]}/${title[2]}/${title[3]}`
            );

        const booksData = Array.isArray(res.data.books)
          ? res.data.books
          : Array.isArray(res.data)
          ? res.data
          : [];
        setBooks(booksData);
      } catch (err) {
        console.error("Error fetching books:", err);
        setMessage("Failed to load books");
        if (err?.response?.status === 401) redirect("/signin");
      }
    };
    fetchBooks();
  }, [title]);

  const pillBase =
    "whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200";
  const pillInactive = "bg-gray-700 text-gray-200 hover:bg-yellow-500";
  const pillActive = "bg-yellow-600 text-white";

  return (
    <div className="p-6 min-h-screen bg-[#030A17] max-w-[2048px] mx-auto">
      {/* FILTER SLIDER */} 
      <div className=" mb-4">
        <div className="relative">
          <div
            className="flex gap-3 px-2 py-2 overflow-x-auto no-scrollbar snap-x snap-mandatory"
            role="tablist"
            aria-orientation="horizontal"
          >
            {/* All */}
            <button
              role="tab"
              aria-pressed={activeCat === "all"}
              onClick={() => {
                setTitle([]);
                setActiveCat("all");
              }}
              className={`${pillBase} ${activeCat === "all" ? pillActive : pillInactive}`}
              style={{ minWidth: 72 }}
            >
              All
            </button>

            {/* Categories */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-pressed={activeCat === cat.id}
                onClick={() => {
                  setTitle(["all", "all", cat.id, "all"]);
                  setActiveCat(cat.id);
                }}
                className={`${pillBase} ${
                  activeCat === cat.id ? pillActive : pillInactive
                }`}
                style={{ minWidth: 120 }}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MESSAGE */}
      {message && (
        <p className="text-red-500 mb-4 font-medium text-center">{message}</p>
      )}

      {/* BOOK LIST */}
      {books.length === 0 ? (
        <p className="text-gray-400 text-center">No books available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-[85%] mx-auto">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Books;
