// Testing utilities
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

// Component
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', async () => {
    afterEach(() => {
        cleanup()
    })

    it('Renders correctly', () => {
        render(<ErrorMessage message='it works' />);
        const errorMessage = screen.queryByTestId("errorMessage");

        expect(errorMessage).toBeTruthy();
    });

    it('Displays message', () => {
        const message = 'it works'
        render(<ErrorMessage message={message} />);
        const errorMessage = screen.queryByTestId("errorMessage");
        const messageParagraph = errorMessage?.querySelector(".message");

        expect(messageParagraph?.innerHTML).toBe(message);
    });
});