"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/axios/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false); 
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {loading ? null : children}   {/* <-- FIX: block UI until ready */}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
