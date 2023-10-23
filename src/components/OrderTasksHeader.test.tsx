// Testing utilities
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

// Component
import OrderTasksHeader from './OrderTasksHeader';

describe('OrderTasksHeader', async () => {
    const mockedSearchParamsChange = vi.fn()
    const setParams = vi.fn()

    afterEach(() => {
        cleanup()
        vi.resetAllMocks()
    })

    it('Renders correctly', () => {
        const mockedParams = new URLSearchParams()
        const setParams = () => new URLSearchParams()

        render(<OrderTasksHeader
            searchParams={mockedParams}
            setSearchParams={setParams}
            onSearchParamsChange={mockedSearchParamsChange}
        />);
        const orderTasks = screen.queryByTestId("order-tasks-header");

        expect(orderTasks).toBeTruthy();
    });

    it('Adds title sort with 0 value when title-sort is clicked', () => {
        const mockedParams = new URLSearchParams()

        render(<OrderTasksHeader
            searchParams={mockedParams}
            setSearchParams={setParams}
            onSearchParamsChange={mockedSearchParamsChange}
        />);

        const titleSort = screen.queryByTestId("title-sort") as HTMLParagraphElement;
        fireEvent.click(titleSort)

        const params = setParams.mock.calls[0][0] as URLSearchParams

        expect(params.get("sort-title")).toBe("0");
    });

    it('Adds title sort with 1 value when title-sort is already present', () => {
        const mockedParams = new URLSearchParams({ 'sort-title': '0' })

        render(<OrderTasksHeader
            searchParams={mockedParams}
            setSearchParams={setParams}
            onSearchParamsChange={mockedSearchParamsChange}
        />);

        const titleSort = screen.queryByTestId("title-sort") as HTMLParagraphElement;
        fireEvent.click(titleSort)

        const params = setParams.mock.calls[0][0] as URLSearchParams

        expect(params.get("sort-title")).toBe("1");
    });

    it('Adds createdAt sort with 0 value when created-at-sort is clicked', () => {
        const mockedParams = new URLSearchParams()

        render(<OrderTasksHeader
            searchParams={mockedParams}
            setSearchParams={setParams}
            onSearchParamsChange={mockedSearchParamsChange}
        />);

        const createdAtSort = screen.queryByTestId("created-at-sort") as HTMLParagraphElement;
        fireEvent.click(createdAtSort)

        const params = setParams.mock.calls[0][0] as URLSearchParams

        expect(params.get("sort-createdAt")).toBe("0");
    });

    it('Adds createdAt sort with value 1 when created-at-sort is already present', () => {
        const mockedParams = new URLSearchParams({ 'sort-createdAt': "0" })

        render(<OrderTasksHeader
            searchParams={mockedParams}
            setSearchParams={setParams}
            onSearchParamsChange={mockedSearchParamsChange}
        />);

        const createdAtSort = screen.queryByTestId("created-at-sort") as HTMLParagraphElement;
        fireEvent.click(createdAtSort)

        const params = setParams.mock.calls[0][0] as URLSearchParams

        expect(params.get("sort-createdAt")).toBe("1");
    });

    it('Removes createdAt sort when created-at-remove is clicked', () => {
        const mockedParams = new URLSearchParams({ 'sort-createdAt': "0" })

        render(<OrderTasksHeader
            searchParams={mockedParams}
            setSearchParams={setParams}
            onSearchParamsChange={mockedSearchParamsChange}
        />);

        const createdAtRemove = screen.queryByTestId("created-at-remove") as HTMLElement;
        
        fireEvent.click(createdAtRemove)

        const params = setParams.mock.calls[0][0] as URLSearchParams

        expect(params.has("sort-createdAt")).toBeFalsy();
    });

    it('Removes title sort when title-remove is clicked', () => {
        const mockedParams = new URLSearchParams({ 'sort-title': "0" })

        render(<OrderTasksHeader
            searchParams={mockedParams}
            setSearchParams={setParams}
            onSearchParamsChange={mockedSearchParamsChange}
        />);

        const createdAtRemove = screen.queryByTestId("title-remove") as HTMLElement;
        
        fireEvent.click(createdAtRemove)

        const params = setParams.mock.calls[0][0] as URLSearchParams

        expect(params.has("sort-title")).toBeFalsy();
    });
});