// Testing utilities
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

// Component
import TaskEdit from './TaskEdit';

describe('TaskEdit', async () => {
    const mockedSubmit = vi.fn()

    afterEach(() => {
        cleanup()
        vi.resetAllMocks()
    })

    it('Renders correctly', () => {
        render(<TaskEdit state='test' content='test' submitting={false} onSubmit={mockedSubmit} title='test' />);
        const taskEdit = screen.queryByTestId("task-edit");

        expect(taskEdit).toBeTruthy();
    });

    it('Displays an error box if theres an error', () => {
        render(<TaskEdit state='test' error='test' content='test' submitting={false} onSubmit={mockedSubmit} title='test' />);
        const errorMessage = screen.queryByTestId("errorMessage");

        expect(errorMessage).toBeTruthy();
    });

    it('Calls onSubmit when form is submitted', () => {
        render(<TaskEdit state='test' error='test' content='test' submitting={false} onSubmit={mockedSubmit} title='test' />);
        const submitButton = screen.queryByTestId("button") as HTMLButtonElement;

        fireEvent.click(submitButton)

        expect(mockedSubmit).toHaveBeenCalled();
    });
});