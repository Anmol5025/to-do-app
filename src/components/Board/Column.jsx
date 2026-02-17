import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Task from './Task';

export default function Column({ title, tasks, onDrop, onEdit, onDelete }) {
  const { colors } = useTheme();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    onDrop(taskId, title.toLowerCase());
  };

  return (
    <div style={{ ...styles.column, backgroundColor: colors.surface, boxShadow: `0 2px 8px ${colors.shadow}` }}>
      <div style={{ ...styles.header, borderBottomColor: colors.border }}>
        <h3 style={{ ...styles.title, color: colors.text }}>{title}</h3>
        <span style={{ ...styles.count, backgroundColor: colors.primary }}>{tasks.length}</span>
      </div>
      <div
        style={styles.taskList}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  column: {
    borderRadius: '12px',
    padding: '1rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    minWidth: '280px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '0.75rem',
    borderBottom: '3px solid',
    flexShrink: 0
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: '700'
  },
  count: {
    color: 'white',
    padding: '0.35rem 0.65rem',
    borderRadius: '20px',
    fontSize: '0.95rem',
    fontWeight: '600'
  },
  taskList: {
    flex: 1,
    overflow: 'auto'
  }
};
