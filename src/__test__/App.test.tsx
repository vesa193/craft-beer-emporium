import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { describe, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
    it('renders the App component', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        screen.debug(); // prints out the jsx in the App component unto the command line
    });
});
