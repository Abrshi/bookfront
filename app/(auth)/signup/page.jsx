'use client';
import React, { useState } from "react";
import api from "@/axios/axios";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
 const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ success message state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(""); // clear old success message

    try {
      const res = await api.post("/auth/signup", formData);

      console.log("Signup success:", res.data);

      
      setSuccess(res.data.message || "Signup successful!");

      //  redirect after short delay
      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-black p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center text-lg font-bold">
            LP
          </div>
          <span className="ml-2 text-xl font-semibold">Book Shelf</span>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-center">Create an account</h2>
        <p className="text-gray-400 text-center mb-6">
          Sign up for Book Shelf to start creating amazing content.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Full Name</label>
            <input
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

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

          {/* Success message */}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-700 py-2 rounded-md font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign up"}
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
          <p className="text-center text-sm mt-6 text-gray-400">
            Already have an account?{" "}
            <Link href="/signin" className="text-yellow-400 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
