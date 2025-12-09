"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import BookSuggestion from "../books/ai/BookSearch";
import { useAI } from "@/context/AIContext";
import ProfileSection from "@/components/Profile/ProfileSection";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const { setTitle } = useAI();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Books", href: "/bookList" },
    { name: "Comments", href: "/Comment" },
    { name: "About", href: "/#" },
    { name: "Contact", href: "/#" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Book
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-between items-center space-x-6 w-[60%]">
            <div className="flex gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="pl-5 hover:underline transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <span className="text-gray-300">Loading...</span>
            ) : user?.user ? (
              <div className="hidden md:flex items-center gap-4">
                <BookSuggestion
                  onSuggested={(bookTitle) => setTitle(bookTitle)}
                />
                <ProfileSection />
              </div>
            ) : (
              <div className="hidden md:flex space-x-4">
                <Link href="/signin" className="hover:underline transition">
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 font-semibold rounded-md hover:underline transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-md"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md transition-all duration-300">
          <nav className="px-2 pt-2 pb-4 space-y-1">

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-slate-200 transition"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Logged-in View */}
            {user?.user && (
              <>
                <div className="px-3 py-2">
                  <BookSuggestion
                    onSuggested={(bookTitle) => {
                      setTitle(bookTitle);
                      setMobileMenuOpen(false);
                    }}
                  />
                </div>

                <div className="px-3 py-2 text-yellow-500">
                  <ProfileSection />
                </div>
              </>
            )}

            {/* Mobile Auth */}
            {!user?.user && !loading && (
              <>
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-yellow-500 hover:bg-slate-200 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md bg-yellow-600 text-black font-semibold hover:bg-yellow-500 transition"
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
