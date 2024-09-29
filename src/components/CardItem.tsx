import React from 'react';
import { TBeer } from '../types/types';

import './CardItem.css';
import { useLocation, useNavigate } from 'react-router';

type CardItemProps = TBeer;

type CardItemsHandlerProps = {
    onBuyHandler: (id: number) => void;
};

export const CardItem = ({
    id,
    image,
    name,
    price,
    rating: { average, reviews },
    onBuyHandler,
}: CardItemProps & CardItemsHandlerProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <div className="card">
            <div className="card-header">
                <img
                    src={image}
                    alt={name}
                    width="100%"
                    height="100%"
                    onClick={() => navigate(`${pathname}/${id}`)}
                />
            </div>
            <div className="card-body">
                <span>{price}</span>
                <h3 onClick={() => navigate(`${pathname}/${id}`)}>{name}</h3>
                <span>{`Average Rate: ${Math.ceil(average)}`}</span>
                <p>
                    <span>{`Reviews: ${reviews}`}</span>
                </p>
            </div>
            <div className="card-footer">
                <button type="button" onClick={() => onBuyHandler(id)}>
                    Buy now
                </button>
            </div>
        </div>
    );
};

export default CardItem;
