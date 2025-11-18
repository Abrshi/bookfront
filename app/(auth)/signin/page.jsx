'use client';
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/axios/axios"; // ✅ Import your axios instance
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);   

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/signin", formData);
      console.log("Signin success:", res.data);
       setUser(res.data);
      setSuccess(res.data.message || "Signin successful!");
       
      // Redirect to dashboard after short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Signin error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Signin failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-black p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center text-lg font-bold">
            BS
          </div>
          <span className="ml-2 text-xl font-semibold">Book Shelf</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-center">Welcome back</h2>
        <p className="text-gray-400 text-center mb-6">
          Sign in to your Book Shelf account to continue creating amazing content.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Email address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <div className="flex items-center border border-gray-600 rounded-md">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent rounded-md focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* ✅ Success message */}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          {/* ❌ Error message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Sign In */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-700 py-2 rounded-md font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {/* OR */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-700" />
            <span className="px-2 text-gray-500 text-sm">OR CONTINUE WITH</span>
            <hr className="flex-1 border-gray-700" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-600 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            <FaGoogle className="mr-2 text-xl" />
            Sign in with Google
          </button>

          {/* Signup */}
          <p className="text-center text-sm mt-6 text-gray-400">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-yellow-400 hover:underline">
              Sign up for free
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
