import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { Select, SelectProps } from '../../components/Input';
import { MemoryRouter } from 'react-router';

const mockSelectProps: SelectProps = {
    value: '',
    onChange: () => {},
    options: [
        { value: 'a-z', label: 'a-z' },
        { value: 'z-a', label: 'z-a' },
        { value: 'high-low', label: 'high-low' },
        { value: 'low-high', label: 'low-high' },
    ],
    label: 'Sort By',
    disabled: false,
};

describe('Select', () => {
    beforeEach(() => {
        render(<Select {...mockSelectProps} />, {
            wrapper: ({ children }) => (
                <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
            ),
        });
    });

    it('handle selections of select input', () => {
        const select: HTMLSelectElement = screen.getByRole('combobox', {
            name: 'Sort By',
        });
        fireEvent.select(select, { target: { value: 'a-z' } });
        expect(select.value).toBe('a-z');

        fireEvent.select(select, { target: { value: 'high-low' } });
        expect(select.value).toBe('high-low');
    });
});
