import { storage } from './storage';

describe('Storage Utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should save and retrieve user', () => {
    const user = { email: 'test@example.com' };
    storage.setUser(user, true);
    
    const retrieved = storage.getUser();
    expect(retrieved).toEqual(user);
    expect(storage.shouldRememberUser()).toBe(true);
  });

  test('should save and retrieve tasks', () => {
    const tasks = [
      { id: '1', title: 'Test Task', status: 'todo' }
    ];
    storage.saveTasks(tasks);
    
    const retrieved = storage.getTasks();
    expect(retrieved).toEqual(tasks);
  });

  test('should handle empty storage gracefully', () => {
    expect(storage.getTasks()).toEqual([]);
    expect(storage.getUser()).toBeNull();
    expect(storage.getActivityLog()).toEqual([]);
  });
});
