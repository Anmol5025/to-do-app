import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    
    // Check if matchMedia is available (not in test environment)
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    return false; // Default to light theme
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.body.style.backgroundColor = isDark ? '#1a1a2e' : '#f8f9fa';
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark ? darkColors : lightColors
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

const lightColors = {
  background: '#f8f9fa',
  surface: '#ffffff',
  surfaceAlt: '#fafbfc',
  text: '#2c3e50',
  textSecondary: '#5a6c7d',
  textTertiary: '#7f8c8d',
  border: '#e0e6ed',
  borderLight: '#e8eaf6',
  shadow: 'rgba(0,0,0,0.08)',
  shadowMedium: 'rgba(0,0,0,0.12)',
  shadowLarge: 'rgba(0,0,0,0.2)',
  primary: '#667eea',
  primaryHover: '#5568d3',
  success: '#27ae60',
  successHover: '#229954',
  danger: '#e74c3c',
  dangerHover: '#c0392b',
  warning: '#f39c12',
  info: '#6c757d',
  high: '#e74c3c',
  medium: '#f39c12',
  low: '#95a5a6',
  tag: '#e8eaf6',
  tagText: '#5e35b1'
};

const darkColors = {
  background: '#1a1a2e',
  surface: '#16213e',
  surfaceAlt: '#0f3460',
  text: '#e4e4e7',
  textSecondary: '#a1a1aa',
  textTertiary: '#71717a',
  border: '#27272a',
  borderLight: '#3f3f46',
  shadow: 'rgba(0,0,0,0.3)',
  shadowMedium: 'rgba(0,0,0,0.4)',
  shadowLarge: 'rgba(0,0,0,0.6)',
  primary: '#818cf8',
  primaryHover: '#6366f1',
  success: '#34d399',
  successHover: '#10b981',
  danger: '#f87171',
  dangerHover: '#ef4444',
  warning: '#fbbf24',
  info: '#94a3b8',
  high: '#f87171',
  medium: '#fbbf24',
  low: '#94a3b8',
  tag: '#312e81',
  tagText: '#a5b4fc'
};
