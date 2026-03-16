"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeType = 'premium' | 'warm' | 'futuristic' | 'minimalist' | 'vibrant';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themes: Record<ThemeType, { name: string; description: string; }>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes: Record<ThemeType, { name: string; description: string; }> = {
  premium: {
    name: 'Premium Blue',
    description: 'Professional and sophisticated lighting industry theme'
  },
  warm: {
    name: 'Warm Earth',
    description: 'Cozy and inviting with natural earth tones'
  },
  futuristic: {
    name: 'Cyber Neon',
    description: 'High-tech futuristic with neon accents'
  },
  minimalist: {
    name: 'Clean Minimal',
    description: 'Simple and elegant monochrome design'
  },
  vibrant: {
    name: 'Energy Burst',
    description: 'Bold and energetic with vibrant colors'
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('premium');

  useEffect(() => {
    // Apply theme class to document root
    const root = document.documentElement;
    
    // Remove all theme classes
    Object.keys(themes).forEach(t => {
      root.classList.remove(`theme-${t}`);
    });
    
    // Add current theme class
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};