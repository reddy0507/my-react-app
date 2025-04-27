import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../components/LoginForm'; // Adjust the import path as needed
import { vi } from 'vitest';
import { Formik } from 'formik';

// Test 1: Render form fields
describe('LoginForm', () => {
  test('renders email and password fields with labels', () => {
    render(<LoginForm />);
    
    // Check if email and password fields are presents
    expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
    
    // Check if error messages are not visible initially
    expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument();
  });

   // Test 2: Validation - Email and password required
  test('shows validation error when email or password is empty', async () => {
    render(<LoginForm />);
    
    // Submit form without filling fields
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    // Wait for validation errors
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  }); 
  
  // Test: Valid email and password submission
test('submits form with valid email and password', async () => {
    render(<LoginForm />);
    
    // Input valid email and password
    fireEvent.change(screen.getByPlaceholderText(/enter email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), { target: { value: 'password123' } });
    
    // Mock the alert to test form submission
    window.alert = vi.fn();  // Using vi.fn() to mock alert

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    // Wait for alert to be called with expected message
    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Login Successful!\nEmail: test@example.com');
    });
});

  
    
});
