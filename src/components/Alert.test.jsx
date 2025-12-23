import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Alert from './Alert';

describe('Alert Component', () => {
    it('renders nothing when no message is provided', () => {
        const { container } = render(<Alert message="" onClose={() => { }} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders message when provided', () => {
        const message = "Test Alert Message";
        render(<Alert type="danger" message={message} onClose={() => { }} />);
        expect(screen.getByText(message)).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveClass('alert-danger');
    });

    it('calls onClose when close button is clicked', () => {
        const handleClose = vi.fn();
        render(<Alert type="success" message="Success" onClose={handleClose} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});
