"use client";

import React, { createContext, useContext, useState } from "react";

const AIContext = createContext();

export function AIProvider({ children }) {
  const [title, setTitle] = useState([]); // AI suggested titles

  return (
    <AIContext.Provider value={{ title, setTitle }}>
      {children}
    </AIContext.Provider>
  );
}

// Custom hook for easier usage
export const useAI = () => useContext(AIContext);
