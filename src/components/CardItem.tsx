import React from 'react';
import { TBeer } from '../types/types';

import './CardItem.css';

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
    return (
        <div className="card">
            <div className="card-header">
                <img src={image} alt={name} width="100%" height="100%" />
            </div>
            <div className="card-body">
                <span>{price}</span>
                <h3>{name}</h3>
                <span>{`Average Rate: ${Math.ceil(average)}`}</span>
                <p>
                    <span>{`Reviews: ${reviews}`}</span>
                </p>
            </div>
            <div className="card-footer">
                <button type="button" onClick={() => onBuyHandler(id)}>
                    Buy know
                </button>
            </div>
        </div>
    );
};

export default CardItem;
