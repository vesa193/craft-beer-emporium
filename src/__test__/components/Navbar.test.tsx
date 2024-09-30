import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import { Navbar } from '../../components/Navbar';

describe('Navbar', () => {
    beforeEach(() => {
        render(<Navbar />, {
            wrapper: ({ children }) => (
                <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
            ),
        });
    });

    it('render Navbar component', () => {
        const logo = screen.getByAltText('Craft Beer Emp Logo');

        expect(logo).toBeInTheDocument();
    });
});
