"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface SmoothScrollContextType {
  lenisInstance: unknown | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenisInstance: null,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<unknown | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenisInstance: lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export default SmoothScrollProvider;
