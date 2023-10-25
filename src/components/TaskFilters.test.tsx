// Testing utilities
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

// Component
import TaskFilters from './TaskFilters';

describe('TaskFilters', async () => {
    const mockedSetParams = vi.fn()
    const mockedFiltersChange = vi.fn()

    afterEach(() => {
        cleanup()
        vi.resetAllMocks()
    })

    it('Renders correctly', () => {
        render(<TaskFilters searchParams={new URLSearchParams()} setSearchParams={mockedSetParams}/>);
        const taskEdit = screen.queryByTestId("task-filters");

        expect(taskEdit).toBeTruthy();
    });

    it('Calls setSearchParams when TaskSearch submits', () => {
        render(<TaskFilters searchParams={new URLSearchParams()} setSearchParams={mockedSetParams}/>);
        const taskSearch = screen.queryByTestId("task-search") as HTMLFormElement;

        fireEvent.submit(taskSearch)

        expect(mockedSetParams).toHaveBeenCalled();
    });

    it('Calls onFiltersChange if exists when TaskSearch submits', () => {
        render(<TaskFilters searchParams={new URLSearchParams()} onFiltersChange={mockedFiltersChange} setSearchParams={mockedSetParams}/>);
        const taskSearch = screen.queryByTestId("task-search") as HTMLFormElement;

        fireEvent.submit(taskSearch)

        expect(mockedFiltersChange).toHaveBeenCalled();
    });

    it('Calls onFiltersChange if exists when PillDropdown changes its value', () => {
        render(<TaskFilters searchParams={new URLSearchParams()} onFiltersChange={mockedFiltersChange} setSearchParams={mockedSetParams}/>);

        const dropdownHandle = screen.queryByTestId("dropdown-handle") as HTMLDivElement;
        const optionContainer = screen.queryByTestId("pill-dropdown-options");
        const option = optionContainer?.children[0] as HTMLDivElement

        fireEvent.click(dropdownHandle)
        fireEvent.click(option)

        expect(mockedFiltersChange).toHaveBeenCalled();
    });

    it('Adds state filter when PillDropdown has a new value', () => {
        render(<TaskFilters searchParams={new URLSearchParams()} onFiltersChange={mockedFiltersChange} setSearchParams={mockedSetParams}/>);
        
        const dropdownHandle = screen.queryByTestId("dropdown-handle") as HTMLDivElement;
        const optionContainer = screen.queryByTestId("pill-dropdown-options");
        const option = optionContainer?.children[0] as HTMLDivElement
        
        // First option is selected
        fireEvent.click(dropdownHandle)
        fireEvent.click(option)
                
        const receivedParams = mockedFiltersChange.mock.calls[0][0] as URLSearchParams

        expect(receivedParams.has("filter-state")).toBeTruthy();
    });

    it('Removes state filter when PillDropdowns value is removed', () => {
        render(<TaskFilters searchParams={new URLSearchParams()} onFiltersChange={mockedFiltersChange} setSearchParams={mockedSetParams}/>);
        
        const dropdownHandle = screen.queryByTestId("dropdown-handle") as HTMLDivElement;
        const optionContainer = screen.queryByTestId("pill-dropdown-options");
        const option = optionContainer?.children[0] as HTMLDivElement
        
        // First option is selected
        fireEvent.click(dropdownHandle)
        fireEvent.click(option)
        
        // selection is removed
        const optionRemove = screen.queryByTestId("pill-option-remove") as HTMLElement;
        fireEvent.click(optionRemove)
        
        const receivedParams = mockedFiltersChange.mock.calls[1][0] as URLSearchParams

        expect(receivedParams.has("filter-state")).toBeFalsy();
    });
});