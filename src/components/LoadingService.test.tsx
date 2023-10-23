// Testing utilities
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

// Component
import LoadingService from './LoadingService';

describe('LoadingService', async () => {
    afterEach(() => {
        cleanup()
    })

    it('Renders correctly', () => {
        render(<LoadingService message='render' />);
        const loadingService = screen.queryByTestId("loading-service");

        expect(loadingService).toBeTruthy();
    });

    it('Displays message', () => {
        const message = "it-works"
        render(<LoadingService message={message} />);
        const loadingService = screen.queryByTestId("loading-service");
        const h2 = loadingService?.querySelector("h2")

        expect(h2?.innerHTML).toBe(message);
    });
});