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
 if(user){
  console.log("User in Header:", user);
 }else{
  console.log("No user in Header");
 }
  const navigation = [{ name: "Home", href: "/" }];

  return (
    <header className="sticky top-0 z-50 bg-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-yellow-500">
            Book
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-between items-center space-x-6 w-[60%] ">
           <>
             {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-yellow-400 hover:text-yellow-200 transition-colors"
              >
                {item.name}
              </Link>
            ))}
           </>

            {user?.user && (
              <div className="flex Justify-end">
                <BookSuggestion
                  onSuggested={(bookTitle) => setTitle(bookTitle)}
                />
              </div>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <span className="text-gray-300">Loading...</span>
            ) : user?.user ? (
              <span className="text-yellow-400 font-medium hidden md:block">
                <ProfileSection />
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

            {/* Mobile Button */}
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
        <div className="md:hidden bg-slate-800 shadow-md transition-all duration-300">
          <nav className="px-2 pt-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-yellow-400 hover:bg-slate-700 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {user?.user && (
              <BookSuggestion
                onSuggested={(bookTitle) => {
                  setTitle(bookTitle);
                  setMobileMenuOpen(false);
                }}
              />
            )}

            {/* Mobile Auth */}
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
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-yellow-400 hover:bg-slate-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md bg-yellow-600 text-black font-semibold hover:bg-yellow-500 transition-colors"
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
