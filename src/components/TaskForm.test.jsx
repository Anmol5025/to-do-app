import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import TaskForm from './TaskForm';

const MockTaskForm = (props) => (
  <ThemeProvider>
    <TaskForm {...props} />
  </ThemeProvider>
);

describe('TaskForm Component', () => {
  test('renders create form', () => {
    const mockSave = jest.fn();
    const mockCancel = jest.fn();
    
    render(<MockTaskForm onSave={mockSave} onCancel={mockCancel} />);
    
    expect(screen.getByText('Create Task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter task title')).toBeInTheDocument();
  });

  test('shows validation error for empty title', () => {
    const mockSave = jest.fn();
    const mockCancel = jest.fn();
    
    render(<MockTaskForm onSave={mockSave} onCancel={mockCancel} />);
    
    const createButton = screen.getByText('Create');
    fireEvent.click(createButton);
    
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(mockSave).not.toHaveBeenCalled();
  });

  test('calls onSave with form data when valid', () => {
    const mockSave = jest.fn();
    const mockCancel = jest.fn();
    
    render(<MockTaskForm onSave={mockSave} onCancel={mockCancel} />);
    
    const titleInput = screen.getByPlaceholderText('Enter task title');
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    
    const createButton = screen.getByText('Create');
    fireEvent.click(createButton);
    
    expect(mockSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test Task'
      })
    );
  });

  test('renders edit form with existing task data', () => {
    const mockSave = jest.fn();
    const mockCancel = jest.fn();
    const existingTask = {
      title: 'Existing Task',
      description: 'Task description',
      priority: 'high'
    };
    
    render(<MockTaskForm task={existingTask} onSave={mockSave} onCancel={mockCancel} />);
    
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Task description')).toBeInTheDocument();
  });

  test('calls onCancel when cancel button is clicked', () => {
    const mockSave = jest.fn();
    const mockCancel = jest.fn();
    
    render(<MockTaskForm onSave={mockSave} onCancel={mockCancel} />);
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(mockCancel).toHaveBeenCalled();
  });
});
