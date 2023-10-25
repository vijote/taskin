// Testing utilities
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

// Component
import TaskSearch from './TaskSearch';

describe('TaskSearch', async () => {
    const mockedOnSearch = vi.fn()

    afterEach(() => {
        cleanup()
        vi.resetAllMocks()
    })

    it('Displays defaultValue on search input if exists', () => {
        render(<TaskSearch defaultValue='test'/>);
        const inputContainer = screen.queryByTestId("input") as HTMLInputElement;
        const input = inputContainer.querySelector("input") as HTMLInputElement;

        expect(input.value).toBe("test");
    });

    it('Calls onSearch when search form submits', () => {
        render(<TaskSearch onSearch={mockedOnSearch}/>);
        const form = screen.queryByTestId("task-search") as HTMLFormElement;
        fireEvent.submit(form)

        expect(mockedOnSearch).toHaveBeenCalled();
    });
});