import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useResponsive } from '../hooks/useResponsive';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();

  return (
    <div style={styles.overlay}>
      <div style={{ 
        ...styles.dialog, 
        backgroundColor: colors.surface,
        width: isMobile ? '95%' : '90%',
        padding: isMobile ? '2rem' : '2.5rem'
      }}>
        <div style={{ ...styles.icon, color: colors.warning }}>⚠</div>
        <h3 style={{ ...styles.title, color: colors.text }}>Confirm Action</h3>
        <p style={{ ...styles.message, color: colors.textSecondary }}>{message}</p>
        <div style={styles.actions}>
          <button onClick={onCancel} style={{ ...styles.cancelBtn, backgroundColor: colors.border, color: colors.text }}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{ ...styles.confirmBtn, backgroundColor: colors.danger }}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    animation: 'fadeIn 0.2s ease-in'
  },
  dialog: {
    borderRadius: '16px',
    maxWidth: '450px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    textAlign: 'center',
    animation: 'slideUp 0.3s ease-out'
  },
  icon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    fontWeight: 'bold'
  },
  title: {
    margin: '0 0 1rem 0',
    fontSize: '1.5rem',
    fontWeight: '600'
  },
  message: {
    margin: '0 0 2rem 0',
    fontSize: '1.1rem',
    lineHeight: '1.6'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center'
  },
  cancelBtn: {
    padding: '0.875rem 2rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.05rem',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  confirmBtn: {
    padding: '0.875rem 2rem',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.05rem',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s'
  }
};
