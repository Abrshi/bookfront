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
    <div className="rounded-md p-4 bg-black/5 backdrop-blur-md shadow-md transition-all duration-300 hover:shadow-xl border border-black/20 m-5 text-black/80">
      
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
            <h3 className="text-lg font-bold truncate">{book.title}</h3>
            <p className="text-sm mt-1 truncate">{book.author}</p>
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
                className="button1"
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
          ? await api.get("/user/getTopBookList")
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
    <div className="p-6 min-h-screen bg-white max-w-[2048px] mx-auto align-middle">
      {/* FILTER SLIDER */} 
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-black">Top Books</h2>
        <p className="text-base text-gray-600 mt-2">Say something here</p>
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
      <a className="px-4 mx-auto w-96 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-xl font-semibold hover:bg-black/80 hover:scale-105 transition" href="/bookList">Bet All Books--</a>
    </div>
  );
}

export default Books;
