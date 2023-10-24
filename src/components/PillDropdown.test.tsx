// Testing utilities
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

// Component
import PillDropdown from './PillDropdown';

describe('PillDropdown', async () => {
    const options = [
        {
            value: 1,
            label: "test1",
        },
        {
            value: 2,
            label: "test2",
        },
    ]

    const initialValue = {
        label: "test1",
        value: 1
    }

    const mockedOnChange = vi.fn()
    const mockedOnRemove = vi.fn()

    afterEach(() => {
        cleanup()
        vi.resetAllMocks()
    })

    it('Renders correctly', () => {
        render(<PillDropdown name='dropdown' initialValue={initialValue} options={options} />);
        const dropdown = screen.queryByTestId("pill-dropdown");

        expect(dropdown).toBeTruthy();
    });

    it('Displays initial value as selected option', () => {
        render(<PillDropdown name='dropdown' initialValue={initialValue} options={options} />);
        const dropdownLabel = screen.queryByTestId("selected-option-label");

        expect(dropdownLabel?.innerHTML).toBe(initialValue.label);
    });

    it('Sets input value to be the same as the initial value', () => {
        render(<PillDropdown name='dropdown' initialValue={initialValue} options={options} />);
        const dropdownValue = screen.queryByTestId("selected-option-value");

        expect(dropdownValue?.getAttribute("value")).toBe(String(initialValue.value));
    });

    it('Renders received options', () => {
        render(<PillDropdown name='dropdown' initialValue={initialValue} options={options} />);
        const dropdownOptions = screen.queryByTestId("pill-dropdown-options");

        expect(dropdownOptions?.children.length).toBe(options.length);
    });

    it('Uses name for input management', () => {
        const name = "test"
        render(<PillDropdown name={name} initialValue={initialValue} options={options} />);
        const inputLabel = screen.queryByTestId("dropdown-label");
        const dropdownValue = screen.queryByTestId("selected-option-value");

        expect(inputLabel?.getAttribute("for")).toBe(name);
        expect(dropdownValue?.getAttribute("name")).toBe(name);
    });

    it('Opens dropdown when handle is clicked', () => {
        render(<PillDropdown name="test" initialValue={initialValue} options={options} />);
        const handle = screen.queryByTestId("dropdown-handle") as HTMLDivElement;
        const optionContainer = screen.queryByTestId("pill-dropdown-options");

        fireEvent.click(handle)

        expect(optionContainer?.className.includes("open")).toBeTruthy();
    });

    it('Closes dropdown when handle loses focus', () => {
        render(<PillDropdown name="test" initialValue={initialValue} options={options} />);
        const handle = screen.queryByTestId("dropdown-handle") as HTMLDivElement;
        const optionContainer = screen.queryByTestId("pill-dropdown-options");

        fireEvent.click(handle)
        fireEvent.blur(handle)

        expect(optionContainer?.className.includes("open")).toBeFalsy();
    });

    it('Calls onChange when option is clicked', () => {
        render(<PillDropdown name="test" initialValue={initialValue} options={options} onChange={mockedOnChange} />);
        const handle = screen.queryByTestId("dropdown-handle") as HTMLDivElement;
        const optionContainer = screen.queryByTestId("pill-dropdown-options");
        const option = optionContainer?.children[0] as HTMLDivElement

        fireEvent.click(handle)
        fireEvent.click(option)

        expect(mockedOnChange).toHaveBeenCalled();
    });

    it('Displays close icon if remove is enabled', () => {
        render(<PillDropdown name="test" initialValue={initialValue} options={options} onChange={mockedOnChange} removeEnabled />);
        const removeIcon = screen.queryByTestId("pill-option-remove") as HTMLDivElement;

        expect(removeIcon).toBeTruthy();
    });

    it('Calls onRemove if remove is enabled and onRemove is passed', () => {
        render(<PillDropdown
            name="test"
            initialValue={initialValue}
            options={options}
            removeEnabled
            onRemove={mockedOnRemove} />
        );

        const removeIcon = screen.queryByTestId("pill-option-remove") as HTMLDivElement;

        fireEvent.click(removeIcon)

        expect(mockedOnRemove).toHaveBeenCalled();
    });
});