"use client";

import React, { useEffect, useState } from "react";
import api from "@/axios/axios";
import { Eye , BookOpen } from "lucide-react";

function Books() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/user/getBookList");
        setBooks(res.data || []);
      } catch (err) {
        console.error("Error fetching books:", err);
        setMessage("Failed to load books");
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-900">
      {message && (
        <p className="text-red-500 mb-4 font-medium text-center">{message}</p>
      )}

      {books.length === 0 ? (
        <p className="text-gray-600 text-center">No books available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Cover Image or Icon */}
              {book.coverUrl ? (
                // <img
                //   src={book.coverUrl}
                //   alt={book.title}
                //   className="w-full h-48 object-cover"
                // />
                <div className="w-16 h-16 mt-10 bg-yellow-50 flex items-center justify-center  m-auto border-2 rounded-full overflow-hidden">
                  <BookOpen className="w-12 h-16 text-12 text-yellow-400" />
                </div>
              ) : (
                <div className="w-16 h-16 mt-10 bg-yellow-50 flex items-center justify-center  m-auto border-2 rounded-full overflow-hidden">
                  <BookOpen className="w-12 h-16 text-12 text-yellow-400" />
                </div>
              )}
              {/* Book Info */}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-1 text-yellow-600 truncate">
                  {book.title}
                </h3>

                <p className="text-white mb-2">
                  <span className="font-semibold ">Author:</span> {book.author}
                </p>

                {book.description && (
                  <p className="text-white text-sm line-clamp-3 mb-4">
                    {book.description}
                  </p>
                )}
                {/* Download Button */}
                {book.fileUrl && (
                  <a
                    href={book.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    <Eye  className="w-5 h-5" />
                    View
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Books;
