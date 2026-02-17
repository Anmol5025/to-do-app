import { storage } from './storage';

describe('Storage Utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('User Management', () => {
    test('should save and retrieve user', () => {
      const user = { email: 'test@example.com' };
      storage.setUser(user, true);
      
      const retrieved = storage.getUser();
      expect(retrieved).toEqual(user);
      expect(storage.shouldRememberUser()).toBe(true);
    });

    test('should clear user data', () => {
      const user = { email: 'test@example.com' };
      storage.setUser(user, true);
      
      storage.clearUser();
      
      expect(storage.getUser()).toBeNull();
      expect(storage.shouldRememberUser()).toBe(false);
    });

    test('should handle remember me preference', () => {
      const user = { email: 'test@example.com' };
      storage.setUser(user, false);
      
      expect(storage.shouldRememberUser()).toBe(false);
    });
  });

  describe('Task Management', () => {
    test('should save and retrieve tasks', () => {
      const tasks = [
        { id: '1', title: 'Test Task', status: 'todo' },
        { id: '2', title: 'Another Task', status: 'doing' }
      ];
      storage.saveTasks(tasks);
      
      const retrieved = storage.getTasks();
      expect(retrieved).toEqual(tasks);
    });

    test('should return empty array when no tasks exist', () => {
      expect(storage.getTasks()).toEqual([]);
    });

    test('should handle invalid JSON gracefully', () => {
      localStorage.setItem('tasks', 'invalid json');
      expect(storage.getTasks()).toEqual([]);
    });
  });

  describe('Activity Log', () => {
    test('should save and retrieve activity log', () => {
      const activities = [
        { action: 'Created', details: 'Task created', timestamp: new Date().toISOString() }
      ];
      storage.saveActivityLog(activities);
      
      const retrieved = storage.getActivityLog();
      expect(retrieved).toEqual(activities);
    });

    test('should return empty array when no activities exist', () => {
      expect(storage.getActivityLog()).toEqual([]);
    });
  });

  describe('Board Reset', () => {
    test('should clear all board data', () => {
      const tasks = [{ id: '1', title: 'Test Task', status: 'todo' }];
      const activities = [{ action: 'Created', details: 'Task created' }];
      
      storage.saveTasks(tasks);
      storage.saveActivityLog(activities);
      
      storage.resetBoard();
      
      expect(storage.getTasks()).toEqual([]);
      expect(storage.getActivityLog()).toEqual([]);
    });
  });

  test('should handle empty storage gracefully', () => {
    expect(storage.getTasks()).toEqual([]);
    expect(storage.getUser()).toBeNull();
    expect(storage.getActivityLog()).toEqual([]);
  });
});
