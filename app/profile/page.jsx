"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user)
    return (
      <div className="w-full h-screen flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );

  const firstLetter =
    user.user.fullName?.charAt(0).toUpperCase() ||
    user.user.email?.charAt(0).toUpperCase() ;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700">

        {/* Avatar */}
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-black border-4 border-yellow-500 text-4xl font-bold mx-auto">
          {firstLetter}
        </div>

        {/* Name */}
        <h1 className="text-3xl font-bold text-center mt-4">
          {user.user.fullName || "Unnamed User"}
        </h1>

        {/* Email */}
        <p className="text-center text-gray-300 mt-1">
          {user.user.email}
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-700 my-6"></div>

        {/* Profile Details */}
        <div className="space-y-3 text-lg">
          <p><span className="font-semibold text-yellow-500">User ID:</span> {user.user.id}</p>
          <p><span className="font-semibold text-yellow-500">Role:</span> {user.user.role || "User"}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col gap-4">

          {/* Edit Profile */}
          <button
            onClick={() => router.push("/profile/#")}
            className="
              bg-yellow-500 hover:bg-yellow-600 
              text-black font-semibold 
              py-2 rounded-lg transition
            "
          >
            Edit Profile
          </button>
          {/* Back Home */}
          <button
            onClick={() => router.push("/")}
            className="
              border border-yellow-500 hover:border-yellow-600 
              text-white py-2 rounded-lg transition
            "
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
