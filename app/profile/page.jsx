"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading || !user?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        Loading profile…
      </div>
    );
  }

  const profile = user.user;

  const firstLetter =
    profile.fullName?.[0]?.toUpperCase() ||
    profile.email?.[0]?.toUpperCase() ||
    "?";

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-500 text-black text-2xl font-bold">
            {firstLetter}
          </div>

          <div>
            <h1 className="text-xl font-semibold leading-tight">
              {profile.fullName || "Unnamed User"}
            </h1>
            <p className="text-sm text-gray-400">
              {profile.email}
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="mt-8 bg-gray-900 rounded-lg border border-gray-800 p-6">

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Your Is ID</span>
              <span className="font-medium">{profile.id}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Role</span>
              <span className="font-medium capitalize">
                {profile.role || "user"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => router.push("/profile/edit")}
              className="flex-1 bg-yellow-500 text-black font-medium py-2 rounded-md hover:bg-yellow-400 transition f"
            >
              Edit profile 
            </button>

            <button
              onClick={() => router.push("/")}
              className="flex-1 border border-gray-700 text-gray-300 py-2 rounded-md hover:border-gray-500 transition"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
