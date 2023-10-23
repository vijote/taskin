// Testing utilities
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

// Component
import Input from './Input';

describe('Input', async () => {
    afterEach(() => {
        cleanup()
    })

    it('Renders correctly', () => {
        render(<Input label='it works' name='input' type='text' />);
        const input = screen.queryByTestId("input");

        expect(input).toBeTruthy();
    });

    it('Displays label', () => {
        const labelMessage = "it works"
        render(<Input label={labelMessage} name='input' type='text' />);
        const input = screen.queryByTestId("input");
        const label = input?.querySelector(".label")

        expect(label?.innerHTML).toBe(labelMessage);
    });

    it('Applies name and id', () => {
        const name = "it-works"
        render(<Input label='it works' name={name} type='text' />);
        const container = screen.queryByTestId("input");
        const input = container?.querySelector(".input")

        expect(input?.getAttribute("name")).toBe(name);
        expect(input?.getAttribute("id")).toBe(name);
    });

    it('Applies className if received', () => {
        const className = "it-works"
        render(<Input label='it works' className={className} name='it-works' type='text' />);
        const container = screen.queryByTestId("input");

        expect(container?.getAttribute("class")).toBe("input-container " + className);
    });
});