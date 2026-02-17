import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useResponsive } from '../hooks/useResponsive';

export default function ActivityLog({ activities, onClose }) {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();

  return (
    <div style={styles.overlay}>
      <div style={{ 
        ...styles.modal, 
        backgroundColor: colors.surface,
        width: isMobile ? '95%' : '90%'
      }}>
        <div style={{ ...styles.header, borderBottomColor: colors.border }}>
          <h2 style={{ ...styles.title, color: colors.text }}>Activity Log</h2>
          <button 
            onClick={onClose} 
            style={{ ...styles.closeBtn, color: colors.textSecondary }}
            title="Close"
          >
            ✕
          </button>
        </div>
        <div style={styles.list}>
          {activities.length === 0 ? (
            <p style={{ ...styles.empty, color: colors.textSecondary }}>No activities yet</p>
          ) : (
            activities.map((activity, index) => (
              <div key={index} style={{ ...styles.item, backgroundColor: colors.surfaceAlt, borderBottomColor: colors.border }}>
                <div style={styles.itemHeader}>
                  <span style={{ ...styles.action, color: colors.primary }}>
                    <span style={styles.actionIcon}>•</span> {activity.action}
                  </span>
                  <span style={{ ...styles.time, color: colors.textTertiary }}>
                    {new Date(activity.timestamp).toLocaleString()}
                  </span>
                </div>
                <p style={{ ...styles.details, color: colors.textSecondary }}>{activity.details}</p>
              </div>
            ))
          )}
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
    zIndex: 1000,
    animation: 'fadeIn 0.2s ease-in'
  },
  modal: {
    borderRadius: '16px',
    maxWidth: '600px',
    maxHeight: '75vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    animation: 'slideUp 0.3s ease-out'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    borderBottom: '2px solid',
    flexShrink: 0
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: '600'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    transition: 'color 0.2s',
    lineHeight: 1,
    padding: '0.25rem'
  },
  list: {
    padding: '1.5rem',
    overflow: 'auto',
    flex: 1
  },
  empty: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.05rem'
  },
  item: {
    padding: '1rem',
    borderBottom: '1px solid',
    marginBottom: '0.5rem',
    borderRadius: '8px'
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  action: {
    fontWeight: '600',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem'
  },
  actionIcon: {
    fontSize: '1.2rem',
    lineHeight: 1
  },
  time: {
    fontSize: '0.85rem',
    fontWeight: '500'
  },
  details: {
    margin: 0,
    fontSize: '0.95rem',
    lineHeight: '1.4'
  }
};
