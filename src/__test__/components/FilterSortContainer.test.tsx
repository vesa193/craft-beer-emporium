import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import FilterSortContainer from '../../components/FilterSortContainer';

describe('FilterSortContainer', () => {
    beforeEach(() => {
        render(<FilterSortContainer />, {
            wrapper: ({ children }) => (
                <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
            ),
        });
    });

    it('renders FilterSortContainer component', () => {
        expect(
            screen.getByRole('heading', { name: 'Filter & Sort' })
        ).toBeInTheDocument();
        screen.debug(); // prints out the jsx in the App component unto the command line
    });

    it('cheks filter and sort input field', async () => {
        const input: HTMLInputElement = screen.getByRole('textbox', {
            name: 'Filter by name',
        });
        const clearButton = screen.getByTestId('clear-button');

        expect(input).toBeInTheDocument();
        expect(clearButton).toBeInTheDocument();

        fireEvent.change(input, {
            target: { value: 'Paulaner' },
        });

        expect(input.value).toBe('Paulaner');

        fireEvent.click(clearButton);

        fireEvent.change(input, {
            target: { value: '' },
        });

        expect(input.value).toBe('');

        screen.debug(); // prints out the jsx in the App component unto the command line
    });

    it('renders sort by criteria selection', () => {
        const select: HTMLSelectElement =
            screen.getByLabelText('Sort by criteria');
        expect(select).toBeInTheDocument();

        screen.debug(); // prints out the jsx in the App component unto the command line
    });
});
