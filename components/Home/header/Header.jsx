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
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white shadow-md text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link href="/" className="text-2xl font-bold">
              Book
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:underline transition"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Skeleton while loading */}
              {loading && (
                <div className="hidden md:block w-24 h-6 bg-gray-200 rounded animate-pulse" />
              )}

              {/* Auth Ready */}
              {!loading && (
                user?.user ? (
                  <div className="hidden md:flex items-center gap-4">
                    <BookSuggestion
                      onSuggested={(bookTitle) => setTitle(bookTitle)}
                    />
                    <ProfileSection />
                  </div>
                ) : (
                  <div className="hidden md:flex gap-4">
                    <Link href="/signin" className="hover:underline">
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="px-4 py-2 rounded-md font-semibold bg-yellow-500 text-black hover:bg-yellow-400 transition"
                    >
                      Sign Up
                    </Link>
                  </div>
                )
              )}

              {/* Mobile Menu Button */}
              <button
                aria-label="Toggle menu"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-md"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden">
          <div className="bg-white h-full w-full shadow-lg animate-slideDown">

            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={28} />
              </button>
            </div>

            <nav className="px-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-medium hover:underline"
                >
                  {item.name}
                </Link>
              ))}

              {/* Logged-in Mobile */}
              {!loading && user?.user && (
                <>
                  <div className="pt-4">
                    <BookSuggestion
                      onSuggested={(bookTitle) => {
                        setTitle(bookTitle);
                        setMobileMenuOpen(false);
                      }}
                    />
                  </div>

                  <div className="pt-4">
                    <ProfileSection />
                  </div>
                </>
              )}

              {/* Auth Mobile */}
              {!loading && !user?.user && (
                <div className="pt-6 space-y-3">
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-lg hover:underline"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center bg-yellow-500 text-black font-semibold py-2 rounded-md hover:bg-yellow-400 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
