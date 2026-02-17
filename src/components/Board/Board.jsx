import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import Column from './Column';
import TaskForm from '../TaskForm';
import ActivityLog from '../ActivityLog';
import ConfirmDialog from '../ConfirmDialog';
import ThemeToggle from '../ThemeToggle';
import { storage } from '../../utils/storage';

const COLUMNS = ['todo', 'doing', 'done'];

export default function Board() {
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showLog, setShowLog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortByDueDate, setSortByDueDate] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    setTasks(storage.getTasks());
    setActivities(storage.getActivityLog());
  }, []);

  const addActivity = (action, details) => {
    const newActivity = {
      action,
      details,
      timestamp: new Date().toISOString()
    };
    const updatedActivities = [newActivity, ...activities];
    setActivities(updatedActivities);
    storage.saveActivityLog(updatedActivities);
  };

  const handleCreateTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      status: 'todo',
      createdAt: new Date().toISOString()
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
    addActivity('Created', `Task "${newTask.title}" created`);
    setShowForm(false);
  };

  const handleEditTask = (taskData) => {
    const updatedTasks = tasks.map(t =>
      t.id === editingTask.id ? { ...t, ...taskData } : t
    );
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
    addActivity('Edited', `Task "${taskData.title}" updated`);
    setEditingTask(null);
    setShowForm(false);
  };

  const handleDeleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setConfirmDialog({
      message: `Are you sure you want to delete "${task.title}"?`,
      onConfirm: () => {
        const updatedTasks = tasks.filter(t => t.id !== taskId);
        setTasks(updatedTasks);
        storage.saveTasks(updatedTasks);
        addActivity('Deleted', `Task "${task.title}" deleted`);
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleDrop = (taskId, newStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (task.status === newStatus) return;

    const updatedTasks = tasks.map(t =>
      t.id === taskId ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
    addActivity('Moved', `Task "${task.title}" moved to ${newStatus}`);
  };

  const handleResetBoard = () => {
    setConfirmDialog({
      message: 'Reset board? This will permanently delete all tasks and activities.',
      onConfirm: () => {
        storage.resetBoard();
        setTasks([]);
        setActivities([]);
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleLogout = () => {
    if (!storage.shouldRememberUser()) {
      storage.clearUser();
    }
    navigate('/login');
  };

  const getFilteredAndSortedTasks = (status) => {
    let filtered = tasks.filter(t => t.status === status);

    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(t => t.priority === filterPriority);
    }

    if (sortByDueDate) {
      filtered = filtered.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    }

    return filtered;
  };

  return (
    <div style={{ ...styles.container, backgroundColor: colors.background }}>
      <header style={{ 
        ...styles.header, 
        backgroundColor: colors.surface,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '1rem' : '0'
      }}>
        <h1 style={{ ...styles.title, color: colors.text }}>Task Board</h1>
        <div style={{ 
          ...styles.headerActions,
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          justifyContent: isMobile ? 'center' : 'flex-end'
        }}>
          <ThemeToggle />
          <button onClick={() => setShowLog(true)} style={{ ...styles.logBtn, backgroundColor: colors.info, color: colors.surface }}>
            <span style={styles.buttonContent}>
              <span style={styles.buttonIcon}>📋</span>
              <span>Activity Log</span>
            </span>
          </button>
          <button onClick={handleResetBoard} style={{ ...styles.resetBtn, backgroundColor: colors.danger, color: colors.surface }}>
            <span style={styles.buttonContent}>
              <span style={styles.buttonIcon}>↻</span>
              <span>Reset</span>
            </span>
          </button>
          <button onClick={handleLogout} style={{ ...styles.logoutBtn, backgroundColor: colors.info, color: colors.surface }}>
            <span style={styles.buttonContent}>
              <span style={styles.buttonIcon}>→</span>
              <span>Logout</span>
            </span>
          </button>
        </div>
      </header>

      <div style={{ 
        ...styles.controls, 
        backgroundColor: colors.surface,
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center'
      }}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            ...styles.search, 
            borderColor: colors.border,
            backgroundColor: colors.surface,
            color: colors.text
          }}
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          style={{ 
            ...styles.filter, 
            borderColor: colors.border,
            backgroundColor: colors.surface,
            color: colors.text
          }}
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <label style={{ ...styles.sortLabel, color: colors.text }}>
          <input
            type="checkbox"
            checked={sortByDueDate}
            onChange={(e) => setSortByDueDate(e.target.checked)}
          />
          Sort by Due Date
        </label>
        <button onClick={() => setShowForm(true)} style={{ ...styles.createBtn, backgroundColor: colors.success }}>
          + New Task
        </button>
      </div>

      <div style={{ 
        ...styles.board,
        flexDirection: isMobile || isTablet ? 'column' : 'row',
        overflowY: isMobile || isTablet ? 'auto' : 'hidden'
      }}>
        {COLUMNS.map(column => (
          <Column
            key={column}
            title={column.charAt(0).toUpperCase() + column.slice(1)}
            tasks={getFilteredAndSortedTasks(column)}
            onDrop={handleDrop}
            onEdit={(task) => {
              setEditingTask(task);
              setShowForm(true);
            }}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={editingTask ? handleEditTask : handleCreateTask}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

      {showLog && (
        <ActivityLog
          activities={activities}
          onClose={() => setShowLog(false)}
        />
      )}

      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    flexShrink: 0
  },
  title: {
    margin: 0,
    fontSize: '1.75rem',
    fontWeight: '700'
  },
  headerActions: {
    display: 'flex',
    gap: '0.75rem'
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem'
  },
  buttonIcon: {
    fontSize: '1.1rem',
    display: 'inline-block'
  },
  logBtn: {
    padding: '0.6rem 1rem',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  resetBtn: {
    padding: '0.6rem 1rem',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  logoutBtn: {
    padding: '0.6rem 1rem',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  controls: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    flexWrap: 'wrap',
    flexShrink: 0
  },
  search: {
    flex: 1,
    minWidth: '200px',
    padding: '0.7rem 1rem',
    border: '2px solid',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.2s'
  },
  filter: {
    padding: '0.7rem 1rem',
    border: '2px solid',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'border-color 0.2s'
  },
  sortLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer'
  },
  createBtn: {
    padding: '0.7rem 1.25rem',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)'
  },
  board: {
    display: 'flex',
    gap: '1rem',
    flex: 1,
    overflow: 'hidden'
  }
};
