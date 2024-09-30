import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CardItem from '../../components/CardItem';

type CardItemProps = {
    id: number;
    image: string;
    name: string;
    price: string;
    rating: {
        average: number;
        reviews: number;
    };
    onBuyHandler: (id: number) => void;
};

const mockCardItemProps: CardItemProps = {
    id: 1,
    image: 'data:image/jpeg;base64,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',
    name: 'Erdinger Dunkel',
    price: '$10.99',
    rating: { average: 4.3, reviews: 230 },
    onBuyHandler: () => {},
};

describe('CardItem', () => {
    beforeEach(() => {
        render(<CardItem {...mockCardItemProps} />, {
            wrapper: ({ children }) => (
                <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
            ),
        });
    });

    it('renders CardItem component', () => {
        screen.debug(); // prints out the jsx in the App component unto the command line
    });

    it('renders CardItem title and image', () => {
        const cardTitle = screen.getByRole('heading', {
            name: 'Erdinger Dunkel',
        });
        const cardImage = screen.getByRole('img', {
            name: 'Erdinger Dunkel',
        });
        expect(cardTitle).toBeInTheDocument();
        expect(cardImage).toBeInTheDocument();
        screen.debug(); // prints out the jsx in the App component unto the command line
    });
});
