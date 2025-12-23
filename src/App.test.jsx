import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the API service to prevent actual network calls during tests
vi.mock('./services/api', () => ({
    default: {
        getPosts: vi.fn().mockResolvedValue({ success: true, data: [] }),
        // Add other methods as needed
    },
}));

// Mock the global fetch for AuthContext
global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: false, // Simulate unauthenticated state by default
        json: () => Promise.resolve({}),
    })
);

describe.skip('App Component', () => {
    it('renders the application shell and handles authentication state', async () => {
        render(<App />);

        // Wait for the auth check to complete and content to appear
        await waitFor(() => {
            // Check for brand name
            expect(screen.getByText(/WordVibe/i)).toBeInTheDocument();
            // Check for login link (authenticated state is false by default in mock)
            const loginLinks = screen.getAllByText(/Login/i);
            expect(loginLinks.length).toBeGreaterThan(0);
        });
    });
});
