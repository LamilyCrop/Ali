"use client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import React, { useEffect } from "react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        {/* Prevent browser from restoring last scroll position on refresh */}
        <ScrollRestorationOff />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function ScrollRestorationOff() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Reset to the top on load
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Also ensure on visibility change from bfcache we reset
    const handlePageshow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    };
    window.addEventListener("pageshow", handlePageshow);
    return () => window.removeEventListener("pageshow", handlePageshow);
  }, []);
  return null;
}


