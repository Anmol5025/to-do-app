import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        ...styles.button,
        backgroundColor: colors.surface,
        color: colors.text,
        border: `2px solid ${colors.border}`
      }}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <span style={styles.iconText}>
          <span style={styles.icon}>☀</span>
          <span>Light</span>
        </span>
      ) : (
        <span style={styles.iconText}>
          <span style={styles.icon}>◐</span>
          <span>Dark</span>
        </span>
      )}
    </button>
  );
}

const styles = {
  button: {
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  iconText: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem'
  },
  icon: {
    fontSize: '1.1rem',
    display: 'inline-block'
  }
};
