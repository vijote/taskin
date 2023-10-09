// Imports
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

// To Test
import Button from './Button';

// Tests
describe('Button', async () => {
    const mockedClick = vi.fn()

    afterEach(() => {
        cleanup()
    })

    it('Renders correctly', () => {
        render(<Button label='test' loading={false} type='button' />);
        const button = screen.queryByTestId("button");

        expect(button).toBeTruthy();
    });

    it('Shows processing label and disables itself if loading', async () => {
        render(<Button loading label='test' type='button' />);
        const button = screen.queryByTestId("button") as HTMLButtonElement;

        expect(button.disabled).toBe(true);
        expect(button.innerHTML).toBe("Procesando...");
    });

    it('Runs onClick callback when clicked', async () => {
        render(<Button label='test' type='button' onClick={mockedClick} />);
        const button = screen.queryByTestId("button") as HTMLButtonElement;

        fireEvent.click(button)

        expect(mockedClick).toHaveBeenCalled();
    });
});