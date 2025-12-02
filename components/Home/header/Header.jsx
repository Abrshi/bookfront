"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import BookSuggestion from "../books/ai/BookSearch";
import { useAI } from "@/context/AIContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
const { title, setTitle } = useAI()
  const navigation = [
    { name: "Home", href: "/" },
   
  ];

  return (
    <header className="sticky top-0 z-500 bg-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-yellow-500">
            Book
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 w-[60%] items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-yellow-400 hover:text-yellow-200 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="w-full">
           {user?.user?(<BookSuggestion
              onSuggested={(bookTitle) => {
                setTitle(bookTitle); // updates global state
              }}
            />):null}
         </div>
          </nav>

         

          {/* Right Section */}
          <div className="flex items-center space-x-4 ">
            {loading ? (
              <span className="text-gray-300">Loading...</span>
            ) : user?.user ? (
              <span className="text-yellow-400 font-medium hidden md:flex ">
                Welcome, {user.user.fullName}
              </span>
            ) : (
              <div className="hidden md:flex space-x-4">
                <Link
                  href="/signin"
                  className="text-yellow-400 hover:text-yellow-200 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-yellow-600 text-black font-semibold rounded-md hover:bg-yellow-500 transition-colors"
                >
                  Sign Up    
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-md text-yellow-400 hover:text-yellow-200 transition-colors"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 shadow-md transform transition-transform duration-300 ease-in-out">
          <nav className="px-2 pt-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-yellow-400 hover:bg-yellow-800 hover:text-yellow-200 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
              
            ))}
            <div className="w-full">
              {user?.user?(<BookSuggestion
                  onSuggested={(bookTitle) => {
                    setTitle(bookTitle); // updates global state
                  }}
                />):null}
            </div>

            {/* Mobile Auth Section */}
            {loading ? (
              <span className="block px-3 py-2 text-gray-300">Loading...</span>
            ) : user?.user ? (
              <span className="block px-3 py-2 text-yellow-400">
                Welcome, {user.user.fullName}
              </span>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="block px-3 py-2 rounded-md text-yellow-400 hover:bg-yellow-800 hover:text-yellow-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 rounded-md bg-yellow-600 text-black font-semibold hover:bg-yellow-500 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
