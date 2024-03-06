import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import Users from '../components/Users';
import * as userService from '../services/userServices';
import { act } from 'react-dom/test-utils';

// Mock the userServices module
vi.mock('../services/userServices', () => ({
  getAllUsers: vi.fn(),
  deleteUser: vi.fn().mockResolvedValue(undefined), 
  inviteUser: vi.fn().mockResolvedValue(undefined),
  changeRole: vi.fn(),
}));

// test fetching and displaying users
describe('Users Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches and displays users on component mount', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' }];
    userService.getAllUsers.mockResolvedValue(mockUsers);

    const { findByText } = render(<Users />);
    expect(userService.getAllUsers).toHaveBeenCalled();

    const userNameDisplay = await findByText('John Doe');
    expect(userNameDisplay).toBeInTheDocument();
  });
});

// test delete button functionality
describe('Users Component - Delete Button Functionality', () => {
    beforeEach(() => {
      vi.resetAllMocks();
      userService.getAllUsers.mockResolvedValue([
        { id: 1, name: 'Jane Doe', email: 'jane@example.com', role: 'admin' },
      ]);
    });
  
    it('renders delete button for each user and triggers deletion on click', async () => {
      window.confirm = vi.fn().mockReturnValue(true);
      const { findByTestId } = render(<Users />);
  
      // Wait for the delete button to be available in the DOM
      const deleteButton = await findByTestId('delete-1');
  
      // Assert the delete button is rendered
      expect(deleteButton).toBeInTheDocument();
  
      // Simulate clicking the delete button
      act (() => {fireEvent.click(deleteButton)});
  
      // Wait for the deleteUser function to be called
      await vi.waitFor(() => {
        expect(userService.deleteUser).toHaveBeenCalledWith(1);
      });
    });
  });

// test invite functionality
describe('Users Component - Invite Functionality', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    userService.getAllUsers.mockResolvedValue([]);
  });

  it('allows user to input email and submit invitation', async () => {
    render(<Users />);
    
    // Click the "Invite people" button
    act(() => {fireEvent.click(screen.getByText('Invite people'))});

    // Input a valid email address
    const emailInput = screen.getByTestId('invite-input');
    act (() => {fireEvent.change(emailInput, { target: { value: 'test@example.com' } })});

    // Submit the form
    act (() => {fireEvent.click(screen.getByTestId('invite-submit'))});

    // Verify inviteUser was called with the correct email
    await vi.waitFor(() => {
      expect(userService.inviteUser).toHaveBeenCalledWith({ email: 'test@example.com'});
    });

    // Optionally, check for UI feedback after successful invite
    expect(screen.getByText('Invitation sent!')).toBeInTheDocument();
  });


//   it('displays an error message for invalid email input', async () => {
//     render(<Users />);
    
//     // Trigger the display of the invite input, if necessary
//     fireEvent.click(screen.getByText('Invite people'));
  
//     // Input an invalid email address
//     const emailInput = screen.getByTestId('invite-input');
//     fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
  
//     // Attempt to submit the form with the invalid email
//     fireEvent.click(screen.getByTestId('invite-submit'));
  
//     // Check for the presence of the error message
//     expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
//   });


// it('handles service errors gracefully when inviting a user fails', async () => {
//     // Mock the inviteUser service to reject with an error
//     userService.inviteUser.mockRejectedValue(new Error('Failed to invite user'));
  
//     render(<Users />);
    
//     // Trigger the display of the invite input, if necessary
//     fireEvent.click(screen.getByText('Invite people'));
  
//     // Input a valid email address
//     const emailInput = screen.getByTestId('invite-input');
//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  
//     // Submit the form
//     fireEvent.click(screen.getByTestId('invite-submit'));
  
//     // Verify that the component handles the error without crashing
//     // For example, by checking for a generic error message or by ensuring the invite form is still present
//     expect(await screen.findByText('Failed to invite user')).toBeInTheDocument();
  
//     // Or, if your component handles errors differently, adjust the expectation accordingly
//     // For example, you might check that the invite input is still visible and can be retried
//     expect(screen.getByTestId('invite-input')).toBeInTheDocument();
//   });
  
});