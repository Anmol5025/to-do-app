import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function Task({ task, onEdit, onDelete }) {
  const { colors } = useTheme();

  const priorityColors = {
    high: colors.high,
    medium: colors.medium,
    low: colors.low
  };

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData('taskId', task.id)}
      style={{
        ...styles.task,
        backgroundColor: colors.surfaceAlt,
        borderLeft: `4px solid ${priorityColors[task.priority] || colors.low}`,
        borderColor: colors.border,
        boxShadow: `0 2px 6px ${colors.shadow}`
      }}
    >
      <div style={styles.header}>
        <h4 style={{ ...styles.title, color: colors.text }}>{task.title}</h4>
        <div style={styles.actions}>
          <button 
            onClick={() => onEdit(task)} 
            style={styles.editBtn}
            title="Edit task"
          >
            ✎
          </button>
          <button 
            onClick={() => onDelete(task.id)} 
            style={styles.deleteBtn}
            title="Delete task"
          >
            ✕
          </button>
        </div>
      </div>
      
      {task.description && <p style={{ ...styles.description, color: colors.textSecondary }}>{task.description}</p>}
      
      <div style={styles.meta}>
        {task.priority && (
          <span style={{ ...styles.badge, backgroundColor: priorityColors[task.priority] }}>
            {task.priority}
          </span>
        )}
        {task.tags && task.tags.length > 0 && (
          <div style={styles.tags}>
            {task.tags.map((tag, i) => (
              <span key={i} style={{ ...styles.tag, backgroundColor: colors.tag, color: colors.tagText }}>{tag}</span>
            ))}
          </div>
        )}
      </div>
      
      {task.dueDate && (
        <div style={{ ...styles.dueDate, color: colors.textTertiary }}>
          <span style={styles.dateIcon}>📅</span> {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}

const styles = {
  task: {
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '0.75rem',
    cursor: 'move',
    transition: 'all 0.2s',
    border: '1px solid'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem'
  },
  title: {
    margin: 0,
    fontSize: '1.05rem',
    fontWeight: '600',
    lineHeight: '1.4'
  },
  actions: {
    display: 'flex',
    gap: '0.25rem'
  },
  editBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    padding: '0.25rem 0.4rem',
    transition: 'transform 0.2s',
    opacity: 0.7,
    lineHeight: 1
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.3rem',
    padding: '0.25rem 0.4rem',
    transition: 'transform 0.2s',
    opacity: 0.7,
    lineHeight: 1
  },
  description: {
    margin: '0.5rem 0',
    fontSize: '0.95rem',
    lineHeight: '1.4'
  },
  meta: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '0.5rem'
  },
  badge: {
    padding: '0.3rem 0.6rem',
    borderRadius: '14px',
    fontSize: '0.85rem',
    color: 'white',
    fontWeight: '600'
  },
  tags: {
    display: 'flex',
    gap: '0.4rem',
    flexWrap: 'wrap'
  },
  tag: {
    padding: '0.3rem 0.6rem',
    borderRadius: '14px',
    fontSize: '0.85rem',
    fontWeight: '500'
  },
  dueDate: {
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem'
  },
  dateIcon: {
    fontSize: '0.95rem'
  }
};
