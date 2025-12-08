"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfileSection() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;
  
  // Get first letter
  const firstLetter =
    user.user.fullName?.charAt(0).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() 

  return (
    <button
      onClick={() => router.push("/profile")}
      className="
        w-10 h-10 flex items-center justify-center 
        rounded-full 
        border-2 border-yellow-500 
        bg-black 
        text-white 
        font-bold 
        hover:border-yellow-600 
        transition
      "
    >
      {firstLetter}
    </button>
  );
}
