import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

const MockLogin = () => (
  <BrowserRouter>
    <Login />
  </BrowserRouter>
);

describe('Login Component', () => {
  test('renders login form', () => {
    render(<MockLogin />);
    expect(screen.getByText('Task Board Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('intern@demo.com')).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', () => {
    render(<MockLogin />);
    const loginButton = screen.getByText('Login');
    
    fireEvent.click(loginButton);
    
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('shows error for invalid credentials', () => {
    render(<MockLogin />);
    
    const emailInput = screen.getByPlaceholderText('intern@demo.com');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const loginButton = screen.getByText('Login');
    
    fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(loginButton);
    
    expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
  });
});
