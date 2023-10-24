// Testing utilities
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

// Component
import Pill from './Pill';

describe('Pill', async () => {
    afterEach(() => {
        cleanup()
    })

    it('Renders correctly', () => {
        render(<Pill state='test' />);
        const pill = screen.queryByTestId("pill");

        expect(pill).toBeTruthy();
    });

    it('Displays message', () => {
        const state = "TO_DO"
        const expectedMessage = "Por hacer"
        render(<Pill state={state} />);
        const pill = screen.queryByTestId("pill");

        expect(pill?.innerHTML).toBe(expectedMessage);
    });
});