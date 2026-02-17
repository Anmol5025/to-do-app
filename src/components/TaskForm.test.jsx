import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  test('renders create form', () => {
    const mockSave = jest.fn();
    const mockCancel = jest.fn();
    
    render(<TaskForm onSave={mockSave} onCancel={mockCancel} />);
    
    expect(screen.getByText('Create Task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter task title')).toBeInTheDocument();
  });

  test('shows validation error for empty title', () => {
    const mockSave = jest.fn();
    const mockCancel = jest.fn();
    
    render(<TaskForm onSave={mockSave} onCancel={mockCancel} />);
    
    const createButton = screen.getByText('Create');
    fireEvent.click(createButton);
    
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(mockSave).not.toHaveBeenCalled();
  });

  test('calls onSave with form data when valid', () => {
    const mockSave = jest.fn();
    const mockCancel = jest.fn();
    
    render(<TaskForm onSave={mockSave} onCancel={mockCancel} />);
    
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
});
