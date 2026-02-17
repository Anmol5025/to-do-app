import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useResponsive } from '../hooks/useResponsive';

export default function TaskForm({ task, onSave, onCancel }) {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    tags: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate || '',
        tags: task.tags ? task.tags.join(', ') : ''
      });
    }
  }, [task]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const taskData = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag)
    };

    onSave(taskData);
  };

  return (
    <div style={styles.overlay}>
      <div style={{ 
        ...styles.modal, 
        backgroundColor: colors.surface,
        width: isMobile ? '95%' : '90%',
        padding: isMobile ? '1.5rem' : '2rem'
      }}>
        <h2 style={{ ...styles.title, color: colors.text }}>{task ? 'Edit Task' : 'Create Task'}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={{ ...styles.label, color: colors.text }}>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ 
                ...styles.input, 
                borderColor: colors.border,
                backgroundColor: colors.surface,
                color: colors.text
              }}
              placeholder="Enter task title"
            />
            {errors.title && <span style={styles.error}>{errors.title}</span>}
          </div>

          <div style={styles.field}>
            <label style={{ ...styles.label, color: colors.text }}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ 
                ...styles.input, 
                minHeight: '80px',
                borderColor: colors.border,
                backgroundColor: colors.surface,
                color: colors.text
              }}
              placeholder="Enter task description"
            />
          </div>

          <div style={styles.field}>
            <label style={{ ...styles.label, color: colors.text }}>Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              style={{ 
                ...styles.input,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                color: colors.text
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={{ ...styles.label, color: colors.text }}>Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              style={{ 
                ...styles.input,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                color: colors.text
              }}
            />
          </div>

          <div style={styles.field}>
            <label style={{ ...styles.label, color: colors.text }}>Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              style={{ 
                ...styles.input,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                color: colors.text
              }}
              placeholder="e.g., frontend, urgent"
            />
          </div>

          <div style={styles.actions}>
            <button type="button" onClick={onCancel} style={{ ...styles.cancelBtn, backgroundColor: colors.border, color: colors.text }}>
              Cancel
            </button>
            <button type="submit" style={{ ...styles.saveBtn, backgroundColor: colors.success }}>
              {task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
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
    maxWidth: '500px',
    maxHeight: '85vh',
    overflow: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    animation: 'slideUp 0.3s ease-out'
  },
  title: {
    marginTop: 0,
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    fontWeight: '600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem'
  },
  label: {
    fontWeight: '600',
    fontSize: '1rem'
  },
  input: {
    padding: '0.75rem',
    border: '2px solid',
    borderRadius: '8px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s'
  },
  error: {
    color: '#e74c3c',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  cancelBtn: {
    flex: 1,
    padding: '0.85rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s'
  },
  saveBtn: {
    flex: 1,
    padding: '0.85rem',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(39, 174, 96, 0.4)'
  }
};
