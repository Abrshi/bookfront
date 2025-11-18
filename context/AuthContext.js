"use client";

import { createContext, useContext, useState, useEffect } from "react";

import api from "@/axios/axios";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // global user state
  const [loading, setLoading] = useState(true); // to show loading until checked

  // Runs ONLY on page refresh or new tab load
useEffect(() => {
  async function loadUser() {
    try {
      const res = await api.get("/auth/me"); // axios auto-parses JSON
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
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
