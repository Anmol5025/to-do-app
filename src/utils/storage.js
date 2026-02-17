const STORAGE_KEYS = {
  USER: 'taskboard_user',
  REMEMBER_ME: 'taskboard_remember',
  TASKS: 'taskboard_tasks',
  ACTIVITY_LOG: 'taskboard_activity'
};

export const storage = {
  getUser: () => {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  setUser: (user, rememberMe = false) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, rememberMe.toString());
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  },

  clearUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
  },

  shouldRememberUser: () => {
    return localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
  },

  getTasks: () => {
    try {
      const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      return tasks ? JSON.parse(tasks) : [];
    } catch {
      return [];
    }
  },

  saveTasks: (tasks) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  },

  getActivityLog: () => {
    try {
      const log = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOG);
      return log ? JSON.parse(log) : [];
    } catch {
      return [];
    }
  },

  saveActivityLog: (log) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOG, JSON.stringify(log));
    } catch (error) {
      console.error('Failed to save activity log:', error);
    }
  },

  resetBoard: () => {
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITY_LOG);
  }
};
